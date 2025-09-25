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
// เส้นทางนี้ถูกต้องแล้ว เพราะเมื่อรวมกันจะได้ /api/admin/stats
router.get('/stats', authCheck, adminCheck, getDashboardStats);


// --- User Management Routes (Admin only) ---
// **แก้ไข:** ลบ '/admin' ที่ซ้ำซ้อนออก
router.get('/users', authCheck, adminCheck, listUsers);
router.post('/change-status', authCheck, adminCheck, changeStatus);
router.post('/change-role', authCheck, adminCheck, changeRole);


// --- Rental Management Routes (Admin only) ---
// **แก้ไข:** ลบ '/admin' ที่ซ้ำซ้อนออก
router.get('/rentals', authCheck, adminCheck, getRentalsAdmin);
router.put('/rental-status', authCheck, adminCheck, changeRentalStatus);

module.exports = router;

