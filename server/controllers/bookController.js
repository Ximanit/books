const Book = require('../models/Book');

// Создать новую книгу
exports.createBook = async (req, res) => {
	try {
		const { title, author, coverImage, description, genres, publishedYear } =
			req.body;

		const book = await Book.create({
			title,
			author,
			coverImage,
			description,
			genres,
			publishedYear,
		});

		res.status(201).json({
			success: true,
			data: book,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Получить все книги
exports.getAllBooks = async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 });
		res.json({ success: true, data: books });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Получить одну книгу по ID
exports.getBookById = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		if (!book) {
			return res
				.status(404)
				.json({ success: false, message: 'Книга не найдена' });
		}

		res.json({ success: true, data: book });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Обновить книгу
exports.updateBook = async (req, res) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return res
				.status(404)
				.json({ success: false, message: 'Книга не найдена' });
		}

		res.json({ success: true, data: book });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Удалить книгу
exports.deleteBook = async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);

		if (!book) {
			return res
				.status(404)
				.json({ success: false, message: 'Книга не найдена' });
		}

		res.json({ success: true, message: 'Книга успешно удалена' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Поиск книг
exports.searchBooks = async (req, res) => {
	try {
		const { query } = req.query;

		const books = await Book.find({
			$text: { $search: query },
		}).sort({ score: { $meta: 'textScore' } });

		res.json({ success: true, data: books });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
