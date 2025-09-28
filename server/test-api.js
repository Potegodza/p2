// server/test-api.js
// ไฟล์สำหรับทดสอบ API endpoints

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001';

async function testCarEndpoints() {
    console.log('🧪 Testing Car API Endpoints...\n');

    try {
        // Test 1: Health check
        console.log('1. Testing health check...');
        const healthResponse = await axios.get(`${API_URL}/api/health`);
        console.log('✅ Health check:', healthResponse.data);

        // Test 2: List cars
        console.log('\n2. Testing list cars...');
        const listResponse = await axios.get(`${API_URL}/api/cars/5`);
        console.log('✅ List cars:', listResponse.data.length, 'cars found');

        // Test 3: Test listBy with valid parameters
        console.log('\n3. Testing listBy with valid parameters...');
        const listByResponse = await axios.post(`${API_URL}/api/carby`, {
            sort: 'createdAt',
            order: 'desc',
            limit: 5
        });
        console.log('✅ ListBy (createdAt desc):', listByResponse.data.length, 'cars found');

        // Test 4: Test listBy with year sorting
        console.log('\n4. Testing listBy with year sorting...');
        const yearResponse = await axios.post(`${API_URL}/api/carby`, {
            sort: 'year',
            order: 'desc',
            limit: 5
        });
        console.log('✅ ListBy (year desc):', yearResponse.data.length, 'cars found');

        // Test 5: Test with invalid parameters
        console.log('\n5. Testing with invalid parameters...');
        try {
            await axios.post(`${API_URL}/api/carby`, {
                sort: 'invalidField',
                order: 'desc',
                limit: 5
            });
        } catch (error) {
            console.log('✅ Invalid field error handled:', error.response?.data?.message);
        }

    } catch (error) {
        console.error('❌ Test failed:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
}

// Run tests
if (require.main === module) {
    testCarEndpoints();
}

module.exports = { testCarEndpoints };
