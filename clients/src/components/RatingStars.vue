<template>
	<div class="star-rating" :class="{ readonly }">
		<span
			v-for="star in 5"
			:key="star"
			class="star"
			:class="{ active: star <= displayRating }"
			@click="setRating(star)"
			@mouseover="hoverRating(star)"
			@mouseleave="resetHover">
			★
		</span>
		<span v-if="showValue" class="rating-value">{{ displayRating }} / 5</span>
	</div>
</template>

<script setup>
	import { ref, computed, defineProps, defineEmits, watch } from 'vue';

	const props = defineProps({
		modelValue: { type: Number, default: 0 },
		showValue: { type: Boolean, default: false },
		readonly: { type: Boolean, default: false },
	});

	const emit = defineEmits(['update:modelValue']);

	const rating = ref(props.modelValue);
	const hover = ref(0);

	// Следим за изменениями modelValue извне
	watch(
		() => props.modelValue,
		(newVal) => {
			rating.value = newVal;
		},
	);

	const displayRating = computed(() => {
		return hover.value || rating.value || 0;
	});

	const setRating = (value) => {
		if (props.readonly) return;
		rating.value = value;
		emit('update:modelValue', value);
	};

	const hoverRating = (value) => {
		if (props.readonly) return;
		hover.value = value;
	};

	const resetHover = () => {
		hover.value = 0;
	};
</script>

<style scoped>
	.star-rating {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 1.5rem;
	}

	.star {
		color: #ddd;
		transition: color 0.2s ease;
		user-select: none;
	}

	.star:hover,
	.star.active {
		color: #ffd700;
	}

	.star-rating.readonly .star {
		cursor: default;
	}

	.star-rating.readonly .star:hover {
		color: #ddd; /* предотвращаем hover в readonly */
	}

	.rating-value {
		margin-left: 10px;
		font-size: 1rem;
		color: #666;
		font-weight: 500;
	}
</style>
