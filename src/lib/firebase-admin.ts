'use server';
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Ensure the app is only initialized once
if (!admin.apps.length) {
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
export const adminApp = admin.app();
