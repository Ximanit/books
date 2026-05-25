<template>
	<main class="container">
		<section class="profile-header">
			<div class="profile-avatar"></div>
			<h1 class="profile-name">{{ user?.name || 'Пользователь' }}</h1>
			<div class="profile-email">{{ user?.email || '' }}</div>
			<div class="profile-joined">
				{{
					user?.joinedAt
						? `Присоединился: ${new Date(user.joinedAt).toLocaleDateString('ru-RU')}`
						: ''
				}}
			</div>

			<div style="margin-top: 1.8rem">
				<button class="btn-outline" style="margin: 0 0.5rem">
					Редактировать профиль
				</button>
				<button
					class="btn"
					style="background: #ef4444; margin: 0 0.5rem"
					@click="handleLogout">
					Выйти
				</button>
			</div>
		</section>

		<section style="padding: 2rem 0">
			<h2 style="margin-bottom: 1.5rem">
				Ваши отзывы · <strong>{{ reviews.length }}</strong>
			</h2>

			<div v-if="loading" class="feed">
				<p>Загрузка отзывов...</p>
			</div>

			<div v-else-if="reviews.length === 0" class="feed">
				<p>У вас пока нет отзывов.</p>
			</div>

			<div v-else class="feed">
				<ReviewCard
					v-for="review in reviews"
					:key="review.id"
					:author="user?.name"
					:date="review.Дата_создания"
					:title="review.book_title || 'Книга'"
					:text="review.Отзыв"
					:cover="review.cover || 'images.jfif'"
					:rating="review.Оценка" />
			</div>
		</section>
	</main>
</template>

<script setup>
	import ReviewCard from '@/components/ReviewCard.vue';
	import { ref, onMounted, computed } from 'vue';
	import { useAuthStore } from '@/stores/auth';
	import { useRouter } from 'vue-router';
	import axios from 'axios';

	const auth = useAuthStore();
	const router = useRouter();

	const reviews = ref([]);
	const loading = ref(true);

	// Данные пользователя из Store
	const user = computed(() => auth.user);

	// Загрузка отзывов пользователя
	const loadMyReviews = async () => {
		try {
			loading.value = true;
			const res = await axios.get('/reviews/my');
			reviews.value = res.data.data || [];
		} catch (error) {
			console.error('Ошибка загрузки отзывов:', error);
			reviews.value = [];
		} finally {
			loading.value = false;
		}
	};

	// Выход из аккаунта
	const handleLogout = () => {
		if (confirm('Выйти из аккаунта?')) {
			auth.logout();
			router.push('/login');
		}
	};

	// Загружаем данные при монтировании компонента
	onMounted(() => {
		if (!auth.token) {
			router.push('/login');
			return;
		}
		loadMyReviews();
	});
</script>

<style scoped>
	/* Можно добавить стили при необходимости */
</style>
