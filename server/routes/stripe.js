const express = require('express');
const router = express.Router();

// Middleware to check if the user is logged in
const { authCheck } = require('../middlewares/authCheck');

// Import the controller function we created
const { createPaymentIntent } = require('../controllers/stripe');

// Define the API route
// When a POST request is made to '/api/create-payment-intent', it will be handled by the createPaymentIntent function
router.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;