import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

// Derive databaseURL from projectId if not provided
const derivedDbUrl = REACT_APP_FIREBASE_DATABASE_URL || (REACT_APP_FIREBASE_PROJECT_ID
  ? `https://${REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
  : undefined);

if (!REACT_APP_FIREBASE_PROJECT_ID || !derivedDbUrl) {
  // Helpful warning without leaking secrets
  // eslint-disable-next-line no-console
  console.warn('[Firebase] Missing env: PROJECT_ID or DATABASE_URL. Check .env. Fallback URL derived:', !!derivedDbUrl);
}

if (!derivedDbUrl) {
  throw new Error(
    '[Firebase] Realtime Database URL is missing. Set REACT_APP_FIREBASE_DATABASE_URL in .env (copy from Firebase Console → Realtime Database → Data URL), or set REACT_APP_FIREBASE_PROJECT_ID so the URL can be derived as https://<projectId>-default-rtdb.firebaseio.com'
  );
}

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: derivedDbUrl,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, derivedDbUrl);
