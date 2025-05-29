import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS_PATH))
  )
});

const db = admin.firestore();

export { admin, db };