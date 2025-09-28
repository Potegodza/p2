require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://web-production-bf4ac.up.railway.app',
    process.env.FRONTEND_URL || 'https://web-production-bf4ac.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// --- Routes ---
// นำเข้าไฟล์ Route ต่างๆ
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');
const userRoutes = require('./routes/user');
const stripeRoutes = require('./routes/stripe');

// Error handling middleware
const errorHandler = require('./middlewares/errorHandler');

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

// Error handling middleware (must be last)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));