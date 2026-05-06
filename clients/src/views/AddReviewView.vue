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
					style="width: 100%; padding: 1.1rem; font-size: 1.1rem"
					:disabled="loading">
					{{ loading ? 'Публикация...' : 'Опубликовать отзыв' }}
				</button>
			</form>
		</div>
	</main>
</template>

<script setup>
	import RatingStars from '@/components/RatingStars.vue';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import axios from 'axios';
	import { useAuthStore } from '@/stores/auth';

	const router = useRouter();
	const auth = useAuthStore();

	const form = ref({
		title: '',
		text: '',
		rating: 5,
	});

	const loading = ref(false);

	const submitReview = async () => {
		if (!auth.isLoggedIn) {
			alert('Войдите в аккаунт для публикации отзыва!');
			router.push('/login');
			return;
		}

		if (!form.value.title || !form.value.text) {
			alert('Заполните название книги и текст отзыва');
			return;
		}

		loading.value = true;

		try {
			// Пока отправляем как есть (можно потом улучшить с отдельной книгой)
			const res = await axios.post('/api/reviews', {
				bookTitle: form.value.title, // временно
				rating: form.value.rating,
				text: form.value.text,
			});

			if (res.data.success) {
				alert('Отзыв успешно опубликован!');
				router.push('/');
			}
		} catch (error) {
			console.error(error);
			alert(error.response?.data?.message || 'Ошибка при публикации отзыва');
		} finally {
			loading.value = false;
		}
	};
</script>

<style scoped>
	/* ваши стили upload-area */
	.upload-area {
		border: 2px dashed var(--border);
		border-radius: 0.8rem;
		padding: 3rem 1rem;
		text-align: center;
		color: var(--text3);
		background: #f8fafc;
		cursor: pointer;
	}
	.upload-area:hover {
		border-color: var(--primary);
		background: #f0fdf4;
	}
</style>
