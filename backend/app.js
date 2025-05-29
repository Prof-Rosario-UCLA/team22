import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use('/user', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});