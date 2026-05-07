<template>
	<main class="container">
		<div v-if="loading" class="loading">Загрузка отзывов...</div>

		<div v-else-if="error" class="error">
			Ошибка: {{ error }}
			<button @click="fetchReviews" class="btn">Повторить</button>
		</div>

		<div v-else class="feed">
			<ReviewCard
				v-for="review in reviews"
				:key="review._id"
				:author="review.user?.name || 'Аноним'"
				:date="review.createdAt"
				:title="review.title || review.book?.title"
				:text="review.text"
				:cover="review.coverImage || 'images.jfif'"
				:rating="review.rating" />

			<div v-if="reviews.length === 0" class="empty">
				Пока нет отзывов. Будьте первым!
			</div>
		</div>
	</main>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import ReviewCard from '@/components/ReviewCard.vue';
	import axios from 'axios';

	const reviews = ref([]);
	const loading = ref(true);
	const error = ref(null);

	const fetchReviews = async () => {
		loading.value = true;
		error.value = null;

		try {
			const res = await axios.get('/api/reviews');
			reviews.value = res.data.data || res.data;
		} catch (err) {
			console.error(err);
			error.value =
				err.response?.data?.message || 'Не удалось загрузить отзывы';
		} finally {
			loading.value = false;
		}
	};

	// Загружаем отзывы при монтировании компонента
	onMounted(() => {
		fetchReviews();
	});
</script>

<style scoped>
	.loading,
	.error,
	.empty {
		text-align: center;
		padding: 3rem 1rem;
		font-size: 1.1rem;
		color: var(--text3);
	}

	.error button {
		margin-top: 1rem;
	}

	.empty {
		font-style: italic;
	}
</style>
