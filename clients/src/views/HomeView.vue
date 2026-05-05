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

	const reviews = [
		{
			id: 1,
			author: 'Александра К.',
			date: '2026-03-15',
			title: '451 градус по Фаренгейту',
			text: 'После второго прочтения поняла, насколько актуальна книга сейчас...',
			cover: 'images.jfif',
			rating: 5,
		},
		{
			id: 2,
			author: 'Александра К.',
			date: '2026-03-15',
			title: '451 градус по Фаренгейту',
			text: 'После второго прочтения поняла, насколько актуальна книга сейчас...',
			cover: 'images.jfif',
			rating: 5,
		},
		{
			id: 3,
			author: 'Александра К.',
			date: '2026-03-15',
			title: '451 градус по Фаренгейту',
			text: 'После второго прочтения поняла, насколько актуальна книга сейчас...',
			cover: 'images.jfif',
			rating: 5,
		},
	];
</script>
