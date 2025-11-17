Write-Host "🚀 Starting Axiom Full Stack Application..." -ForegroundColor Green
Write-Host ""

# Start backend in new PowerShell window
Write-Host "📡 Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; Write-Host '🔧 Backend Server Starting...' -ForegroundColor Yellow; npm run dev"

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend in new PowerShell window
Write-Host "🎨 Starting Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host '🎨 Frontend Starting...' -ForegroundColor Yellow; npm run dev"

Write-Host ""
Write-Host "✅ Application is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Services:" -ForegroundColor White
Write-Host "   • Backend API: http://localhost:3001" -ForegroundColor Gray
Write-Host "   • WebSocket:   ws://localhost:3002" -ForegroundColor Gray
Write-Host "   • Frontend:    http://localhost:8080" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Tip: Wait a few seconds for servers to fully start" -ForegroundColor Yellow
Write-Host "🌐 Your browser should open automatically" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
