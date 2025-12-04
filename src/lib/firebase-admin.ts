
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';

// Ensure the app is only initialized once
if (!getApps().length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (e) {
    console.error('Firebase admin initialization error', e);
  }
}

export const adminDb = getFirestore();
export const adminAuth = admin.auth();
