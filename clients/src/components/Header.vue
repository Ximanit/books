<template>
	<header>
		<div class="container">
			<div class="header-inner">
				<div class="logo">Книжный червь</div>

				<nav class="nav-links">
					<router-link to="/">Лента</router-link>
					<router-link to="/add">Добавить книгу</router-link>
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
	import { ref } from 'vue';
	const isLoggedIn = ref(true); // потом заменишь на Pinia / Vuex
	const userName = ref('Александра');
</script>

<style scoped>
	/* можно вынести общие стили в main.css */
</style>
