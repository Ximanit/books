<template>
	<div class="review-rating">
		<span
			v-for="star in 5"
			:key="star"
			class="star"
			:class="{ filled: star <= rating }">
			★
		</span>
		<span class="rating-number">{{ rating }}</span>
	</div>
</template>

<script setup>
	defineProps({
		rating: {
			type: Number,
			required: true,
			default: 5,
		},
	});
</script>

<style scoped>
	.review-rating {
		display: flex;
		align-items: center;
		gap: 4px;
		margin: 8px 0;
	}

	.star {
		font-size: 1.35rem;
		color: #e2e8f0;
		transition: color 0.2s;
	}

	.star.filled {
		color: #eab308;
	}

	.rating-number {
		margin-left: 8px;
		font-weight: 600;
		color: var(--text2);
		font-size: 1rem;
	}
</style>
