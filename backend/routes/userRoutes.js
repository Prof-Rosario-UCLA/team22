import express from "express";
import authenticate from "../middleware/auth.js";
import { getUserHobbies, saveUserHobby, deleteUserHobby } from "../services/firestoreService.js";
import { generateNewHobby } from "../services/geminiService.js";
import {
  cacheUserHooby,
  getCachedUserHobbies,
} from "../services/redisService.js";

const router = express.Router();

router.post("/save-Hobby", authenticate, async (req, res) => {
  console.log("Hitting /user/save-Hobby");
  try {
    const userId = req.user.uid;
    const hobbyData = req.body;
    await saveUserHobby(userId, hobbyData);
    res.status(201).json({ message: "User data stored successfully." });
  } catch (e) {
    console.log("Error posting hobby: " + e.message);
    res.status(500).json({ error: e.message });
  }
});

router.get("/hobbies", authenticate, async (req, res) => {
  console.log("Hitting /user/hobbies");
  try {
    const userHobbies = await getUserHobbies(req.user.uid);
    res.status(200).json(userHobbies);
  } catch (e) {
    console.log("Failed to fetch hobbies: " + e.message);
    res.status(500).json({ error: "Failed to fetch hobbies: " + e.message });
  }
});

router.delete("/delete-hobby/:hobbyId", authenticate, async (req, res) => {
  const { hobbyId } = req.params;
  console.log(`Hitting /user/delete-hobby/${hobbyId}`);
  try {
    const userId = req.user.uid;
    await deleteUserHobby(userId, hobbyId);
    res.status(200).json({ message: "Hobby deleted successfully." });
  } catch (e) {
    console.error("Error deleting hobby:", e.message);
    res.status(500).json({ error: "Failed to delete hobby: " + e.message });
  }
});

router.get("/recommend-Hobby", authenticate, async (req, res) => {
  console.log("Hitting /user/recommend-Hobby");
  try {
    const hobbies = await getUserHobbies(req.user.uid);
    const newHobby = await generateNewHobby(hobbies);
    res.status(200).json(newHobby);
  } catch (e) {
    console.log("Failed to generate hobbies: " + e.message);
    res.status(500).json({ error: "Failed to generate hobbies: " + e.message });
  }
});

router.get("/cached-hobbies", authenticate, async (req, res) => {
  console.log("Hitting /cached-hobbies");
  try {
    const cachedHobbies = await getCachedUserHobbies(req.user.uid);
    res.status(200).json(cachedHobbies);
  } catch (e) {
    console.log("Failed to fetch cached hobbies: " + e.message);
    res
      .status(500)
      .json({ error: "Failed to fetch cached hobbies: " + e.message });
  }
});

router.post("/cache-recommended-hobby", authenticate, async (req, res) => {
  console.log("hitting /cache-recommended-hobby");
  try {
    const userId = req.user.uid;
    const hobbyData = req.body;
    await cacheUserHooby(userId, hobbyData);
    res.status(200).json("Cached user hobby");
  } catch (e) {
    console.log("Failed to cache hobby: " + e.message);
    res.status(500).json({ error: "Failed to cache hobby: " + e.message });
  }
});

export default router;
