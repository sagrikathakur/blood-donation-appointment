import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { safeJsonParser } from './middlewares/jsonParser.js';
import { errorHandler } from './middlewares/errorHandle.js';

dotenv.config();

// express //
const app = express();
const port = process.env.PORT || 3000;

// Middleware//
app.use(cors());
app.use(safeJsonParser);

// routes//
app.get('/', (req, res) => {
  res.status(200).json({
    message: "server is running"
  });
});

app.use('/api/users', userRoutes);

// Global Error Handler Middleware//
app.use(errorHandler);

// listen//
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});