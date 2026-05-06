<template>
	<main>
		<div class="form-card card">
			<h1>Вход</h1>
			<form @submit.prevent="login">
				<div class="input-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="form.email"
						type="email"
						placeholder="ваш@email.com"
						required />
				</div>

				<div class="input-group">
					<label for="password">Пароль</label>
					<input
						id="password"
						v-model="form.password"
						type="password"
						placeholder="········"
						required />
				</div>

				<button type="submit" class="btn" style="width: 100%; margin-top: 1rem">
					Войти
				</button>
			</form>

			<p style="text-align: center; margin-top: 1.5rem; color: var(--text3)">
				Нет аккаунта?
				<router-link
					to="/register"
					style="color: var(--primary); font-weight: 500">
					Зарегистрироваться
				</router-link>
			</p>
		</div>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAuthStore } from '@/stores/auth';
	import axios from 'axios';

	const router = useRouter();
	const auth = useAuthStore();

	const form = ref({ email: '', password: '' });
	const loading = ref(false);

	const login = async () => {
		loading.value = true;
		try {
			const res = await axios.post('/api/users/login', form.value);

			if (res.data.success) {
				auth.setAuth(res.data.user, res.data.token);
				alert('Успешный вход!');
				router.push('/');
			}
		} catch (error) {
			alert(error.response?.data?.message || 'Ошибка входа');
		} finally {
			loading.value = false;
		}
	};
</script>
