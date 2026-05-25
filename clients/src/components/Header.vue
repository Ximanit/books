<template>
	<header>
		<div class="container">
			<div class="header-inner">
				<div class="logo">Книжный червь</div>
				<nav class="nav-links">
					<router-link to="/">Лента</router-link>
					<router-link to="/add">Новый отзыв</router-link>
					<router-link to="/profile">Профиль</router-link>
				</nav>
				<div>
					<router-link v-if="!isLoggedIn" to="/login" class="btn"
						>Войти</router-link
					>
					<span v-else
						>Привет, {{ userName }}
						<button
							@click="logout"
							class="btn-outline"
							style="margin-left: 12px; font-size: 0.9rem">
							Выйти
						</button>
					</span>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { computed } from 'vue';
	import { useAuthStore } from '@/stores/auth';
	import { useRouter } from 'vue-router';

	const auth = useAuthStore();
	const router = useRouter();

	const isLoggedIn = computed(() => !!auth.token);
	const userName = computed(
		() => auth.user?.name?.split(' ')[0] || 'Пользователь',
	);

	const logout = () => {
		auth.logout();
		router.push('/login');
	};
</script>
