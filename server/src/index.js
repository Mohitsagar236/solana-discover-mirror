const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const tokensRouter = require('./routes/tokens');
const marketsRouter = require('./routes/markets');
const tradingRouter = require('./routes/trading');
const yieldRouter = require('./routes/yield');
const stakingRouter = require('./routes/staking');
const analyticsRouter = require('./routes/analytics');
const governanceRouter = require('./routes/governance');

const { initWebSocketServer } = require('./websocket/server');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/tokens', tokensRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/trading', tradingRouter);
app.use('/api/yield', yieldRouter);
app.use('/api/staking', stakingRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/governance', governanceRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

// Initialize WebSocket server
initWebSocketServer(server);

module.exports = app;
