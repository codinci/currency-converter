import axios from "axios";

const BASE_URL = 'http://localhost:3500';

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

const refreshToken = async () => {
  const response = await axiosPrivate.get('/refresh');
  console.log(response.data);
  setUserToken(response.data.accessToken);
  return response.data.accessToken;
};

export const userLogin = async (userDetails) => {
	try {
		const response = await axiosPrivate.post('/login', userDetails);
		return response;
	} catch (error) {
		// console.error(error)
		return error.response
	}
};

export const setupInterceptors = () => {
  let requestInterceptor;
  let responseInterceptor;

  // Request interceptor
  requestInterceptor = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  responseInterceptor = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refreshToken();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  // Return cleanup function
  return () => {
    axiosPrivate.interceptors.request.eject(requestInterceptor);
    axiosPrivate.interceptors.response.eject(responseInterceptor);
  };
};
