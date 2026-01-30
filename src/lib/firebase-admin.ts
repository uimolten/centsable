
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';

// Ensure the app is only initialized once
// Ensure the app is only initialized once
if (!getApps().length) {
  try {
    let serviceAccount;

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Start: Production / Vercel environment
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      } catch (jsonError) {
        // Handle potential parsing error or if it's not a JSON string but just a mismatch
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY JSON.", jsonError);
        throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_KEY format");
      }
      // End: Production / Vercel environment
    } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
      // Alternative: Individual Env Vars (Common in Vercel)
      serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace literal \n with actual newlines if necessary
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      };
    } else {
      // Start: Local development fallback
      // Note: This needs to be available at runtime. 
      // If service-account.json is not committed, this will fail in prod if we fall through here.
      try {
        serviceAccount = require('../../service-account.json');
      } catch (err) {
        console.warn("Could not load local service-account.json. Assuming environment variables provided credentials.", err);
      }
      // End: Local development fallback
    }

    if (!serviceAccount) {
      throw new Error("No Firebase service account credentials found. Set FIREBASE_SERVICE_ACCOUNT_KEY or individual vars.");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (e) {
    console.error('Firebase admin initialization error', e);
    // Important: We must not swallow this error if we plan to use the app immediately.
    // However, crashing top-level module usage can be aggressive.
    // Better to let getFirestore() throw if init failed, but at least we logged WHY it failed above.
  }
}

export const adminDb = getFirestore();
export const adminAuth = admin.auth();
