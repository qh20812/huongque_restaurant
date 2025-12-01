# Run test after waiting for server
Start-Sleep -Seconds 3
Write-Host "Running admin login test..." -ForegroundColor Cyan
node scripts/test-admin-login.mjs
