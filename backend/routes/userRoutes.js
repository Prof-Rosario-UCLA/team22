import express from 'express';
import authenticate from '../middleware/auth.js';
import { saveUserData, saveUserHobby } from '../services/userService.js';

const router = express.Router();

router.post("/saveHobby", authenticate, async(req, res) => {
  try {
    const userId = req.user.uid;
    const userData = req.body;
    await saveUserHobby(userId, userData);
    res.status(200).json({ message: 'User data stored successfully.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

export default router;