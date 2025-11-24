import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ------------------------------------------------------------------
// TÄRKEÄÄ: KORVAA NÄMÄ ARVOT OMILLA FIREBASE-PROJEKTISI ARVOILLA
// Löydät nämä: Firebase Console -> Project Settings -> General -> Your apps
// ------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
// We use a try-catch block so the app doesn't crash immediately if keys are missing during development
let app;
let auth: any;
let googleProvider: any;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
} catch (error) {
    console.warn("Firebase not initialized. Check firebaseConfig.ts");
}

export { auth, googleProvider };