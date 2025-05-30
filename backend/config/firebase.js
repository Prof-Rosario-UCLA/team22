import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

if (process.env.NODE_ENV !== 'ci') {
  // Firebase Admin Initialization
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS_PATH))
    )
  });
  db = admin.firestore();
}

export { admin, db };