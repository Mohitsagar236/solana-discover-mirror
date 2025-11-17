# Solana Discover - Axiom Trading Platform

A modern, full-stack Solana trading platform with real-time price feeds, analytics, staking, and governance features.

## Quick Start

### Prerequisites
- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone https://github.com/Mohitsagar236/solana-discover-mirror.git

# Navigate to the project directory
cd solana-discover-mirror

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Development

Run both frontend and backend with one command:

```powershell
# Windows PowerShell
.\start.ps1
```

Or run them separately:

```sh
# Terminal 1 - Backend (from server/ directory)
cd server
npm run dev

# Terminal 2 - Frontend (from root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080 (or 5173)
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:3002

## Tech Stack

### Frontend
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **Recharts** - Data visualization

### Backend
- **Express.js** - Web framework
- **WebSocket (ws)** - Real-time communication
- **@solana/web3.js** - Solana blockchain integration
- **Axios** - HTTP client for external APIs
- **node-cache** - In-memory caching
- **Helmet** - Security middleware
- **Compression** - Response compression

## Deployment (Vercel + External Backend)

This repository now includes a `vercel.json` for deploying the frontend (Vite + React) on Vercel. The backend (`server/` Express + WebSocket) should be deployed separately (Render, Railway, Fly.io, etc.) because:

* Persistent WebSockets are not ideal on Vercel serverless functions.
* Long-lived connections and in-memory caches reset on each cold start.

### 1. Frontend on Vercel
1. Push the repo to GitHub.
2. Import the project in Vercel (root directory).
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Set Environment Variables (Project Settings → Environment Variables):
   * `VITE_API_URL` = `https://YOUR-BACKEND-DOMAIN/api`
   * `VITE_WS_URL` = `wss://YOUR-WEBSOCKET-DOMAIN`

### 2. Backend Deployment (Express + WS)
Deploy the `server/` folder separately:

```
cd server
npm install
npm run start
```

Recommended hosts: Render, Railway, Fly.io, AWS Lightsail. Expose port 3001 (HTTP) and 3002 (WebSocket) or unify behind a reverse proxy:

Nginx example snippet:
```
location /api/ {
	proxy_pass http://localhost:3001/api/;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
}

location /ws/ {
	proxy_pass http://localhost:3002/;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
}
```

### 3. Proxy Configuration
`vercel.json` proxies any `/api/*` requests back to your backend domain. Update `YOUR-BACKEND-DOMAIN` placeholders after backend is live.

### 4. Local Development
Run both services:

```
# In one terminal
cd server
npm run dev

# In another terminal (root)
npm run dev
```

Optionally create a combined PowerShell script (example already present as `start.ps1`).

### 5. Optional Serverless Migration
You can progressively move simple GET endpoints into Vercel Functions under `/api` if you don't need WebSocket data. See `server/api-readme-vercel.md` for details.

### 6. Env Vars Summary
| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL for REST API calls |
| `VITE_WS_URL` | WebSocket endpoint for live prices |
| `CORS_ORIGIN` | Comma-separated origins allowed by Express backend |
| `CACHE_TTL_PRICES` | Token price cache TTL (seconds) |
| `CACHE_TTL_MARKETS` | Market stats cache TTL (seconds) |
| `SOLANA_RPC_URL` | Solana RPC endpoint |
| `COINGECKO_API_URL` | Override CoinGecko base URL if needed |

### 7. Post-Deployment Checklist
* Verify `/api/health` responds with `{ status: 'ok' }`.
* Confirm WebSocket connects (`useWebSocket` hook shows 🟢 Live).
* Check pricing table updates (Discover page).
* Set proper CORS origins (your Vercel domain + custom domain).
* Enable gzip & security headers (already via `compression` + `helmet`).

### 8. Custom Domain
Add a domain in Vercel → Domains. Point DNS (CNAME) to Vercel. Update `VITE_API_URL` accordingly.

### 9. Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| Health endpoint fails | Backend not reachable | Ensure server deployed & domain correct |
| WebSocket disconnects | Host/platform closes idle connections | Use keep-alive ping or dedicated WS provider |
| Mixed content warnings | Using `ws://` on `https://` site | Use `wss://` for secure WebSocket |
| 404 on /api/* | vercel.json proxy misconfigured | Replace placeholder domain with real backend URL |

---
For a pure Vercel solution without external servers, replace WebSocket with Server-Sent Events or a polling strategy and migrate routes into `/api` serverless functions.

## Vercel Quick Reference
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Framework Preset: Vite
```

Set env vars before first deploy to avoid 404s for API calls.

## Features

- **Token Discovery**: Browse 30+ Solana tokens with live prices
- **Real-time Updates**: WebSocket integration for live market data
- **Analytics Dashboard**: Market stats, volume, and trending tokens
- **Trading Interface**: Order book, recent trades, and trading pairs
- **Staking Pools**: Flexible and locked staking options with APR tracking
- **Yield Farming**: Auto-compounding pools with reward tracking
- **Governance**: DAO proposals and voting system
- **Portfolio Management**: Track holdings and performance
- **Wallet Integration**: Connect and manage Solana wallets

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.
