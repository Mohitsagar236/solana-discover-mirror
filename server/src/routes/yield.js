const express = require('express');
const router = express.Router();

// Get yield pools
router.get('/pools', async (req, res, next) => {
  try {
    const pools = [
      { token: 'USDC', apy: 12.5, tvl: 125000000, users: 4250, rewards: 'USDC', autoCompound: true },
      { token: 'SOL', apy: 15.2, tvl: 85000000, users: 3180, rewards: 'SOL + MRGN', autoCompound: true },
      { token: 'JTO', apy: 28.3, tvl: 35000000, users: 1420, rewards: 'JTO + SOL', autoCompound: true },
      { token: 'ETH', apy: 10.8, tvl: 95000000, users: 2890, rewards: 'ETH', autoCompound: true },
      { token: 'JUP', apy: 22.5, tvl: 42000000, users: 1650, rewards: 'JUP', autoCompound: true },
    ];

    res.json({
      success: true,
      data: pools
    });
  } catch (error) {
    next(error);
  }
});

// Get user deposits
router.get('/deposits/:address', async (req, res, next) => {
  try {
    const deposits = [
      { pool: 'USDC', amount: 5000, earned: 156.25, apy: 12.5, days: 45 },
      { pool: 'SOL', amount: 35, earned: 1.85, apy: 15.2, days: 38 },
    ];

    res.json({
      success: true,
      data: deposits
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
