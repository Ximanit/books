const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		required: true,
		trim: true,
	},
	coverImage: {
		type: String,
	},
	description: String,
	genres: [
		{
			type: String,
			enum: [
				'Фантастика',
				'Антиутопия',
				'Классика',
				'Психология',
				'Философия',
				'Роман',
				'Детектив',
			],
		},
	],
	publishedYear: Number,
	averageRating: {
		type: Number,
		default: 0,
	},
	reviewCount: {
		type: Number,
		default: 0,
	},
});

// Индекс для поиска
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);
