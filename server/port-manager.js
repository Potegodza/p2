// Port management utility
const { exec } = require('child_process');
const net = require('net');

const PORT = process.env.PORT || 5001;

// Function to check if port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(false); // Port is available
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(true); // Port is in use
    });
  });
}

// Function to kill process using port
function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (error) {
        resolve(false);
        return;
      }
      
      const lines = stdout.trim().split('\n');
      const pids = new Set();
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].includes(`:${port}`)) {
          const pid = parts[4];
          if (pid && pid !== '0') {
            pids.add(pid);
          }
        }
      });
      
      if (pids.size === 0) {
        resolve(false);
        return;
      }
      
      console.log(`🔍 Found ${pids.size} process(es) using port ${port}`);
      
      // Kill all processes
      const killPromises = Array.from(pids).map(pid => {
        return new Promise((killResolve) => {
          exec(`taskkill /PID ${pid} /F`, (killError) => {
            if (killError) {
              console.log(`⚠️  Could not kill process ${pid}: ${killError.message}`);
            } else {
              console.log(`✅ Killed process ${pid}`);
            }
            killResolve();
          });
        });
      });
      
      Promise.all(killPromises).then(() => {
        console.log(`🎉 Cleared port ${port}`);
        resolve(true);
      });
    });
  });
}

// Main function
async function managePort() {
  console.log(`🔍 Checking port ${PORT}...`);
  
  const portInUse = await isPortInUse(PORT);
  
  if (portInUse) {
    console.log(`⚠️  Port ${PORT} is in use`);
    console.log(`🔧 Attempting to free port ${PORT}...`);
    
    const freed = await killProcessOnPort(PORT);
    
    if (freed) {
      console.log(`✅ Port ${PORT} is now available`);
    } else {
      console.log(`❌ Could not free port ${PORT}`);
      console.log(`💡 Try using a different port or manually kill the process`);
      process.exit(1);
    }
  } else {
    console.log(`✅ Port ${PORT} is available`);
  }
}

// Export for use in other scripts
module.exports = { isPortInUse, killProcessOnPort, managePort };

// Run if called directly
if (require.main === module) {
  managePort().then(() => {
    console.log('🚀 Port management completed');
  }).catch(error => {
    console.error('❌ Port management failed:', error);
    process.exit(1);
  });
}





