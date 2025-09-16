import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Firebase configuration for emulators
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Connect to emulators (only in development)
if (__DEV__) {
  try {
    // Connect Auth emulator
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    
    // Connect Firestore emulator
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    
    // Connect Storage emulator
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    
    console.log('🔥 Connected to Firebase emulators');
  } catch (error) {
    console.log('⚠️ Firebase emulators not running or already connected:', error);
  }
}

export default app;