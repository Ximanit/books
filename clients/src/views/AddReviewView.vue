<template>
	<main>
		<div class="form-card card">
			<h1>Новый отзыв</h1>

			<form @submit.prevent="submitReview">
				<div class="input-group">
					<label for="title">Название книги</label>
					<input id="title" v-model="form.title" type="text" required />
				</div>

				<div class="input-group">
					<label for="author">Автор книги</label>
					<input id="author" v-model="form.author" type="text" required />
				</div>

				<div class="input-group">
					<label>Ваша оценка</label>
					<StarRating v-model="form.rating" />
				</div>

				<div class="input-group">
					<label for="cover">Обложка книги (URL)</label>
					<input
						id="cover"
						v-model="form.cover"
						type="url"
						placeholder="https://example.com/cover.jpg" />
				</div>

				<div class="input-group">
					<label for="review">Ваш отзыв</label>
					<textarea
						id="review"
						v-model="form.text"
						placeholder="Что вы почувствовали после прочтения?"
						rows="6"
						required></textarea>
				</div>

				<button type="submit" class="btn" style="width: 100%; padding: 1.1rem">
					Опубликовать отзыв
				</button>
			</form>
		</div>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import axios from 'axios';
	import StarRating from '@/components/RatingStars.vue'; // используем интерактивный компонент

	const router = useRouter();

	const form = ref({
		title: '',
		author: '',
		rating: 5,
		text: '',
		cover: '',
	});

	const submitReview = async () => {
		try {
			const res = await axios.post('/reviews', {
				title: form.value.title,
				author: form.value.author,
				rating: form.value.rating,
				text: form.value.text,
				cover: form.value.cover || null,
			});

			alert('Отзыв успешно опубликован!');
			router.push('/');
		} catch (err) {
			console.error(err);
			alert(err.response?.data?.message || 'Ошибка при создании отзыва');
		}
	};
</script>
