require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// --- Routes ---
// นำเข้าไฟล์ Route ต่างๆ
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const userRoutes = require('./routes/user');
const stripeRoutes = require('./routes/stripe');

// --- กำหนด Prefix ของ Route ---
// **จุดที่แก้ไข:** กำหนด Prefix สำหรับ admin routes ให้ถูกต้อง
app.use('/api/admin', adminRoutes); // ทุก Route ใน admin.js จะขึ้นต้นด้วย /api/admin

// (สมมติว่า auth routes ของคุณขึ้นต้นด้วย /api เช่น /api/register, /api/login)
app.use('/api', authRoutes);
app.use('/api', carRoutes);
app.use('/api', userRoutes);
app.use('/api', stripeRoutes);

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));