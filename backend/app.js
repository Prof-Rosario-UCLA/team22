import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// TODO configure cores
app.use(cors({
  origin: ['http://localhost:5173', 'https://team22.cs144.org'],
  credentials: true, // Optional: needed if you're sending cookies or auth headers
}));

app.use(express.json());

// Mount routes
app.use('/api/user', userRoutes);

const PORT_DEV = process.env.PORT_DEV || 8080;
/*
app.listen(PORT_DEV, () => {
  console.log(`Server is running at http://localhost:${PORT_DEV}`);
});
*/
// Testing prod
app.listen(PORT_DEV, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT_DEV}`);
});