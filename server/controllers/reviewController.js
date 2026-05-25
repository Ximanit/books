const pool = require('../config/db');

exports.createReview = async (req, res) => {
	try {
		const { bookId, rating, text } = req.body;
		const userId = req.user.id; // из middleware авторизации

		if (!bookId || !rating || !text) {
			return res.status(400).json({
				success: false,
				message: 'Поля bookId, rating и text обязательны',
			});
		}

		const result = await pool.query(
			`INSERT INTO Отзыв_книги 
             (Книга_idКнига, Пользователь_idПользователь, Дата_создания, Отзыв, Оценка)
             VALUES ($1, $2, CURRENT_DATE, $3, $4) 
             RETURNING *`,
			[bookId, userId, text.trim(), Number(rating)],
		);

		res.status(201).json({
			success: true,
			data: result.rows[0],
			message: 'Отзыв успешно опубликован!',
		});
	} catch (error) {
		console.error('Create review error:', error);
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getReviews = async (req, res) => {
	try {
		const result = await pool.query(`
            SELECT o.*, p.ФИО as user_name, k.Название as book_title, k.Автор
            FROM Отзыв_книги o
            JOIN Пользователь p ON o.Пользователь_idПользователь = p.idПользователь
            JOIN Книга k ON o.Книга_idКнига = k.idКнига
            ORDER BY o.Дата_создания DESC
        `);

		res.json({ success: true, data: result.rows });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.getMyReviews = async (req, res) => {
	try {
		const result = await pool.query(
			`
            SELECT o.*, k.Название as book_title, k.Автор
            FROM Отзыв_книги o
            JOIN Книга k ON o.Книга_idКнига = k.idКнига
            WHERE o.Пользователь_idПользователь = $1
            ORDER BY o.Дата_создания DESC
        `,
			[req.user.id],
		);

		res.json({ success: true, data: result.rows });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.deleteReview = async (req, res) => {
	try {
		const result = await pool.query(
			`DELETE FROM Отзыв_книги 
             WHERE idОтзыв_книги = $1 AND Пользователь_idПользователь = $2 
             RETURNING *`,
			[req.params.id, req.user.id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				success: false,
				message: 'Отзыв не найден или нет прав',
			});
		}

		res.json({ success: true, message: 'Отзыв удалён' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
