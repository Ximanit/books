import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'https://books-640q.onrender.com/api';

export const useAuthStore = defineStore('auth', () => {
	const user = ref(null);
	const token = ref(localStorage.getItem('token') || null);

	// Настройка axios
	axios.defaults.baseURL = API_URL;
	if (token.value) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
	}

	const register = async (name, email, password) => {
		const res = await axios.post('/users/register', { name, email, password });
		return res.data;
	};

	const login = async (email, password) => {
		const res = await axios.post('/users/login', { email, password });

		token.value = res.data.token;
		user.value = res.data.user;

		localStorage.setItem('token', token.value);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

		return res.data;
	};

	const logout = () => {
		user.value = null;
		token.value = null;
		localStorage.removeItem('token');
		delete axios.defaults.headers.common['Authorization'];
	};

	return { user, token, register, login, logout };
});
