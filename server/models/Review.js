const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	text: {
		type: String,
		trim: true,
		maxlength: 2000,
	},
});

// Индексы
reviewSchema.index({ user: 1, book: 1 }, { unique: true }); // один отзыв на книгу от пользователя

module.exports = mongoose.model('Review', reviewSchema);
