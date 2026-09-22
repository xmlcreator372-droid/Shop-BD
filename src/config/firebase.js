import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * ============================================================================
 * SHOP BD - FIREBASE CONFIGURATION
 * ============================================================================
 * Replace the placeholder values below with your real Firebase Project credentials.
 * Obtain these from the Firebase Console: Project Settings -> General -> Your Apps.
 * 
 * NOTE: The application supports seamless fallback mode so that you can
 * immediately explore and test all User and Admin features before adding real
 * Firebase credentials.
 * ============================================================================
 */
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE",
  measurementId: "PASTE_YOUR_MEASUREMENT_ID_HERE"
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE" &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "PASTE_YOUR_PROJECT_ID_HERE"
  );
};

// Initialize Firebase only once
let app = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { app, auth, db, storage };
