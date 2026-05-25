const pool = require('../config/db');

// Получить все книги
exports.getAllBooks = async (req, res) => {
	try {
		const result = await pool.query(`
            SELECT * FROM Книга 
            ORDER BY idКнига DESC
        `);

		res.json({
			success: true,
			data: result.rows,
		});
	} catch (error) {
		console.error('Get all books error:', error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Получить книгу по ID
exports.getBookById = async (req, res) => {
	try {
		const result = await pool.query(
			`
            SELECT * FROM Книга 
            WHERE idКнига = $1
        `,
			[req.params.id],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'Книга не найдена',
			});
		}

		res.json({
			success: true,
			data: result.rows[0],
		});
	} catch (error) {
		console.error('Get book by id error:', error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Поиск книг
exports.searchBooks = async (req, res) => {
	try {
		const { q } = req.query;

		if (!q) {
			return res.status(400).json({
				success: false,
				message: 'Параметр поиска (q) обязателен',
			});
		}

		const result = await pool.query(
			`
            SELECT * FROM Книга 
            WHERE Название ILIKE $1 
               OR Автор ILIKE $1
            ORDER BY idКнига DESC
        `,
			[`%${q}%`],
		);

		res.json({
			success: true,
			data: result.rows,
		});
	} catch (error) {
		console.error('Search books error:', error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Создать новую книгу
exports.createBook = async (req, res) => {
	try {
		const { Название, Автор, Обложка } = req.body;

		if (!Название || !Автор) {
			return res.status(400).json({
				success: false,
				message: 'Поля Название и Автор обязательны',
			});
		}

		const result = await pool.query(
			`
            INSERT INTO Книга (Название, Автор, Обложка)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
			[Название, Автор, Обложка || null],
		);

		res.status(201).json({
			success: true,
			data: result.rows[0],
			message: 'Книга успешно добавлена!',
		});
	} catch (error) {
		console.error('Create book error:', error);
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Обновить книгу
exports.updateBook = async (req, res) => {
	try {
		const { Название, Автор, Обложка } = req.body;
		const bookId = req.params.id;

		const result = await pool.query(
			`
            UPDATE Книга 
            SET Название = COALESCE($1, Название),
                Автор = COALESCE($2, Автор),
                Обложка = COALESCE($3, Обложка)
            WHERE idКнига = $4
            RETURNING *
        `,
			[Название, Автор, Обложка, bookId],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'Книга не найдена',
			});
		}

		res.json({
			success: true,
			data: result.rows[0],
			message: 'Книга успешно обновлена',
		});
	} catch (error) {
		console.error('Update book error:', error);
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

// Удалить книгу
exports.deleteBook = async (req, res) => {
	try {
		const result = await pool.query(
			`
            DELETE FROM Книга 
            WHERE idКнига = $1 
            RETURNING *
        `,
			[req.params.id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'Книга не найдена',
			});
		}

		res.json({
			success: true,
			message: 'Книга успешно удалена',
		});
	} catch (error) {
		console.error('Delete book error:', error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Дополнительный метод: Получить книги с средней оценкой
exports.getBooksWithRating = async (req, res) => {
	try {
		const result = await pool.query(`
            SELECT 
                k.*,
                COALESCE(AVG(o.Оценка), 0) as average_rating,
                COUNT(o.idОтзыв_книги) as review_count
            FROM Книга k
            LEFT JOIN Отзыв_книги o ON k.idКнига = o.Книга_idКнига
            GROUP BY k.idКнига
            ORDER BY average_rating DESC, k.idКнига DESC
        `);

		res.json({
			success: true,
			data: result.rows,
		});
	} catch (error) {
		console.error('Get books with rating error:', error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
