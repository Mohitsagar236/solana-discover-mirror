const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async fetchData<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  private async postData<T>(endpoint: string, body: any): Promise<T> {
    return this.fetchData<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  // Tokens
  async getTokenPrices() {
    return this.fetchData('/tokens/prices');
  }

  async getTokenDetails(symbol: string) {
    return this.fetchData(`/tokens/${symbol}`);
  }

  async getTokens(params?: { category?: string; trending?: boolean; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.trending) query.append('trending', 'true');
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return this.fetchData(`/tokens?${query.toString()}`);
  }

  // Markets
  async getMarketStats() {
    return this.fetchData('/markets/stats');
  }

  async getTrendingTokens(limit = 10) {
    return this.fetchData(`/markets/trending?limit=${limit}`);
  }

  async getTopVolume(limit = 10) {
    return this.fetchData(`/markets/volume?limit=${limit}`);
  }

  // Trading
  async getTradingPairs() {
    return this.fetchData('/trading/pairs');
  }

  async getOrderBook(pair: string) {
    return this.fetchData(`/trading/orderbook/${pair}`);
  }

  async getRecentTrades(pair: string) {
    return this.fetchData(`/trading/trades/${pair}`);
  }

  async placeOrder(orderData: any) {
    return this.postData('/trading/order', orderData);
  }

  async cancelOrder(orderId: string) {
    return this.postData(`/trading/order/${orderId}/cancel`, {});
  }

  async getUserOrders(address: string) {
    return this.fetchData(`/trading/orders/${address}`);
  }

  // Yield
  async getYieldPools() {
    return this.fetchData('/yield/pools');
  }

  async getUserDeposits(address: string) {
    return this.fetchData(`/yield/deposits/${address}`);
  }

  // Staking
  async getStakingPools() {
    return this.fetchData('/staking/pools');
  }

  async getUserStakes(address: string) {
    return this.fetchData(`/staking/stakes/${address}`);
  }

  // Analytics
  async getAnalyticsOverview() {
    return this.fetchData('/analytics/overview');
  }

  async getTopTraders() {
    return this.fetchData('/analytics/top-traders');
  }

  // Governance
  async getProposals() {
    return this.fetchData('/governance/proposals');
  }

  async getProposalDetails(id: string) {
    return this.fetchData(`/governance/proposals/${id}`);
  }
}

export const apiService = new ApiService();
