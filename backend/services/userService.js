import { db } from '../config/firebase.js';

export const saveUserData = async (uid, data) => {
  await db.collection('users')
          .doc(uid)
          .collection('hobbies')
          .add({
            ...data, 
            createdAt: new Date()
          });
};