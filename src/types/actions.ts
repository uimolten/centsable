
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


export const SaveProgressInputSchema = z.object({
    userId: z.string(),
    lessonId: z.string(),
    xpGained: z.number(),
    centsGained: z.number(),
});
export type SaveProgressInput = z.infer<typeof SaveProgressInputSchema>;

export const SaveProgressOutputSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
});
export type SaveProgressOutput = z.infer<typeof SaveProgressOutputSchema>;


export const AddXpInputSchema = z.object({
  userId: z.string().describe('The UID of the user to grant XP to.'),
  amount: z.number().int().positive().describe('The amount of XP to add.'),
  cents: z.number().int().optional().describe('The amount of cents to add.'),
  lessonId: z.string().optional().describe('The optional ID of the lesson completed.'),
});
export type AddXpInput = z.infer<typeof AddXpInputSchema>;

export const AddXpOutputSchema = z.object({
  success: z.boolean(),
  leveledUp: z.boolean().describe('Indicates if the user leveled up.'),
  newLevel: z.number().optional().describe("The user's new level if they leveled up."),
  rewardCents: z.number().optional().describe('The cents awarded for leveling up.'),
  message: z.string().optional(),
});
export type AddXpOutput = z.infer<typeof AddXpOutputSchema>;

export const AwardGameRewardsInputSchema = z.object({
    userId: z.string(),
    score: z.number(),
});
export type AwardGameRewardsInput = z.infer<typeof AwardGameRewardsInputSchema>;

export const AwardGameRewardsOutputSchema = z.object({
    success: z.boolean(),
    xpAwarded: z.number(),
    centsAwarded: z.number(),
});
export type AwardGameRewardsOutput = z.infer<typeof AwardGameRewardsOutputSchema>;
