<template>
	<main>
		<div class="form-card card">
			<h1>Новый отзыв</h1>

			<form @submit.prevent="submitReview">
				<div class="input-group">
					<label for="title">Название книги</label>
					<input
						id="title"
						v-model="form.title"
						type="text"
						placeholder="Например: 1984"
						required />
				</div>

				<div class="input-group">
					<label>Ваша оценка</label>
					<RatingStars />
				</div>

				<div class="input-group">
					<label>Обложка книги</label>
					<div class="upload-area">
						Перетащите изображение или нажмите, чтобы выбрать
					</div>
				</div>

				<div class="input-group">
					<label for="review">Ваши мысли</label>
					<textarea
						id="review"
						v-model="form.text"
						placeholder="Что вы почувствовали? Какие мысли остались после прочтения?"
						rows="6"></textarea>
				</div>

				<button
					type="submit"
					class="btn"
					style="width: 100%; padding: 1.1rem; font-size: 1.1rem">
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

	const router = useRouter();
	const form = ref({ bookId: '', rating: 5, text: '' });

	const submitReview = async () => {
		try {
			await axios.post('/reviews', {
				bookId: form.value.bookId || 1, // временно
				rating: form.value.rating,
				text: form.value.text,
			});
			alert('Отзыв опубликован!');
			router.push('/');
		} catch (err) {
			alert('Ошибка при публикации');
		}
	};
</script>

<style scoped>
	.upload-area {
		border: 2px dashed var(--border);
		border-radius: 0.8rem;
		padding: 3rem 1rem;
		text-align: center;
		color: var(--text3);
		background: #f8fafc;
		cursor: pointer;
		transition: all 0.2s;
	}

	.upload-area:hover {
		border-color: var(--primary);
		background: #f0fdf4;
	}
</style>
