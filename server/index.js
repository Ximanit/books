const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); // ← PostgreSQL

dotenv.config();

const app = express();

// Middleware
app.use(
	cors({
		origin: 'https://books-pkfal2ucn-ximanits-projects.vercel.app/',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookRoutes = require('./routes/bookRoutes');
const groupRoutes = require('./routes/groupRoutes');

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => {
	res.send('API Книжный червь (PostgreSQL) работает!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
