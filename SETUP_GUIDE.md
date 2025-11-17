# Full Stack Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ..
npm install
```

### 3. Configure Environment

Backend `.env` is already configured in `server/.env`
Frontend `.env.local` is already configured

## Running the Application

### Option 1: Run Everything (Recommended)

Open 2 terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Using the Start Script

We've created a start script for Windows. Run:
```bash
npm run start:fullstack
```

## What You'll See

- **Backend API**: http://localhost:3001
- **WebSocket Server**: ws://localhost:3002
- **Frontend App**: http://localhost:8080 or http://localhost:8081

## Verify It's Working

1. **Backend Health Check:**
   Open http://localhost:3001/health in your browser
   You should see: `{"status":"ok","timestamp":"..."}`

2. **API Test:**
   Open http://localhost:3001/api/tokens/prices
   You should see real-time token prices

3. **Frontend:**
   Open http://localhost:8080
   You should see the Axiom trading platform with real-time updates

## Features Now Working

✅ Real-time price updates via WebSocket
✅ Live market data from CoinGecko API
✅ Token discovery and filtering
✅ Trading pairs and order books
✅ Yield farming pools
✅ Staking information
✅ Analytics and governance data

## Troubleshooting

### Port Already in Use
If port 3001 or 3002 is in use, update the `.env` file in the `server` directory:
```env
PORT=3003
WS_PORT=3004
```

Then update `.env.local` in the root:
```env
VITE_API_URL=http://localhost:3003/api
VITE_WS_URL=ws://localhost:3004
```

### CORS Errors
Make sure both frontend and backend are running on the correct ports listed in `server/.env`:
```env
CORS_ORIGIN=http://localhost:8080,http://localhost:8081,http://localhost:5173
```

### WebSocket Connection Failed
1. Check that the backend server is running
2. Verify the WebSocket port in `server/.env`
3. Check browser console for connection errors

## Next Steps

1. Connect your Solana wallet for real trading
2. Customize token lists and categories
3. Add more data sources (Jupiter, Raydium, etc.)
4. Implement user authentication
5. Add database for persistent user data
