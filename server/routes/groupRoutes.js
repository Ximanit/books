const express = require('express');
const router = express.Router();
const {
	createGroup,
	joinGroup,
	sendMessage,
	getBookRating,
} = require('../controllers/groupController');

router.post('/create', createGroup);
router.post('/join', joinGroup);
router.post('/message', sendMessage);
router.get('/book-rating/:bookId', getBookRating);

module.exports = router;
