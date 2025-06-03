import { db } from '../config/firebase.js';
import { HobbySchema } from '../models/Hobby.js';

export const saveUserHobby = async (uid, hobbyData) => {
  try {
    const parsedHobby = HobbySchema.parse(hobbyData);
    const hobbyWithMetaData = {
      ...parsedHobby,
      createdAt: new Date(),
    };
    const docRef = await db.collection('users')
                           .doc(uid)
                           .collection('hobbies')
                           .add(hobbyWithMetaData);
    const docSnap = await docRef.get();
    return {
      id: docRef.id,
      ...docSnap.data()
    };
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

export const getUserHobbyById = async (uid, hobbyId) => {
  try {
    const doc = await db.collection('users')
            .doc(uid)
            .collection('hobbies')
            .doc(hobbyId)
            .get();
    return { id: doc.id, ...doc.data() };
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

export const updateUserHobby = async (uid, hobbyId, updatedHobbyData) => {
  try {
    await db.collection('users')
            .doc(uid)
            .collection('hobbies')
            .doc(hobbyId)
            .update(updatedHobbyData);
  } catch (e) {
    throw new Error(`Failed to update hobby: ${e.message}`);
  }
}