<template>
	<article class="card">
		<div class="review-header">
			<div class="avatar"></div>
			<div class="review-meta">
				<strong>{{ author }}</strong>
				<time :datetime="date">{{ formattedDate }}</time>
			</div>
		</div>

		<div style="display: flex; justify-content: center">
			<img :src="cover" alt="Обложка" class="book-cover" />
		</div>

		<div class="review-content">
			<h3>{{ title }}</h3>
			<RatingStars :rating="rating" />
			<p>{{ text }}</p>
		</div>
	</article>
</template>

<script setup>
	import RatingStars from './RatingStars.vue';

	defineProps({
		author: String,
		date: String,
		title: String,
		text: String,
		cover: String,
		rating: { type: Number, default: 5 },
	});

	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date());
</script>
