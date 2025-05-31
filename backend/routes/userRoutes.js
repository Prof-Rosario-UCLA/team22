import express from 'express';
import authenticate from '../middleware/auth.js';
import { getUserHobbies, saveUserHobby } from '../services/firestoreService.js';
import { generateNewHobby } from '../services/geminiService.js';
import { cacheUserHooby, getCachedUserHobbies } from '../services/redisService.js';

const router = express.Router();

router.post("/save-Hobby", authenticate, async(req, res) => {
  try {
    const userId = req.user.uid;
    const hobbyData = req.body;
    await saveUserHobby(userId, hobbyData);
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

router.get("/recommend-Hobby", authenticate, async(req, res) => {
  try { 
    const hobbies = await getUserHobbies(req.user.uid);
    const newHobby = await generateNewHobby(hobbies);
    res.status(200).json(newHobby);
  } catch (e) {
    res.status(500).json({ error: 'Failed to generate hobbies: ' + e.message });
  }
})

router.get("/cached-hobbies", authenticate, async(req, res) => {
  try {
    const cachedHobbies = await getCachedUserHobbies(req.user.uid);
    res.status(200).json(cachedHobbies);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch cached hobbies: ' + e.message });
  }
})

router.post("/cache-recommended-hobby", authenticate, async(req, res) => {
  try {
    const userId = req.user.uid;
    const hobbyData = req.body;
    await cacheUserHooby(userId, hobbyData);
    res.status(200).json("Cached user hobby");
  } catch (e) {
    res.status(500).json({ error: 'Failed to cache hobby: ' + e.message });
  }
})

export default router;