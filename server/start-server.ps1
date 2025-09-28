# PowerShell script to start backend server
Write-Host "🚀 Starting Car Rental Backend Server..." -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✅ Environment file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: .env file not found" -ForegroundColor Yellow
    Write-Host "💡 Please create .env file with required environment variables" -ForegroundColor Cyan
    Write-Host ""
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ Node modules found" -ForegroundColor Green
    
    # Try to start with node
    Write-Host "🔄 Starting server with node server.js..." -ForegroundColor Yellow
    try {
        node server.js
    }
    catch {
        Write-Host "❌ node failed, trying nodemon..." -ForegroundColor Red
        
        # Alternative: use nodemon
        if (Test-Path "node_modules\.bin\nodemon.cmd") {
            Write-Host "🔄 Starting with nodemon..." -ForegroundColor Yellow
            & "node_modules\.bin\nodemon.cmd" server.js
        }
        else {
            Write-Host "❌ Nodemon not found" -ForegroundColor Red
            Write-Host "💡 Please run: npm install" -ForegroundColor Cyan
        }
    }
}
else {
    Write-Host "❌ Node modules not found" -ForegroundColor Red
    Write-Host "💡 Please run: npm install" -ForegroundColorColor Cyan
}

Write-Host ""
Write-Host "🌐 Server will be available at: http://localhost:5001" -ForegroundColor Cyan
Write-Host "📊 Admin API: http://localhost:5001/api/admin/stats" -ForegroundColor Cyan





