const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Проверка существующего пользователя
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				success: false,
				message: 'Пользователь с таким email уже существует',
			});
		}

		// Хэширование пароля здесь
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Создаём пользователя с уже хэшированным паролем
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			success: true,
			token: generateToken(user._id),
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
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
		const user = await User.findOne({ email });

		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({
				success: false,
				message: 'Неверный email или пароль',
			});
		}

		res.json({
			success: true,
			token: generateToken(user._id),
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
