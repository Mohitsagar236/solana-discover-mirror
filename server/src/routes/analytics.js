const express = require('express');
const router = express.Router();

// Get analytics overview
router.get('/overview', async (req, res, next) => {
  try {
    const analytics = {
      totalValueLocked: 1200000000,
      volume24h: 450000000,
      totalUsers: 152000,
      activeMarkets: 85,
      volumeHistory: [
        { date: '2025-11-04', volume: 385000000, trades: 45200 },
        { date: '2025-11-05', volume: 412000000, trades: 48100 },
        { date: '2025-11-06', volume: 398000000, trades: 46800 },
        { date: '2025-11-07', volume: 445000000, trades: 52300 },
        { date: '2025-11-08', volume: 428000000, trades: 49700 },
        { date: '2025-11-09', volume: 467000000, trades: 54200 },
        { date: '2025-11-10', volume: 450000000, trades: 51800 },
      ]
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    next(error);
  }
});

// Get top traders
router.get('/top-traders', async (req, res, next) => {
  try {
    const traders = [
      { address: '0x7a9f...3b2c', volume: 12500000, trades: 1245, pnl: 245000 },
      { address: '0x4e8d...7f1a', volume: 10200000, trades: 892, pnl: 198000 },
      { address: '0x9c3b...4d6e', volume: 9800000, trades: 756, pnl: 187000 },
    ];

    res.json({
      success: true,
      data: traders
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
