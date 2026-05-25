const express = require('express');
const router = express.Router();

const {
	createReview,
	getReviews,
	getMyReviews,
	deleteReview,
} = require('../controllers/reviewController');

router.get('/', getReviews);
router.get('/my', getMyReviews);
router.post('/', createReview);
router.delete('/:id', deleteReview);

module.exports = router;
