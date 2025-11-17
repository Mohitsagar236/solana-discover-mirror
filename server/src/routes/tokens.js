const express = require('express');
const router = express.Router();
const tokenService = require('../services/tokenService');

// Get all token prices
router.get('/prices', async (req, res, next) => {
  try {
    const prices = await tokenService.getTokenPrices();
    res.json({
      success: true,
      data: prices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// Get specific token details
router.get('/:symbol', async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const details = await tokenService.getTokenDetails(symbol);
    res.json({
      success: true,
      data: details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// Get token list with filters
router.get('/', async (req, res, next) => {
  try {
    const { category, trending, limit = 50 } = req.query;
    
    const prices = await tokenService.getTokenPrices();
    let tokens = Object.entries(prices).map(([symbol, data]) => ({
      symbol,
      ...data
    }));

    // Apply filters
    if (trending === 'true') {
      tokens = tokens.filter(t => Math.abs(t.change24h) > 5);
    }

    // Limit results
    tokens = tokens.slice(0, parseInt(limit));

    res.json({
      success: true,
      data: tokens,
      count: tokens.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
