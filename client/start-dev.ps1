# PowerShell script to start development server
Write-Host "🚀 Starting Car Rental Development Server..." -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ Node modules found" -ForegroundColor Green
    
    # Try to start with npx
    Write-Host "🔄 Starting with npx vite..." -ForegroundColor Yellow
    try {
        npx vite
    }
    catch {
        Write-Host "❌ npx failed, trying alternative..." -ForegroundColor Red
        
        # Alternative: use node_modules directly
        if (Test-Path "node_modules\.bin\vite.cmd") {
            Write-Host "🔄 Starting with node_modules/.bin/vite..." -ForegroundColor Yellow
            & "node_modules\.bin\vite.cmd"
        }
        else {
            Write-Host "❌ Vite not found in node_modules" -ForegroundColor Red
            Write-Host "💡 Please run: npm install" -ForegroundColor Cyan
        }
    }
}
else {
    Write-Host "❌ Node modules not found" -ForegroundColor Red
    Write-Host "💡 Please run: npm install" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📝 Note: If you get PowerShell execution policy errors:" -ForegroundColor Yellow
Write-Host "   Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Cyan





