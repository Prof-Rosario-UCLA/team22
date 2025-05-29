import { db } from '../config/firebase.js';
import { HobbySchema } from '../models/Hobby.js';

export const saveUserHobby = async (uid, hobbyData) => {
  try {
    const parsedHobby = HobbySchema.parse(hobbyData);
    const hobbyWithMetaData = {
      ...parsedHobby,
      createdAt: new Date(),
    };
    await db.collection('users')
            .doc(uid)
            .collection('hobbies')
            .add(hobbyWithMetaData);
  } catch (e) {
    throw new Error(`Invalid hobby data: ${e.message}`);
  }
}