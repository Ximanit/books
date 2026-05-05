const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // для админских действий

const {
	createBook,
	getAllBooks,
	getBookById,
	updateBook,
	deleteBook,
	searchBooks,
} = require('../controllers/bookController');

// Публичные маршруты
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

// Защищённые маршруты (только для администраторов в будущем)
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
