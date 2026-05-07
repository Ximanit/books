// controllers/reviewController.js
const Review = require('../models/Review');
const Book = require('../models/Book');

exports.createReview = async (req, res) => {
	try {
		const { bookId, rating, text } = req.body;

		// if (!bookId || !rating || !text) {
		// 	return res
		// 		.status(400)
		// 		.json({
		// 			success: false,
		// 			message: 'Поля bookId, rating и text обязательны',
		// 		});
		// }

		const review = await Review.create({
			// user: req.user.id,
			book: bookId,
			rating: Number(rating),
			text,
		});

		// Обновляем рейтинг книги
		const reviews = await Review.find({ book: bookId });
		const avgRating = reviews.length
			? (
					reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
				).toFixed(1)
			: 0;

		// await Book.findByIdAndUpdate(bookId, {
		// 	averageRating: avgRating,
		// 	reviewCount: reviews.length,
		// });

		res.status(201).json({ success: true, data: review });
	} catch (error) {
		console.error(error);
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getReviews = async (req, res) => {
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

exports.getMyReviews = async (req, res) => {
	try {
		const reviews = await Review.find({ user: req.user.id })
			.populate('book', 'title author coverImage')
			.sort({ createdAt: -1 });

		res.json({ success: true, data: reviews });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.deleteReview = async (req, res) => {
	try {
		const review = await Review.findOneAndDelete({
			_id: req.params.id,
			user: req.user.id,
		});

		if (!review) {
			return res
				.status(404)
				.json({ success: false, message: 'Отзыв не найден или нет прав' });
		}

		res.json({ success: true, message: 'Отзыв удалён' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
