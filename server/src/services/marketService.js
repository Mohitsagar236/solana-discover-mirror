const { Connection, PublicKey } = require('@solana/web3.js');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL_MARKETS) || 60 });

class MarketService {
  constructor() {
    this.connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');
  }

  async getMarketStats() {
    const cached = cache.get('market_stats');
    if (cached) return cached;

    try {
      // In production, aggregate from multiple sources
      const stats = {
        totalMarketCap: 85200000000,
        volume24h: 3800000000,
        activeTokens: 450,
        topGainer: { symbol: 'GRASS', change: 18.45 },
        totalValueLocked: 1200000000,
        activeTrades: 45200,
        timestamp: new Date().toISOString()
      };

      cache.set('market_stats', stats);
      return stats;
    } catch (error) {
      console.error('Error fetching market stats:', error.message);
      throw error;
    }
  }

  async getTrendingTokens(limit = 10) {
    try {
      // Mock data - in production, fetch from trending APIs
      const trending = [
        { symbol: 'GRASS', change24h: 18.45, volume: 32000000 },
        { symbol: 'JTO', change24h: 15.67, volume: 95000000 },
        { symbol: 'BONK', change24h: 12.34, volume: 45000000 },
        { symbol: 'PHNX', change24h: 11.23, volume: 6000000 },
        { symbol: 'KMNO', change24h: 9.12, volume: 18000000 }
      ];

      return trending.slice(0, limit);
    } catch (error) {
      console.error('Error fetching trending tokens:', error.message);
      throw error;
    }
  }

  async getTopVolume(limit = 10) {
    try {
      const topVolume = [
        { symbol: 'SOL', volume24h: 1200000000, trades: 125000 },
        { symbol: 'USDC', volume24h: 980000000, trades: 95000 },
        { symbol: 'BTC', volume24h: 850000000, trades: 45000 },
        { symbol: 'ETH', volume24h: 720000000, trades: 38000 },
        { symbol: 'JUP', volume24h: 450000000, trades: 28000 }
      ];

      return topVolume.slice(0, limit);
    } catch (error) {
      console.error('Error fetching top volume:', error.message);
      throw error;
    }
  }
}

module.exports = new MarketService();
