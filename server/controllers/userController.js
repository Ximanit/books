const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.create({ name, email, password });

		res.status(201).json({
			success: true,
			token: generateToken(user._id),
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ message: 'Неверный email или пароль' });
		}

		res.json({
			success: true,
			token: generateToken(user._id),
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
