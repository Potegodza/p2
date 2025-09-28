// server/check-production.js
// ไฟล์สำหรับตรวจสอบ production environment

require('dotenv').config();

console.log('🔍 ตรวจสอบ Production Environment...\n');

// ตรวจสอบ Environment Variables
console.log('📋 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('PORT:', process.env.PORT || 'undefined');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Missing');

// ตรวจสอบ Database Connection
async function checkDatabase() {
    try {
        const prisma = require('./config/prisma');
        
        console.log('\n🗄️ Database Connection Test:');
        
        // Test basic connection
        await prisma.$connect();
        console.log('✅ Database connection successful');
        
        // Test car table
        const carCount = await prisma.car.count();
        console.log(`✅ Car table accessible (${carCount} cars found)`);
        
        // Test car query with listBy parameters
        const testCars = await prisma.car.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { 
                images: true,
                rentals: {
                    where: {
                        status: {
                            in: ['Pending', 'Active']
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        console.log(`✅ Car query with relations successful (${testCars.length} cars)`);
        
        await prisma.$disconnect();
        
    } catch (error) {
        console.error('❌ Database error:', error.message);
        console.error('Error details:', error);
    }
}

// ตรวจสอบ Cloudinary
async function checkCloudinary() {
    try {
        const cloudinary = require('cloudinary').v2;
        
        console.log('\n☁️ Cloudinary Configuration Test:');
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        
        // Test cloudinary connection
        const result = await cloudinary.api.ping();
        console.log('✅ Cloudinary connection successful');
        
    } catch (error) {
        console.error('❌ Cloudinary error:', error.message);
    }
}

// ตรวจสอบ API endpoints
async function checkAPIEndpoints() {
    const axios = require('axios');
    const baseURL = process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:5001';
    
    console.log('\n🌐 API Endpoints Test:');
    console.log('Base URL:', baseURL);
    
    try {
        // Test health endpoint
        const healthResponse = await axios.get(`${baseURL}/api/health`);
        console.log('✅ Health endpoint:', healthResponse.data);
        
        // Test cars endpoint
        const carsResponse = await axios.get(`${baseURL}/api/cars/5`);
        console.log('✅ Cars endpoint:', carsResponse.data.length, 'cars found');
        
        // Test carby endpoint
        const carbyResponse = await axios.post(`${baseURL}/api/carby`, {
            sort: 'createdAt',
            order: 'desc',
            limit: 5
        });
        console.log('✅ Carby endpoint:', carbyResponse.data.length, 'cars found');
        
    } catch (error) {
        console.error('❌ API error:', error.response?.data || error.message);
    }
}

// รันการตรวจสอบทั้งหมด
async function runChecks() {
    await checkDatabase();
    await checkCloudinary();
    await checkAPIEndpoints();
    
    console.log('\n🎯 Production Check Complete!');
    console.log('หากมี error ใดๆ กรุณาตรวจสอบ environment variables ใน Railway dashboard');
}

// รันการตรวจสอบ
if (require.main === module) {
    runChecks();
}

module.exports = { runChecks };
