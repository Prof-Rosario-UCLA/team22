import express from "express";
import authenticate from "../middleware/auth.js";
import { getUserHobbies, 
  saveUserHobby, 
  deleteUserHobby,
  updateUserHobby, 
  getUserHobbyById
} from "../services/firestoreService.js";
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
    const hobby = await saveUserHobby(userId, hobbyData);
    res.status(201).json(hobby);
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

router.get("/hobby/:hobbyId", authenticate, async(req, res) => {
  const { hobbyId } = req.params;
  console.log(`Hitting /user/hobby/${hobbyId}`);
  try {
    const userId = req.user.uid;
    const hobby = await getUserHobbyById(userId, hobbyId);
    res.status(200).json(hobby);
  } catch (e) {
    console.log(`Failed to fetch hobby ${hobbyId}: ` + e.message);
    res.status(500).json({ error: `Failed to fetch hobby ${hobbyId}: ` + e.message });
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

router.patch("/update-hobby/:hobbyId", authenticate, async(req, res) => {
  const { hobbyId } = req.params;
  console.log("Hitting /user/update-hobby");
  try {
    const userId = req.user.uid;
    const updateData = req.body;
    updateUserHobby(userId, hobbyId, updateData);
    res.status(200).json({ message : "Hobby updated successfully."});
  } catch (e) {
    console.error("Error updating hobby:", e.message);
    res.status(500).json({ error: "Failed to update hobby: " + e.message });
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
