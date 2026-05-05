<template>
	<main class="container">
		<section class="profile-header">
			<div class="profile-avatar"></div>
			<h1 class="profile-name">{{ user.name }}</h1>
			<div class="profile-email">{{ user.email }}</div>
			<div class="profile-joined">{{ user.joined }}</div>

			<div style="margin-top: 1.8rem">
				<button class="btn-outline" style="margin: 0 0.5rem">
					Редактировать профиль
				</button>
				<button
					class="btn"
					style="background: #ef4444; margin: 0 0.5rem"
					@click="logout">
					Выйти
				</button>
			</div>
		</section>

		<section style="padding: 2rem 0">
			<h2 style="margin-bottom: 1.5rem">Ваши отзывы · {{ reviews.length }}</h2>
			<div class="feed">
				<ReviewCard
					v-for="review in reviews"
					:key="review.id"
					:author="user.name"
					:date="review.date"
					:title="review.title"
					:text="review.text"
					:cover="review.cover"
					:rating="review.rating" />
			</div>
		</section>
	</main>
</template>

<script setup>
	import ReviewCard from '@/components/ReviewCard.vue';
	import { ref } from 'vue';

	const user = ref({
		name: 'Александра К.',
		email: 'alexandra.books@gmail.com',
		joined: 'Присоединилась в ноябре 2025',
	});

	const reviews = ref([
		{
			id: 1,
			title: '451 градус по Фаренгейту',
			text: 'После второго прочтения поняла, насколько актуальна книга сейчас...',
			cover: 'images.jfif',
			date: '2026-03-15',
			rating: 5,
		},
		{
			id: 2,
			title: 'Над пропастью во ржи',
			text: 'Книга, которая заставляет задуматься о взрослении и обществе.',
			cover: 'images.jfif',
			date: '2026-03-10',
			rating: 4,
		},
		{
			id: 3,
			title: '1984',
			text: 'Очень сильное произведение. До сих пор актуально.',
			cover: 'images.jfif',
			date: '2026-03-05',
			rating: 5,
		},
	]);

	const logout = () => {
		if (confirm('Выйти из аккаунта?')) {
			alert('Вы вышли из аккаунта');
			// router.push('/login')
		}
	};
</script>
