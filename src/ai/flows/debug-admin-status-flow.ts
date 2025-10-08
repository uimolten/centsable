
'use server';
/**
 * @fileOverview A debug flow to check a user's admin status without throwing errors.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, getDoc } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import type { UserData } from '@/types/user';

const DebugAdminStatusInputSchema = z.object({
  userId: z.string().describe("The UID of the user to check."),
});
export type DebugAdminStatusInput = z.infer<typeof DebugAdminStatusInputSchema>;

const DebugAdminStatusOutputSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  checkedUid: z.string().optional(),
  docExists: z.boolean().optional(),
  docData: z.any().optional(),
  isAdmin: z.boolean().optional(),
});
export type DebugAdminStatusOutput = z.infer<typeof DebugAdminStatusOutputSchema>;

export async function debugAdminStatus(input: DebugAdminStatusInput): Promise<DebugAdminStatusOutput> {
  return debugAdminStatusFlow(input);
}

const debugAdminStatusFlow = ai.defineFlow(
  {
    name: 'debugAdminStatusFlow',
    inputSchema: DebugAdminStatusInputSchema,
    outputSchema: DebugAdminStatusOutputSchema,
  },
  async ({ userId }) => {
    console.log(`DEBUG: Flow called by authenticated user with UID: ${userId}`);
    
    if (!userId) {
      console.error("DEBUG: Flow called by an unauthenticated user.");
      return { status: "Error", message: "No authenticated user found." };
    }

    try {
      const userDocRef = doc(adminDb, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.error(`DEBUG: Firestore document for UID ${userId} does not exist.`);
        return { 
          status: "Error", 
          message: "User document not found in Firestore.",
          checkedUid: userId 
        };
      }

      const userData = userDoc.data() as UserData;
      console.log(`DEBUG: Found user document with data:`, userData);
      
      return {
        status: "Success",
        checkedUid: userId,
        docExists: true,
        docData: userData,
        isAdmin: userData.role === 'admin'
      };
    } catch (error: any) {
        console.error("DEBUG: An unexpected error occurred in the flow.", error);
        return {
            status: "Error",
            message: `An unexpected server error occurred: ${error.message}`,
            checkedUid: userId
        }
    }
  }
);
