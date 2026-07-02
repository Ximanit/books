const express = require('express');
const router = express.Router();

const {
	createReview,
	getReviews,
	getMyReviews,
	deleteReview,
} = require('../controllers/reviewController');

const { protect } = require('../middleware/auth');

router.get('/', getReviews);
router.get('/my', protect, getMyReviews);
router.post('/', protect, createReview);
router.delete('/:id', deleteReview);

module.exports = router;
