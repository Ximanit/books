<template>
	<article class="card">
		<div class="review-header">
			<div class="avatar"></div>
			<div class="review-meta">
				<strong>{{ author }}</strong>
				<time :datetime="date">
					{{ formatDate(date) }}
				</time>
			</div>
		</div>

		<div style="display: flex; justify-content: center">
			<img :src="cover" alt="Обложка" class="book-cover" />
		</div>

		<div class="review-content">
			<h3>{{ title || 'Без названия' }}</h3>

			<!-- Новый динамический рейтинг -->
			<ReviewRating :rating="rating" />

			<p>{{ text }}</p>
		</div>
	</article>
</template>

<script setup>
	import ReviewRating from './ReviewRating.vue';
	import { defineProps } from 'vue';

	const props = defineProps({
		author: String,
		date: [String, Date],
		title: String,
		text: String,
		cover: String,
		rating: {
			type: Number,
			default: 5,
		},
	});

	const formatDate = (dateValue) => {
		if (!dateValue) return 'Дата неизвестна';
		const date = new Date(dateValue);
		if (isNaN(date.getTime())) return 'Дата неизвестна';

		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};
</script>
