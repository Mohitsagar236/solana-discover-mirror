param(
  [string]$BackendApiBaseUrl = "https://YOUR-BACKEND-DOMAIN/api",
  [string]$WebSocketUrl = "wss://YOUR-WEBSOCKET-DOMAIN",
  [string]$ProjectName = ""
)

Write-Host "🛠 Checking Vercel CLI..." -ForegroundColor Cyan
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
  Write-Host "📦 Installing Vercel CLI (npm -g vercel)..." -ForegroundColor Yellow
  npm i -g vercel
}

Write-Host "🔐 Login may be required. If prompted, follow the browser flow." -ForegroundColor Yellow
vercel login

if ($LASTEXITCODE -ne 0) {
  Write-Error "Vercel login failed. Aborting."
  exit 1
}

Write-Host "🔗 Linking local folder to a Vercel project..." -ForegroundColor Cyan
if ($ProjectName -ne "") {
  vercel link --project $ProjectName --yes
} else {
  vercel link
}

if ($LASTEXITCODE -ne 0) {
  Write-Error "Vercel link failed. Aborting."
  exit 1
}

# If a real backend URL is provided, patch vercel.json rewrites to proxy /api to it
try {
  $vercelJsonPath = Join-Path $PSScriptRoot 'vercel.json'
  if (Test-Path $vercelJsonPath) {
    if ($BackendApiBaseUrl -ne "/api" -and $BackendApiBaseUrl -match '^https?://') {
      Write-Host "📝 Patching vercel.json rewrites to $BackendApiBaseUrl ..." -ForegroundColor Cyan
      $backendRoot = $BackendApiBaseUrl -replace '/api/?$', ''
      $jsonRaw = Get-Content $vercelJsonPath -Raw
      $json = $jsonRaw | ConvertFrom-Json
      if (-not $json.rewrites) { $json | Add-Member -NotePropertyName rewrites -NotePropertyValue @() }
      $found = $false
      foreach ($r in $json.rewrites) {
        if ($r.source -eq '/api/(.*)') {
          $r.destination = "$backendRoot/api/`$1"
          $found = $true
        }
      }
      if (-not $found) {
        $json.rewrites += @{ source = '/api/(.*)'; destination = "$backendRoot/api/`$1" }
      }
      $json | ConvertTo-Json -Depth 10 | Set-Content -Path $vercelJsonPath -Encoding UTF8
      Write-Host "✅ vercel.json updated." -ForegroundColor Green
    } else {
      Write-Host "ℹ️ Skipping vercel.json patch (BackendApiBaseUrl is '/api' or not a URL)." -ForegroundColor Yellow
    }
  } else {
    Write-Host "⚠️ vercel.json not found; skipping patch." -ForegroundColor Yellow
  }
} catch {
  Write-Warning "Failed to patch vercel.json: $_"
}

# Configure Env Vars for all environments (optional but recommended)
function Set-VercelEnv([string]$name, [string]$value) {
  Write-Host "⚙️ Setting $name for production..." -ForegroundColor Cyan
  cmd /c "echo $value | vercel env add $name production" | Out-Null
  Write-Host "⚙️ Setting $name for preview..." -ForegroundColor Cyan
  cmd /c "echo $value | vercel env add $name preview" | Out-Null
  Write-Host "⚙️ Setting $name for development..." -ForegroundColor Cyan
  cmd /c "echo $value | vercel env add $name development" | Out-Null
}

# Use /api so vercel.json rewrite proxies to your backend
if ($BackendApiBaseUrl -eq "/api") {
  Set-VercelEnv -name "VITE_API_URL" -value "/api"
} else {
  Set-VercelEnv -name "VITE_API_URL" -value $BackendApiBaseUrl
}

Set-VercelEnv -name "VITE_WS_URL" -value $WebSocketUrl

Write-Host "🧱 Building frontend locally (npm run build)..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Error "Build failed. Aborting."
  exit 1
}

Write-Host "🚀 Deploying to Vercel (preview)..." -ForegroundColor Green
vercel --confirm
if ($LASTEXITCODE -ne 0) {
  Write-Error "Preview deploy failed. Aborting."
  exit 1
}

Write-Host "🚀 Deploying to Vercel (production)..." -ForegroundColor Green
vercel --prod --confirm
if ($LASTEXITCODE -ne 0) {
  Write-Error "Production deploy failed."
  exit 1
}

Write-Host "✅ Deployment complete!" -ForegroundColor Green
