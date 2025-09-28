// server/fix-production-errors.js
// ไฟล์สำหรับแก้ไขปัญหา production errors

const prisma = require('./config/prisma');

// ฟังก์ชันสำหรับแก้ไขปัญหา listBy function
async function fixListByIssues() {
    console.log('🔧 แก้ไขปัญหา listBy function...');
    
    try {
        // ตรวจสอบว่า database มีข้อมูลหรือไม่
        const carCount = await prisma.car.count();
        console.log(`📊 พบข้อมูลรถ ${carCount} คัน`);
        
        if (carCount === 0) {
            console.log('⚠️ ไม่พบข้อมูลรถในฐานข้อมูล');
            console.log('💡 แนะนำให้เพิ่มข้อมูลรถผ่าน admin panel');
            return;
        }
        
        // ทดสอบ query ที่อาจมีปัญหา
        console.log('🧪 ทดสอบ query patterns...');
        
        // Test 1: Basic car query
        const basicCars = await prisma.car.findMany({
            take: 5,
            include: { images: true }
        });
        console.log('✅ Basic car query:', basicCars.length, 'cars');
        
        // Test 2: Car query with rentals
        const carsWithRentals = await prisma.car.findMany({
            take: 5,
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
        console.log('✅ Car query with rentals:', carsWithRentals.length, 'cars');
        
        // Test 3: Order by different fields
        const orderByTests = [
            { field: 'createdAt', order: 'desc' },
            { field: 'year', order: 'desc' },
            { field: 'pricePerDay', order: 'asc' }
        ];
        
        for (const test of orderByTests) {
            try {
                const result = await prisma.car.findMany({
                    take: 3,
                    orderBy: { [test.field]: test.order },
                    include: { images: true }
                });
                console.log(`✅ Order by ${test.field} ${test.order}:`, result.length, 'cars');
            } catch (error) {
                console.error(`❌ Order by ${test.field} ${test.order} failed:`, error.message);
            }
        }
        
    } catch (error) {
        console.error('❌ Error in fixListByIssues:', error.message);
        console.error('Error details:', error);
    }
}

// ฟังก์ชันสำหรับตรวจสอบและแก้ไข database schema
async function checkDatabaseSchema() {
    console.log('\n🗄️ ตรวจสอบ Database Schema...');
    
    try {
        // ตรวจสอบ tables
        const tables = await prisma.$queryRaw`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_SCHEMA = DATABASE()
        `;
        console.log('📋 Database tables:', tables);
        
        // ตรวจสอบ Car table structure
        const carColumns = await prisma.$queryRaw`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Car' AND TABLE_SCHEMA = DATABASE()
        `;
        console.log('🚗 Car table columns:', carColumns);
        
        // ตรวจสอบ Image table structure
        const imageColumns = await prisma.$queryRaw`
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Image' AND TABLE_SCHEMA = DATABASE()
        `;
        console.log('🖼️ Image table columns:', imageColumns);
        
    } catch (error) {
        console.error('❌ Database schema check failed:', error.message);
    }
}

// ฟังก์ชันสำหรับสร้างข้อมูลทดสอบ
async function createTestData() {
    console.log('\n🧪 สร้างข้อมูลทดสอบ...');
    
    try {
        // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
        const existingCars = await prisma.car.count();
        
        if (existingCars > 0) {
            console.log(`✅ มีข้อมูลรถอยู่แล้ว ${existingCars} คัน`);
            return;
        }
        
        console.log('📝 สร้างข้อมูลรถทดสอบ...');
        
        // สร้างข้อมูลรถทดสอบ
        const testCars = [
            {
                brand: 'Toyota',
                model: 'Camry',
                year: 2023,
                licensePlate: 'ABC-1234',
                pricePerDay: 1500,
                status: 'available'
            },
            {
                brand: 'Honda',
                model: 'Civic',
                year: 2022,
                licensePlate: 'DEF-5678',
                pricePerDay: 1200,
                status: 'available'
            },
            {
                brand: 'Nissan',
                model: 'Altima',
                year: 2023,
                licensePlate: 'GHI-9012',
                pricePerDay: 1300,
                status: 'available'
            }
        ];
        
        for (const carData of testCars) {
            const car = await prisma.car.create({
                data: carData
            });
            console.log(`✅ สร้างรถ: ${car.brand} ${car.model} (ID: ${car.id})`);
        }
        
        console.log('🎉 สร้างข้อมูลทดสอบเสร็จสิ้น');
        
    } catch (error) {
        console.error('❌ Error creating test data:', error.message);
    }
}

// ฟังก์ชันหลักสำหรับแก้ไขปัญหา
async function fixProductionIssues() {
    console.log('🚀 เริ่มแก้ไขปัญหา Production...\n');
    
    await checkDatabaseSchema();
    await fixListByIssues();
    await createTestData();
    
    console.log('\n✅ การแก้ไขปัญหาเสร็จสิ้น!');
    console.log('💡 หากยังมีปัญหา กรุณาตรวจสอบ:');
    console.log('   1. Environment variables ใน Railway dashboard');
    console.log('   2. Database connection string');
    console.log('   3. Railway deployment logs');
}

// รันการแก้ไข
if (require.main === module) {
    fixProductionIssues()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = { fixProductionIssues };
