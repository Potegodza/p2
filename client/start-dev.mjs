// Alternative development server starter (ES Module)
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Car Rental Frontend...\n');

// Try to start the dev server using npx directly
const devProcess = spawn('npx', ['vite'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

devProcess.on('error', (error) => {
  console.error('❌ Error starting development server:', error.message);
  console.log('\n💡 Alternative solutions:');
  console.log('1. Run: npx vite');
  console.log('2. Or use: node_modules/.bin/vite');
  console.log('3. Or enable PowerShell execution policy');
});

devProcess.on('close', (code) => {
  console.log(`\n📊 Development server exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  devProcess.kill('SIGINT');
  process.exit(0);
});

console.log('✅ Frontend startup initiated');
console.log('🌐 Frontend will be available at: http://localhost:5173');





