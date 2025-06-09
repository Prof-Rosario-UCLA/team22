import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// TODO configure cores
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Optional: needed if you're sending cookies or auth headers
}));

app.use(express.json());

// Mount routes
app.use('/user', userRoutes);

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