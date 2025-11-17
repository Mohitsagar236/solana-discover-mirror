const express = require('express');
const router = express.Router();

// Get trading pairs
router.get('/pairs', async (req, res, next) => {
  try {
    const pairs = [
      { name: 'SOL/USDT', baseAsset: 'SOL', quoteAsset: 'USDT', volume24h: 125000000, high24h: 145.20, low24h: 138.50 },
      { name: 'SOL/USDC', baseAsset: 'SOL', quoteAsset: 'USDC', volume24h: 98000000, high24h: 145.15, low24h: 138.45 },
      { name: 'ETH/USDT', baseAsset: 'ETH', quoteAsset: 'USDT', volume24h: 89000000, high24h: 2250.00, low24h: 2180.00 },
      { name: 'BTC/USDT', baseAsset: 'BTC', quoteAsset: 'USDT', volume24h: 450000000, high24h: 44200.00, low24h: 43150.00 },
    ];

    res.json({
      success: true,
      data: pairs
    });
  } catch (error) {
    next(error);
  }
});

// Get order book
router.get('/orderbook/:pair', async (req, res, next) => {
  try {
    const orderbook = {
      asks: [
        { price: 142.38, amount: 12.5, total: 1779.75 },
        { price: 142.37, amount: 25.3, total: 3601.96 },
        { price: 142.36, amount: 8.7, total: 1238.53 },
      ],
      bids: [
        { price: 142.33, amount: 15.8, total: 2248.81 },
        { price: 142.32, amount: 32.1, total: 4568.47 },
        { price: 142.31, amount: 18.9, total: 2689.66 },
      ]
    };

    res.json({
      success: true,
      data: orderbook
    });
  } catch (error) {
    next(error);
  }
});

// Get recent trades
router.get('/trades/:pair', async (req, res, next) => {
  try {
    const trades = [
      { price: 142.35, amount: 2.5, time: new Date().toISOString(), type: 'buy' },
      { price: 142.34, amount: 5.2, time: new Date(Date.now() - 3000).toISOString(), type: 'sell' },
      { price: 142.36, amount: 1.8, time: new Date(Date.now() - 7000).toISOString(), type: 'buy' },
    ];

    res.json({
      success: true,
      data: trades
    });
  } catch (error) {
    next(error);
  }
});

// In-memory mock orders store
const mockOrders = new Map(); // key: address, value: array of orders
let nextOrderId = 1;

// Place an order
router.post('/order', async (req, res, next) => {
  try {
    const { address, pair, side, type, price, amount } = req.body || {};
    if (!address || !pair || !side || !type || !amount) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const order = {
      id: String(nextOrderId++),
      address,
      pair,
      side, // 'buy' | 'sell'
      type, // 'market' | 'limit'
      price: typeof price === 'number' ? price : null,
      amount,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    const list = mockOrders.get(address) || [];
    list.push(order);
    mockOrders.set(address, list);

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

// Cancel an order
router.post('/order/:id/cancel', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { address } = req.body || {};
    if (!address) {
      return res.status(400).json({ success: false, error: 'Missing address' });
    }

    const list = mockOrders.get(address) || [];
    const idx = list.findIndex((o) => o.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    list[idx] = { ...list[idx], status: 'canceled', canceledAt: new Date().toISOString() };
    mockOrders.set(address, list);

    res.json({ success: true, data: list[idx] });
  } catch (error) {
    next(error);
  }
});

// Get user orders
router.get('/orders/:address', async (req, res, next) => {
  try {
    const { address } = req.params;
    const list = mockOrders.get(address) || [];
    res.json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
