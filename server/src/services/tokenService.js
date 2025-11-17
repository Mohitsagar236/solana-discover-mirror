const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL_PRICES) || 30 });
const COINGECKO_API_URL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

// Solana token addresses
const TOKEN_ADDRESSES = {
  SOL: 'So11111111111111111111111111111111111111112',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  PYTH: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
  JTO: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
  RNDR: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof',
  HNT: 'hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  ORCA: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
  MNDE: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey',
  W: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ',
  KMNO: 'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',
  TNSR: 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6',
  DRIFT: 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7',
  ME: 'MEFNBXixkEbait3xn9bkm8WsJzXtVsaJEn4c8Sam21u',
  PRCL: 'PrcLKZNe4RLZEoQJ3xzj6VcNfEi96PJVh8FDQf6sBP',
  GRASS: 'Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs',
  CLOUD: 'CLdL7bSEzjvfuPvNfXeF6v3e3f3fv3f3fv3f3fv3f3f',
  MRGN: 'MRGNPxMWQdQdFjhVjjMVbKZAYfBBqAQPBMHvC2z3Y3',
  ZETA: 'ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD',
};

// CoinGecko IDs for tokens
const COINGECKO_IDS = {
  SOL: 'solana',
  BONK: 'bonk',
  JUP: 'jupiter-exchange-solana',
  PYTH: 'pyth-network',
  JTO: 'jito-governance-token',
  RNDR: 'render-token',
  HNT: 'helium',
  RAY: 'raydium',
  ORCA: 'orca',
  MNDE: 'marinade',
  W: 'wormhole',
  USDC: 'usd-coin',
  USDT: 'tether',
  ETH: 'ethereum',
  BTC: 'bitcoin',
};

class TokenService {
  async getTokenPrices() {
    const cached = cache.get('token_prices');
    if (cached) return cached;

    try {
      const ids = Object.values(COINGECKO_IDS).join(',');
  const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids,
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_24hr_vol: true,
          include_market_cap: true
        }
      });

      const prices = {};
      Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
        if (response.data[id]) {
          prices[symbol] = {
            price: response.data[id].usd,
            change24h: response.data[id].usd_24h_change,
            volume24h: response.data[id].usd_24h_vol,
            marketCap: response.data[id].usd_market_cap
          };
        }
      });

      cache.set('token_prices', prices);
      return prices;
    } catch (error) {
      console.error('Error fetching token prices:', error.message);
      return this.getMockPrices();
    }
  }

  async getTokenDetails(symbol) {
    try {
      const coinId = COINGECKO_IDS[symbol.toUpperCase()];
      if (!coinId) throw new Error('Token not found');

  const response = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false
        }
      });

      return {
        symbol: symbol.toUpperCase(),
        name: response.data.name,
        price: response.data.market_data.current_price.usd,
        change24h: response.data.market_data.price_change_percentage_24h,
        volume24h: response.data.market_data.total_volume.usd,
        marketCap: response.data.market_data.market_cap.usd,
        high24h: response.data.market_data.high_24h.usd,
        low24h: response.data.market_data.low_24h.usd,
        circulatingSupply: response.data.market_data.circulating_supply,
        totalSupply: response.data.market_data.total_supply,
        description: response.data.description.en
      };
    } catch (error) {
      console.error('Error fetching token details:', error.message);
      throw error;
    }
  }

  getMockPrices() {
    return {
      SOL: { price: 142.35, change24h: 5.23, volume24h: 1200000000, marketCap: 65000000000 },
      BONK: { price: 0.000023, change24h: 12.34, volume24h: 45000000, marketCap: 1500000000 },
      JUP: { price: 0.85, change24h: 8.45, volume24h: 120000000, marketCap: 850000000 },
      USDC: { price: 1.00, change24h: 0.01, volume24h: 5000000000, marketCap: 25000000000 },
      USDT: { price: 1.00, change24h: -0.02, volume24h: 8000000000, marketCap: 90000000000 },
      ETH: { price: 2234.12, change24h: 3.45, volume24h: 15000000000, marketCap: 270000000000 },
      BTC: { price: 43521.00, change24h: -1.23, volume24h: 45000000000, marketCap: 850000000000 },
    };
  }
}

module.exports = new TokenService();
