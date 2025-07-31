
'use server';
/**
 * @fileOverview A server-side flow for securely saving a game summary to a user's profile.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SaveGameSummaryInputSchema = z.object({
  userId: z.string().describe('The UID of the user to update.'),
  gameId: z.string().describe('The ID of the game being summarized.'),
  summaryData: z.any().describe('The JSON object containing the game summary data.'),
});
export type SaveGameSummaryInput = z.infer<typeof SaveGameSummaryInputSchema>;

const SaveGameSummaryOutputSchema = z.object({
  success: z.boolean().describe('Whether the update was successful.'),
  message: z.string().optional().describe('An optional message, usually for errors.'),
});
export type SaveGameSummaryOutput = z.infer<typeof SaveGameSummaryOutputSchema>;

export async function saveGameSummary(input: SaveGameSummaryInput): Promise<SaveGameSummaryOutput> {
  return saveGameSummaryFlow(input);
}

const saveGameSummaryFlow = ai.defineFlow(
  {
    name: 'saveGameSummaryFlow',
    inputSchema: SaveGameSummaryInputSchema,
    outputSchema: SaveGameSummaryOutputSchema,
  },
  async ({ userId, gameId, summaryData }) => {
    try {
      const userDocRef = doc(db, "users", userId);
      
      const fieldToUpdate = `gameSummaries.${gameId}`;

      await updateDoc(userDocRef, {
        [fieldToUpdate]: summaryData
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error saving game summary:", error);
      const message = error instanceof Error ? error.message : 'Failed to save game summary.';
      return { success: false, message };
    }
  }
);
