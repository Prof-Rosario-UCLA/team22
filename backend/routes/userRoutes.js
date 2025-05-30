import express from 'express';
import authenticate from '../middleware/auth.js';
import { getUserHobbies, saveUserHobby } from '../services/userService.js';
import { generateNewHobby } from '../services/geminiService.js';

const router = express.Router();

router.post("/saveHobby", authenticate, async(req, res) => {
  try {
    const userId = req.user.uid;
    const userData = req.body;
    await saveUserHobby(userId, userData);
    res.status(201).json({ message: 'User data stored successfully.' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
})

router.get("/hobbies", authenticate, async(req, res) => {
  try {
    const hobbies = await getUserHobbies(req.user.uid);
    res.status(200).json(hobbies);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch hobbies: ' + e.message });
  }
})

router.get("/newHobby", authenticate, async(req, res) => {
  try { 
    const hobbies = await getUserHobbies(req.user.uid);
    const newHobby = await generateNewHobby(hobbies);
    res.status(200).json(newHobby);
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate hobbies: ' + e.message });
  }
})

export default router;