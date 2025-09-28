const { body, validationResult } = require('express-validator');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Car creation validation
const validateCar = [
  body('brand')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Brand must be at least 2 characters long'),
  body('model')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Model must be at least 2 characters long'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Please provide a valid year'),
  body('licensePlate')
    .trim()
    .isLength({ min: 5 })
    .withMessage('License plate must be at least 5 characters long'),
  body('pricePerDay')
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Rental validation
const validateRental = [
  body('carId')
    .isInt({ min: 1 })
    .withMessage('Car ID must be a positive integer'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('phoneNumber')
    .optional()
    .isMobilePhone()
    .withMessage('Phone number must be valid'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCar,
  validateRental,
  handleValidationErrors
};



