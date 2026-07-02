<template>
	<main class="container">
		<div class="feed">
			<ReviewCard
				v-for="review in reviews"
				:key="review.id"
				:author="review.author"
				:date="review.date"
				:title="review.title"
				:text="review.text"
				:cover="review.cover"
				:rating="review.rating" />
		</div>
	</main>
</template>

<script setup>
	import ReviewCard from '@/components/ReviewCard.vue';
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const reviews = ref([]);

	onMounted(async () => {
		try {
			const res = await axios.get('/reviews');
			reviews.value = res.data.data.map((r) => ({
				id: r.idОтзыв_книги,
				author: r.user_name || 'Пользователь',
				date: r.Дата_создания,
				title: r.book_title || 'Книга',
				text: r.Отзыв,
				cover: r.Обложка || '/images.jpg',
				rating: r.Оценка,
			}));
		} catch (err) {
			console.error(err);
		}
	});
</script>
