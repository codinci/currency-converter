import axios from "axios";
import { useAuthStore } from '../store/users';
import { axiosPrivate } from "./authApiInterceptor";

const axiosApi = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
})

//login function
export const login = async (credentials) => {
	const authStore = useAuthStore()
	try {
		const response = await axiosApi.post('/login',credentials)
		authStore.setUserToken(response.data.accessToken)
		authStore.setUser(response.data.user)
		return response;
	} catch (error) {
		return error;
	}
}

//registration function
export const register = async (credentials) => {
	try {
		const response = await axiosApi.post('/register', credentials)
		console.log(response);
		return response
	} catch (error) {
		console.error(error.message);
		throw error;
	}
}

//logout function
export const logout = async () => {
	const authStore = useAuthStore()

	try {
		const { data } = await axiosPrivate.post('/logout')
		authStore.logout()
		console.log(data);
		return data
	} catch (error) {
		console.error(error.message);
		throw error.message
	}
}