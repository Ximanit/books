const Review = require('../models/Review');
const Book = require('../models/Book');

exports.createReview = async (req, res) => {
	try {
		const { bookTitle, rating, text, user } = req.body;

		if (!bookTitle || !rating || !text) {
			return res.status(400).json({
				success: false,
				message: 'Поля bookTitle, rating и text обязательны',
			});
		}

		const review = await Review.create({
			user: user,
			title: bookTitle,
			rating: Number(rating),
			text: text.trim(),
		});

		res.status(201).json({
			success: true,
			data: review,
			message: 'Отзыв успешно опубликован!',
		});
	} catch (error) {
		console.error('Create review error:', error);
		res.status(400).json({
			success: false,
			message: error.message,
		});
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
