
'use server';
/**
 * @fileOverview A server-side flow for securely updating a user's display name.
 * 
 * - updateUsername - A function that validates a new username for profanity and updates it in Firestore.
 * - UpdateUsernameInput - The input type for the updateUsername function.
 * - UpdateUsernameOutput - The return type for the updateUsername function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const UpdateUsernameInputSchema = z.object({
  userId: z.string().describe('The UID of the user to update.'),
  newUsername: z.string().min(3).max(20).describe('The desired new username.'),
});
export type UpdateUsernameInput = z.infer<typeof UpdateUsernameInputSchema>;

export const UpdateUsernameOutputSchema = z.object({
  success: z.boolean().describe('Whether the update was successful.'),
  message: z.string().optional().describe('An optional message, usually for errors.'),
});
export type UpdateUsernameOutput = z.infer<typeof UpdateUsernameOutputSchema>;

// This is a simple placeholder for a real profanity filter.
// In a production app, you would use a dedicated library or API.
const isProfane = (text: string) => {
    const blocklist = ['admin', 'root', 'moderator', 'cunt', 'shit', 'fuck'];
    const lowercasedText = text.toLowerCase();
    return blocklist.some(word => lowercasedText.includes(word));
}

const profanityCheckTool = ai.defineTool(
    {
      name: 'profanityCheck',
      description: 'Checks if a given text contains profane or inappropriate words.',
      inputSchema: z.object({ text: z.string() }),
      outputSchema: z.object({ isProfane: z.boolean() }),
    },
    async (input) => {
      return { isProfane: isProfane(input.text) };
    }
);

export async function updateUsername(input: UpdateUsernameInput): Promise<UpdateUsernameOutput> {
  return updateUsernameFlow(input);
}

const updateUsernameFlow = ai.defineFlow(
  {
    name: 'updateUsernameFlow',
    inputSchema: UpdateUsernameInputSchema,
    outputSchema: UpdateUsernameOutputSchema,
  },
  async ({ userId, newUsername }) => {
    
    const llmResponse = await ai.generate({
        prompt: `Evaluate the following username for appropriateness for a financial education app for teens. Consider profanity, slurs, and generally inappropriate content. Username: "${newUsername}"`,
        tools: [profanityCheckTool],
        model: 'googleai/gemini-2.0-flash'
    });

    const toolOutput = llmResponse.toolRequest?.output?.parts.find(part => part.toolResponse?.name === 'profanityCheck');
    const isProfaneByTool = toolOutput?.toolResponse?.response.isProfane;

    if (isProfaneByTool) {
        return { success: false, message: 'This username is not appropriate. Please choose another.' };
    }

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        displayName: newUsername
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating username:", error);
      return { success: false, message: 'Failed to update username in the database.' };
    }
  }
);
