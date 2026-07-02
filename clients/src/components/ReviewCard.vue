<template>
	<article class="card">
		<div class="review-header">
			<div class="avatar"></div>
			<div class="review-meta">
				<strong>{{ author || 'Неизвестный пользователь' }}</strong>
				<time :datetime="date">{{ formattedDate }}</time>
			</div>
		</div>

		<div style="display: flex; justify-content: center">
			<img :src="cover || '/images.jfif'" alt="Обложка" class="book-cover" />
		</div>

		<div class="review-content">
			<h3>{{ title || 'Без названия' }}</h3>

			<StarRating :model-value="rating || 0" readonly />

			<p>{{ text || 'Нет текста отзыва' }}</p>
		</div>
	</article>
</template>

<script setup>
	import { computed } from 'vue';
	import StarRating from './RatingStars.vue';

	const props = defineProps({
		author: String,
		date: String,
		title: String,
		text: String,
		cover: String,
		rating: { type: Number, default: 0 },
	});

	const formattedDate = computed(() => {
		if (!props.date) return 'Дата неизвестна';

		try {
			return new Intl.DateTimeFormat('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date(props.date));
		} catch (e) {
			return 'Дата неизвестна';
		}
	});
</script>
