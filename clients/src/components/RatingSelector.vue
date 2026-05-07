<template>
	<div class="rating-selector">
		<span
			v-for="star in 5"
			:key="star"
			class="star"
			:class="{ active: star <= selectedRating, hovered: star <= hoverRating }"
			@click="setRating(star)"
			@mouseover="hoverRating = star"
			@mouseleave="hoverRating = 0">
			★
		</span>
		<span v-if="selectedRating" class="rating-value">
			{{ selectedRating }} из 5
		</span>
	</div>
</template>

<script setup>
	import { ref, defineEmits, defineProps } from 'vue';

	const props = defineProps({
		modelValue: {
			type: Number,
			default: 5,
		},
	});

	const emit = defineEmits(['update:modelValue']);

	const selectedRating = ref(props.modelValue);
	const hoverRating = ref(0);

	const setRating = (rating) => {
		selectedRating.value = rating;
		emit('update:modelValue', rating);
	};
</script>

<style scoped>
	.rating-selector {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 2rem;
		margin: 0.5rem 0;
	}

	.star {
		color: #e2e8f0;
		cursor: pointer;
		transition: all 0.1s;
		user-select: none;
	}

	.star:hover,
	.star.active,
	.star.hovered {
		color: #eab308;
		transform: scale(1.1);
	}

	.rating-value {
		margin-left: 12px;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text2);
	}
</style>
