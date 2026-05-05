const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Подключение к базе
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Импорт маршрутов
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Использование маршрутов
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/books', bookRoutes);

// Тестовый маршрут
app.get('/', (req, res) => {
	res.send('✅ API Книжный червь работает!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
