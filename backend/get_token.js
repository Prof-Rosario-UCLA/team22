import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

/*
Script to generate token from a registered user on Firebase
*/

// Set up a fake DOM for Firebase Auth to work
const { window } = new JSDOM('');
global.window = window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };
global.fetch = fetch;

// Your Firebase Web Config (from Firebase Console > Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyCgMDMecGoTsomBYgEFRQqBrE33QOTrdO4",
    authDomain: "cs144finalproject.firebaseapp.com",
    projectId: "cs144finalproject",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

(async () => {
  try {
    const email = 'genekung@test.com';
    const password = '123456';

    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    console.log('Firebase ID Token:\n');
    console.log(token);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
