require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// --- Routes ---
// **แก้ไข:** นำการโหลด Route อัตโนมัติที่ซ้ำซ้อนออกไป
// และกำหนด Route อย่างชัดเจน
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth'); // **เพิ่ม:** นำเข้าไฟล์ Route สำหรับการยืนยันตัวตน

// เพิ่ม Routes อื่นๆ ที่นี่ถ้ามี เช่น const userRoutes = require('./routes/user');

// **แก้ไข:** กำหนด Prefix ของ Route ให้ถูกต้อง
app.use('/api', adminRoutes); // ทุก Route ใน admin.js จะมี /api นำหน้า
app.use('/api', authRoutes); // **เพิ่ม:** ใช้งาน Route สำหรับการยืนยันตัวตน
// app.use('/api', userRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

