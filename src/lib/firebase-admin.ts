
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';

// Ensure the app is only initialized once
if (!getApps().length) {
  try {
    let serviceAccount;
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Start: Production / Vercel environment
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      // End: Production / Vercel environment
    } else {
      // Start: Local development fallback
      serviceAccount = require('../../service-account.json');
      // End: Local development fallback
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

export const adminDb = getFirestore();
export const adminAuth = admin.auth();
