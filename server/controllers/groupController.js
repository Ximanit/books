const pool = require('../config/db');

// Создать новую группу
exports.createGroup = async (req, res) => {
	try {
		const { name, description } = req.body;
		const userId = req.user.id;

		const result = await pool.query(`CALL create_new_group($1, $2, $3)`, [
			name,
			description,
			userId,
		]);

		res.status(201).json({
			success: true,
			message: 'Группа успешно создана!',
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Присоединиться к группе
exports.joinGroup = async (req, res) => {
	try {
		const { groupId } = req.body;
		const userId = req.user.id;

		await pool.query(`CALL add_user_to_group($1, $2)`, [userId, groupId]);

		res.json({ success: true, message: 'Вы успешно присоединились к группе' });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Отправить сообщение в группу
exports.sendMessage = async (req, res) => {
	try {
		const { groupId, text } = req.body;
		const userId = req.user.id;

		await pool.query(`CALL send_message($1, $2, $3)`, [groupId, userId, text]);

		res.json({ success: true, message: 'Сообщение отправлено' });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Получить среднюю оценку книги
exports.getBookRating = async (req, res) => {
	try {
		const { bookId } = req.params;

		const result = await pool.query(
			`SELECT get_book_average_rating($1) as average_rating`,
			[bookId],
		);

		res.json({
			success: true,
			data: result.rows[0],
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
