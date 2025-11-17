# Deploying Backend on Vercel (Options)

This backend includes WebSocket and long-running Express server, which isn't a perfect fit for Vercel serverless. You have two deployment options:

## Option A: Deploy backend elsewhere, proxy from Vercel
- Host `server/` on a Node host (Render, Railway, Fly.io, AWS EC2/Lightsail, Heroku alternatives) with persistent WebSocket.
- Keep WebSocket on a separate port/domain (e.g., wss://api.example.com:3002) or behind a reverse proxy.
- In the root `vercel.json`, set routes to proxy `/api/*` to your backend.
- Set Vercel project env vars:
  - VITE_API_URL=https://api.example.com/api
  - VITE_WS_URL=wss://api.example.com

## Option B: Convert selected routes to Vercel Functions
- Move simple GET routes into `/api` functions inside the repo root and remove WebSocket requirements.
- Keep WebSocket-capable features on an external host.
- Update `src/services/api.ts` to use relative `/api` during Vercel runtime.

Notes:
- Vercel does not support stateful WebSocket servers by default on free tier. Use Upstash WS or external Node host.
- If you keep Express, ensure CORS allows your Vercel domain.
