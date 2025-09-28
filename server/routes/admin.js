const express = require('express');
const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/authCheck');

// Import controllers
const {
    listUsers,
    changeStatus,
    changeRole,
    getDashboardStats
} = require('../controllers/admin');
const { getRentalsAdmin, changeRentalStatus } = require('../controllers/rental');

// --- Dashboard Route ---
// GET /api/admin/stats
router.get('/stats', authCheck, adminCheck, getDashboardStats);


// --- User Management Routes (Admin only) ---
// GET /api/admin/users
router.get('/users', authCheck, adminCheck, listUsers);

// POST /api/admin/change-status
router.post('/change-status', authCheck, adminCheck, changeStatus);

// POST /api/admin/change-role
router.post('/change-role', authCheck, adminCheck, changeRole);


// --- Rental Management Routes (Admin only) ---
// GET /api/admin/rentals
router.get('/rentals', authCheck, adminCheck, getRentalsAdmin);

// PUT /api/admin/rental-status
router.put('/rental-status', authCheck, adminCheck, changeRentalStatus);


module.exports = router;