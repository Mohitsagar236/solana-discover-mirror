const express = require('express');
const router = express.Router();
const marketService = require('../services/marketService');

// Get market statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await marketService.getMarketStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Get trending tokens
router.get('/trending', async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const trending = await marketService.getTrendingTokens(parseInt(limit));
    res.json({
      success: true,
      data: trending
    });
  } catch (error) {
    next(error);
  }
});

// Get top volume tokens
router.get('/volume', async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const topVolume = await marketService.getTopVolume(parseInt(limit));
    res.json({
      success: true,
      data: topVolume
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
