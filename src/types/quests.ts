
import { z } from 'zod';

// Define the valid Quest IDs
export const QuestIdSchema = z.enum([
  'quiz_whiz',
  'lesson_learner',
  'game_on',
  'goal_setter',
  'knowledge_seeker',
  'login_streak',
]);
export type QuestId = z.infer<typeof QuestIdSchema>;

// Define the valid action types that can trigger quest progress
export const QuestActionTypeSchema = z.enum([
  'answer_quiz_question_correctly',
  'complete_lesson_step',
  'play_minigame_round',
  'create_savings_goal',
  'review_flashcard',
  'login',
  'complete_lesson', // Generic for completing any lesson/practice/quiz
]);
export type QuestActionType = z.infer<typeof QuestActionTypeSchema>;


// The static definition of a quest
export interface Quest {
  id: QuestId;
  descriptionTemplate: string; // e.g., "Answer [X] quiz questions correctly."
  actionType: QuestActionType | QuestActionType[];
  targetRange: [number, number]; // [min, max] for randomized goal
  reward: {
    xp: number;
    cents: number;
  };
}

// The user-specific instance of a quest stored in Firestore
export const DailyQuestSchema = z.object({
  questId: QuestIdSchema,
  description: z.string(),
  targetAmount: z.number(),
  currentProgress: z.number(),
  isCompleted: z.boolean(),
  rewardXP: z.number(),
  rewardCents: z.number(),
});
export type DailyQuest = z.infer<typeof DailyQuestSchema>;


// Schema for generating quests
export const GenerateDailyQuestsInputSchema = z.object({
  userId: z.string(),
});
export type GenerateDailyQuestsInput = z.infer<typeof GenerateDailyQuestsInputSchema>;

export const GenerateDailyQuestsOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type GenerateDailyQuestsOutput = z.infer<typeof GenerateDailyQuestsOutputSchema>;


// Schema for updating quest progress
export const UpdateQuestProgressInputSchema = z.object({
  userId: z.string(),
  actionType: QuestActionTypeSchema,
});
export type UpdateQuestProgressInput = z.infer<typeof UpdateQuestProgressInputSchema>;

export const UpdateQuestProgressOutputSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
export type UpdateQuestProgressOutput = z.infer<typeof UpdateQuestProgressOutputSchema>;
