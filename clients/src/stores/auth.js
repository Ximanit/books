import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
	const user = ref(null);
	const token = ref(localStorage.getItem('token') || '');

	const isLoggedIn = ref(!!token.value);

	const setAuth = (userData, tokenData) => {
		user.value = userData;
		token.value = tokenData;
		isLoggedIn.value = true;
		localStorage.setItem('token', tokenData);
		axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`;
	};

	const logout = () => {
		user.value = null;
		token.value = '';
		isLoggedIn.value = false;
		localStorage.removeItem('token');
		delete axios.defaults.headers.common['Authorization'];
	};

	return { user, token, isLoggedIn, setAuth, logout };
});
