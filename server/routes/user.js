const express = require('express');
const router = express.Router();
const { authCheck } = require('../middlewares/authCheck');

// Import controllers
const { saveRental, getRentals } = require('../controllers/rental');
// const { createPaymentIntent } = require('../controllers/stripe'); // หากคุณมี Stripe controller

// Rental Routes for authenticated users
router.post('/user/rental', authCheck, saveRental);
router.get('/user/rentals', authCheck, getRentals);

// Payment Route
// router.post('/user/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;