const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Нет доступа. Токен не предоставлен',
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Получаем пользователя из базы
		const result = await pool.query(
			'SELECT idПользователь as id, ФИО as name, Логин as email FROM Пользователь WHERE idПользователь = $1',
			[decoded.id],
		);

		if (result.rows.length === 0) {
			return res.status(401).json({
				success: false,
				message: 'Пользователь не найден',
			});
		}

		req.user = result.rows[0];
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			success: false,
			message: 'Неверный или истёкший токен',
		});
	}
};
