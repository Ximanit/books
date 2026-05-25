<template>
	<main>
		<div class="form-card card">
			<h1>Вход</h1>
			<form @submit.prevent="handleLogin">
				<div class="input-group">
					<label for="email">Логин</label>
					<input v-model="form.email" type="text" required />
				</div>
				<div class="input-group">
					<label for="password">Пароль</label>
					<input v-model="form.password" type="password" required />
				</div>
				<button
					type="submit"
					class="btn"
					style="width: 100%; margin-top: 1rem"
					:disabled="loading">
					{{ loading ? 'Вход...' : 'Войти' }}
				</button>
			</form>
			<p style="text-align: center; margin-top: 1.5rem; color: var(--text3)">
				Нет аккаунта?
				<router-link to="/register" style="color: var(--primary)"
					>Зарегистрироваться</router-link
				>
			</p>
		</div>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAuthStore } from '@/stores/auth';

	const router = useRouter();
	const auth = useAuthStore();

	const form = ref({ email: '', password: '' });
	const loading = ref(false);

	const handleLogin = async () => {
		loading.value = true;
		try {
			await auth.login(form.value.email, form.value.password);
			router.push('/');
		} catch (err) {
			alert(err.response?.data?.message || 'Ошибка входа');
		} finally {
			loading.value = false;
		}
	};
</script>
