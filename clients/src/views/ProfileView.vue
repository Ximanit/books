<template>
	<main class="container">
		<!-- Профиль пользователя -->
		<section class="profile-header">
			<div class="profile-avatar"></div>
			<h1 class="profile-name">{{ user?.name || 'Загрузка...' }}</h1>
			<div class="profile-email">{{ user?.email }}</div>
			<div class="profile-joined">Присоединился {{ joinedDate }}</div>

			<div style="margin-top: 1.8rem">
				<button class="btn-outline" style="margin: 0 0.5rem">
					Редактировать профиль
				</button>
				<button
					class="btn"
					style="background: #ef4444; margin: 0 0.5rem"
					@click="logout">
					Выйти
				</button>
			</div>
		</section>

		<!-- Отзывы пользователя -->
		<section style="padding: 2rem 0">
			<h2 style="margin-bottom: 1.5rem">Ваши отзывы · {{ reviews.length }}</h2>

			<div v-if="loading" class="loading">Загрузка ваших отзывов...</div>
			<div v-else-if="error" class="error">
				{{ error }}
				<button @click="fetchMyReviews" class="btn">Повторить</button>
			</div>
			<div v-else class="feed">
				<ReviewCard
					v-for="review in reviews"
					:key="review._id"
					:author="user?.name"
					:date="review.createdAt"
					:title="review.book?.title || review.bookTitle || 'Без названия'"
					:text="review.text"
					:cover="review.book?.coverImage || 'images.jfif'"
					:rating="review.rating" />

				<div v-if="reviews.length === 0" class="empty">
					У вас пока нет отзывов. Напишите первый!
				</div>
			</div>
		</section>
	</main>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import ReviewCard from '@/components/ReviewCard.vue';
	import { useAuthStore } from '@/stores/auth';
	import axios from 'axios';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const auth = useAuthStore();

	const reviews = ref([]);
	const loading = ref(true);
	const error = ref(null);

	// Вычисляем дату регистрации
	const joinedDate = computed(() => {
		if (!auth.user?.createdAt) return 'Недавно';
		return new Date(auth.user.createdAt).toLocaleDateString('ru-RU', {
			year: 'numeric',
			month: 'long',
		});
	});

	const fetchMyReviews = async () => {
		if (!auth.isLoggedIn) {
			router.push('/login');
			return;
		}

		loading.value = true;
		error.value = null;

		try {
			const res = await axios.get('/api/reviews/');
			reviews.value = res.data.data || res.data;
		} catch (err) {
			console.error(err);
			error.value =
				err.response?.data?.message || 'Не удалось загрузить отзывы';
		} finally {
			loading.value = false;
		}
	};

	const logout = () => {
		if (confirm('Выйти из аккаунта?')) {
			auth.logout();
			router.push('/login');
		}
	};

	// Загружаем данные при открытии страницы
	onMounted(() => {
		fetchMyReviews();
	});
</script>

<style scoped>
	.loading,
	.error,
	.empty {
		text-align: center;
		padding: 3rem 1rem;
		color: var(--text3);
	}

	.error button {
		margin-top: 1rem;
	}
</style>
