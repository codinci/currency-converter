import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  function setUser(newUser) {
    user.value = newUser;
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function logout() {
    user.value = null;
    token.value = null;
  }

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
  };
});
