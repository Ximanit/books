<template>
	<header>
		<div class="container">
			<div class="header-inner">
				<div class="logo">Книжный червь</div>

				<nav class="nav-links">
					<router-link to="/">Лента</router-link>
					<router-link to="/add">Добавить отзыв</router-link>
					<router-link to="/profile">Профиль</router-link>
				</nav>

				<div>
					<router-link v-if="!isLoggedIn" to="/login" class="btn"
						>Войти</router-link
					>
					<span v-else>Привет, {{ userName }}</span>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { useAuthStore } from '@/stores/auth';
	import { computed } from 'vue';

	const auth = useAuthStore();

	const userName = computed(() => auth.user?.name || 'Гость');
	const isLoggedIn = computed(() => auth.isLoggedIn);
</script>
