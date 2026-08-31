import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

// express //
const app = express();
const port = process.env.PORT;

// Middleware//
app.use(express.json());

// routes//
app.get('/', (req, res) => {
  res.status(200).json({
    message: "server is running"

  })
})

// listen//
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})