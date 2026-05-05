const Review = require('../models/Review');
const Book = require('../models/Book');

// Создать отзыв
exports.createReview = async (req, res) => {
	try {
		const { bookId, rating, text } = req.body;

		const review = await Review.create({
			user: req.user.id,
			book: bookId,
			rating,
			text,
		});

		// Обновляем рейтинг книги
		const reviews = await Review.find({ book: bookId });
		const avgRating =
			reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

		await Book.findByIdAndUpdate(bookId, {
			averageRating: avgRating.toFixed(1),
			reviewCount: reviews.length,
		});

		res.status(201).json({ success: true, data: review });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Получить все отзывы (лента)
exports.getAllReviews = async (req, res) => {
	try {
		const reviews = await Review.find()
			.populate('user', 'name avatar')
			.populate('book', 'title author coverImage')
			.sort({ createdAt: -1 });

		res.json({ success: true, data: reviews });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Получить отзывы пользователя
exports.getUserReviews = async (req, res) => {
	try {
		const reviews = await Review.find({ user: req.user.id })
			.populate('book', 'title author coverImage')
			.sort({ createdAt: -1 });

		res.json({ success: true, data: reviews });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Удалить отзыв
exports.deleteReview = async (req, res) => {
	try {
		const review = await Review.findOneAndDelete({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!review) return res.status(404).json({ message: 'Отзыв не найден' });

		res.json({ success: true, message: 'Отзыв удалён' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
