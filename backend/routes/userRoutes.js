import express from 'express';
import authenticate from '../middleware/auth.js';
import { saveUserData } from '../services/userService.js';

const router = express.Router();

router.post('/user-data', authenticate, async (req, res) => {
  try {
    const userId = req.user.uid;
    const userData = req.body;

    await saveUserData(userId, userData);

    res.status(200).json({ message: 'User data stored successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;