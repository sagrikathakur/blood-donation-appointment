import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// express //
const app = express();
const port = process.env.PORT || 3000;

// Middleware//
app.use(cors());
app.use(express.json());

// routes//
app.get('/', (req, res) => {
  res.status(200).json({
    message: "server is running"
  });
});

app.use('/api/users', userRoutes);

// listen//
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});