<template>
	<main>
		<div class="form-card card">
			<h1>Регистрация</h1>
			<form @submit.prevent="register">
				<div class="input-group">
					<label for="name">Ваше имя</label>
					<input
						id="name"
						v-model="form.name"
						type="text"
						placeholder="Александра К."
						required />
				</div>

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
					Зарегистрироваться
				</button>
			</form>

			<p style="text-align: center; margin-top: 1.5rem; color: var(--text3)">
				Есть аккаунт?
				<router-link
					to="/login"
					style="color: var(--primary); font-weight: 500">
					Авторизоваться
				</router-link>
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

	const form = ref({ name: '', email: '', password: '' });
	const loading = ref(false);

	const register = async () => {
		loading.value = true;
		try {
			await auth.register(
				form.value.name,
				form.value.email,
				form.value.password,
			);
			alert('Регистрация успешна! Теперь войдите.');
			router.push('/login');
		} catch (err) {
			alert(err.response?.data?.message || 'Ошибка регистрации');
		} finally {
			loading.value = false;
		}
	};
</script>
