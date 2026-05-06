const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Подключение к базе
connectDB();

const app = express();

// Middleware
app.use(
	cors({
		origin: 'http://localhost:3000', // точный адрес фронтенда
		credentials: true, // важно для cookies / Authorization
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Импорт маршрутов
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Использование маршрутов
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/books', bookRoutes);

// Тестовый маршрут
app.get('/', (req, res) => {
	res.send('API Книжный червь работает!');
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
