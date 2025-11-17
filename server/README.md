# Axiom Backend Server

Backend API and WebSocket server for the Axiom trading platform.

## Features

- 🚀 RESTful API endpoints for all platform features
- 🔌 Real-time WebSocket connections for live price updates
- 💾 Caching layer for optimized performance
- 🔐 CORS and security middleware
- 📊 Integration with Solana blockchain and CoinGecko API

## Installation

```bash
cd server
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update environment variables as needed

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Tokens
- `GET /api/tokens/prices` - Get all token prices
- `GET /api/tokens/:symbol` - Get specific token details
- `GET /api/tokens` - Get filtered token list

### Markets
- `GET /api/markets/stats` - Get market statistics
- `GET /api/markets/trending` - Get trending tokens
- `GET /api/markets/volume` - Get top volume tokens

### Trading
- `GET /api/trading/pairs` - Get trading pairs
- `GET /api/trading/orderbook/:pair` - Get order book
- `GET /api/trading/trades/:pair` - Get recent trades

### Yield
- `GET /api/yield/pools` - Get yield farming pools
- `GET /api/yield/deposits/:address` - Get user deposits

### Staking
- `GET /api/staking/pools` - Get staking pools
- `GET /api/staking/stakes/:address` - Get user stakes

### Analytics
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/top-traders` - Get top traders

### Governance
- `GET /api/governance/proposals` - Get all proposals
- `GET /api/governance/proposals/:id` - Get proposal details

## WebSocket

Connect to `ws://localhost:3002` for real-time updates.

### Message Types

**Client to Server:**
```json
{
  "type": "subscribe",
  "symbols": ["SOL", "BTC", "ETH"]
}
```

**Server to Client:**
```json
{
  "type": "priceUpdate",
  "data": {
    "SOL": {
      "price": 142.35,
      "change24h": 5.23,
      "volume24h": 1200000000,
      "marketCap": 65000000000
    }
  },
  "timestamp": 1699747200000
}
```

## Architecture

```
server/
├── src/
│   ├── index.js           # Main server entry point
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic and external API calls
│   └── websocket/         # WebSocket server
├── .env                   # Environment variables
└── package.json
```

## Tech Stack

- **Express.js** - Web framework
- **WebSocket (ws)** - Real-time communication
- **Axios** - HTTP client for external APIs
- **@solana/web3.js** - Solana blockchain integration
- **node-cache** - In-memory caching
- **helmet** - Security middleware
- **compression** - Response compression
