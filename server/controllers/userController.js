const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Проверка существующего пользователя
		const userExists = await pool.query(
			'SELECT * FROM Пользователь WHERE Логин = $1 OR email = $2',
			[email, email],
		);

		if (userExists.rows.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'Пользователь с таким email уже существует',
			});
		}

		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const result = await pool.query(
			`INSERT INTO Пользователь (ФИО, Логин, Пароль, Дата_рождения, Количество_отзывов)
             VALUES ($1, $2, $3, $4, 0) RETURNING idПользователь, ФИО, Логин`,
			[name, email, hashedPassword, null],
		);

		const user = result.rows[0];

		res.status(201).json({
			success: true,
			token: generateToken(user.idПользователь),
			user: {
				id: user.idПользователь,
				name: user.ФИО,
				email: user.Логин,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const result = await pool.query(
			'SELECT * FROM Пользователь WHERE Логин = $1',
			[email],
		);

		const user = result.rows[0];

		if (!user || !(await bcrypt.compare(password, user.Пароль))) {
			return res.status(401).json({
				success: false,
				message: 'Неверный email или пароль',
			});
		}

		res.json({
			success: true,
			token: generateToken(user.idПользователь),
			user: {
				id: user.idПользователь,
				name: user.ФИО,
				email: user.Логин,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
