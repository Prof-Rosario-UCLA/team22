import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use('/user', userRoutes);

const PORT_DEV = process.env.PORT_DEV || 8080;
app.listen(PORT_DEV, () => {
  console.log(`Server is running at http://localhost:${PORT_DEV}`);
});