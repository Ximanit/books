const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
	createReview,
	getReviews,
	getMyReviews,
	deleteReview,
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.get('/my', protect, getMyReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
