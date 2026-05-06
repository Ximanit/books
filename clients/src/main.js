import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import axios from 'axios';
import { createPinia } from 'pinia';

// Глобальная настройка axios
axios.defaults.baseURL =
	import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(createPinia()); // ← Подключаем Pinia
app.use(router);

app.mount('#app');
