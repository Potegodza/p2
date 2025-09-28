// Alternative server starter
const { spawn } = require('child_process');
const path = require('path');
const { managePort } = require('./port-manager');

console.log('🚀 Starting Car Rental Backend Server...\n');

// Manage port before starting server
async function startServer() {
  try {
    await managePort();
    console.log('🔄 Starting server...\n');
  } catch (error) {
    console.error('❌ Port management failed:', error);
    process.exit(1);
  }
}

// Check if .env file exists
const fs = require('fs');
if (!fs.existsSync('.env')) {
  console.log('⚠️  Warning: .env file not found');
  console.log('💡 Please create .env file with required environment variables');
  console.log('');
}

// Start server after port management
startServer().then(() => {
  const serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Error starting server:', error.message);
    console.log('\n💡 Alternative solutions:');
    console.log('1. Run: node server.js');
    console.log('2. Or use: nodemon server.js');
    console.log('3. Check if all dependencies are installed: npm install');
  });

  serverProcess.on('close', (code) => {
    console.log(`\n📊 Server exited with code ${code}`);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });

  console.log('✅ Server startup initiated');
  console.log('🌐 Server will be available at: http://localhost:5001');
  console.log('📊 Admin API: http://localhost:5001/api/admin/stats');
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
