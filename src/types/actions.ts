
import { z } from 'zod';

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
