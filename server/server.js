import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { safeJsonParser } from './middlewares/jsonParser.js';
import { errorHandler } from './middlewares/errorHandle.js';
import { seedAdminUser } from './utils/seedAdmin.js';
import { fixDbConstraints } from './utils/fixDbConstraints.js';
import { applySecurityHeaders } from './middlewares/securityHeaders.js';

dotenv.config();

// Initialize Express App
const app = express();
const port = process.env.PORT || 3000;

// Hide Server Signature
app.disable('x-powered-by');

// Security Middleware Suite
app.use(applySecurityHeaders);
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(safeJsonParser);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'LifePulse Blood Safety Backend',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/users', userRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server & Run Database Initialization
app.listen(port, async () => {
  console.log(`🔒 Secure server running on port ${port}`);
  await fixDbConstraints();
  await seedAdminUser();
});