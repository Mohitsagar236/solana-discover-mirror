const express = require('express');
const router = express.Router();

// Get staking pools
router.get('/pools', async (req, res, next) => {
  try {
    const pools = [
      { token: 'AXIOM', apr: 45, lockPeriod: 'Flexible', minStake: 100, totalStaked: 45000000, stakers: 8500 },
      { token: 'AXIOM', apr: 65, lockPeriod: '30 Days', minStake: 100, totalStaked: 28000000, stakers: 4200 },
      { token: 'AXIOM', apr: 85, lockPeriod: '90 Days', minStake: 100, totalStaked: 18000000, stakers: 2100 },
      { token: 'SOL', apr: 8.5, lockPeriod: 'Flexible', minStake: 1, totalStaked: 35000000, stakers: 12400 },
    ];

    res.json({
      success: true,
      data: pools
    });
  } catch (error) {
    next(error);
  }
});

// Get user stakes
router.get('/stakes/:address', async (req, res, next) => {
  try {
    const stakes = [
      { pool: 'AXIOM - 30 Days', amount: 5000, earned: 285, apr: 65, daysLeft: 12 },
      { pool: 'SOL - Flexible', amount: 50, earned: 1.2, apr: 8.5, daysLeft: 0 },
    ];

    res.json({
      success: true,
      data: stakes
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
