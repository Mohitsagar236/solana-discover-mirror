const WebSocket = require('ws');
const tokenService = require('../services/tokenService');

let wss;
const clients = new Set();

function initWebSocketServer(httpServer) {
  const wsPort = process.env.WS_PORT || 3002;
  wss = new WebSocket.Server({ port: wsPort });

  console.log(`🔌 WebSocket server running on ws://localhost:${wsPort}`);

  wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');
    clients.add(ws);

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        handleClientMessage(ws, data);
      } catch (error) {
        console.error('Invalid message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });

    // Send initial data
    sendInitialData(ws);
  });

  // Start broadcasting price updates
  startPriceUpdates();

  return wss;
}

function handleClientMessage(ws, data) {
  switch (data.type) {
    case 'subscribe':
      ws.subscriptions = data.symbols || [];
      console.log('Client subscribed to:', ws.subscriptions);
      // Send an immediate snapshot of subscribed symbols
      sendSubscriptionSnapshot(ws).catch((err) =>
        console.error('Error sending subscription snapshot:', err)
      );
      break;
    case 'unsubscribe':
      ws.subscriptions = [];
      break;
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      break;
    default:
      console.log('Unknown message type:', data.type);
  }
}

async function sendInitialData(ws) {
  try {
    const prices = await tokenService.getTokenPrices();
    const data = filterPricesForClient(ws, prices);
    ws.send(JSON.stringify({
      type: 'initial',
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Error sending initial data:', error);
  }
}

function startPriceUpdates() {
  const interval = parseInt(process.env.CACHE_TTL_PRICES) * 1000 || 30000;
  
  setInterval(async () => {
    try {
      const prices = await tokenService.getTokenPrices();
      const timestamp = Date.now();
      // Send filtered updates per client based on subscriptions (if any)
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          const data = filterPricesForClient(client, prices);
          client.send(JSON.stringify({
            type: 'priceUpdate',
            data,
            timestamp
          }));
        }
      });
    } catch (error) {
      console.error('Error broadcasting price updates:', error);
    }
  }, interval);
}

function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function broadcastToSubscribed(symbol, data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && 
        (!client.subscriptions || client.subscriptions.includes(symbol))) {
      client.send(message);
    }
  });
}

function filterPricesForClient(ws, prices) {
  const subs = ws.subscriptions || [];
  if (!subs.length) return prices;
  const filtered = {};
  subs.forEach((sym) => {
    if (prices[sym]) filtered[sym] = prices[sym];
  });
  return filtered;
}

async function sendSubscriptionSnapshot(ws) {
  const prices = await tokenService.getTokenPrices();
  const data = filterPricesForClient(ws, prices);
  ws.send(JSON.stringify({
    type: 'initial',
    data,
    timestamp: Date.now()
  }));
}

module.exports = {
  initWebSocketServer,
  broadcast,
  broadcastToSubscribed
};
