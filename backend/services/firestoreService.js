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

export const getUserHobbies = async (uid) => {
  try {
    const snapShot = await db.collection('users')
                             .doc(uid)
                             .collection('hobbies')
                             .get();
    const hobbies = snapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return hobbies;
  } catch (e) {
    throw new Error(`Error retrieving data for user: ${uid}`);
  }
}

export const deleteUserHobby = async (uid, hobbyId) => {
  try {
    await db.collection('users')
            .doc(uid)
            .collection('hobbies')
            .doc(hobbyId)
            .delete();
  } catch (e) {
    throw new Error(`Failed to delete hobby: ${e.message}`);
  }
}