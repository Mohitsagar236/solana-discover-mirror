const express = require('express');
const router = express.Router();

// Get proposals
router.get('/proposals', async (req, res, next) => {
  try {
    const proposals = [
      {
        id: 'AXM-12',
        title: 'Increase Staking Rewards by 15%',
        description: 'Proposal to increase base staking rewards from 45% to 60% APR',
        status: 'Active',
        category: 'Economics',
        votesFor: 2450000,
        votesAgainst: 450000,
        endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'AXM-11',
        title: 'Launch NFT Rewards Program',
        description: 'Implement exclusive NFT rewards for long-term stakers',
        status: 'Active',
        category: 'Product',
        votesFor: 1850000,
        votesAgainst: 320000,
        endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    res.json({
      success: true,
      data: proposals
    });
  } catch (error) {
    next(error);
  }
});

// Get proposal details
router.get('/proposals/:id', async (req, res, next) => {
  try {
    const proposal = {
      id: req.params.id,
      title: 'Increase Staking Rewards by 15%',
      description: 'Full proposal details...',
      status: 'Active',
      votesFor: 2450000,
      votesAgainst: 450000
    };

    res.json({
      success: true,
      data: proposal
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
