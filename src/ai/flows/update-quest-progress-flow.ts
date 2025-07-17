
'use server';
/**
 * @fileOverview A secure server-side flow for updating a user's quest progress.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, doc, getDocs, writeBatch, increment, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UpdateQuestProgressInputSchema, UpdateQuestProgressOutputSchema, type UpdateQuestProgressInput, type UpdateQuestProgressOutput, QuestActionType, QuestId } from '@/types/quests';

// Maps a specific action taken by the user to the quest it might satisfy.
const actionToQuestMap: Record<QuestActionType, QuestId | QuestId[]> = {
    'answer_quiz_question_correctly': 'quiz_whiz',
    'complete_lesson_step': 'lesson_learner',
    'play_minigame_round': 'game_on',
    'create_savings_goal': 'goal_setter',
    'review_flashcard': 'knowledge_seeker',
    'login': 'login_streak',
    'complete_lesson': 'lesson_learner', // also counts as steps
};

export async function updateQuestProgress(input: UpdateQuestProgressInput): Promise<UpdateQuestProgressOutput> {
  // This is a fire-and-forget flow, so we don't need to return the result to the client in most cases.
  // We'll log errors on the server.
  updateQuestProgressFlow(input).catch(console.error);
  return { success: true };
}

const updateQuestProgressFlow = ai.defineFlow(
  {
    name: 'updateQuestProgressFlow',
    inputSchema: UpdateQuestProgressInputSchema,
    outputSchema: UpdateQuestProgressOutputSchema,
  },
  async ({ userId, actionType }) => {
    try {
      const relevantQuestIds = actionToQuestMap[actionType];
      if (!relevantQuestIds) {
        return { success: true, message: 'Action does not correspond to any quest.' };
      }
      
      const questIdsToCheck = Array.isArray(relevantQuestIds) ? relevantQuestIds : [relevantQuestIds];

      const questsCollectionRef = collection(db, 'users', userId, 'daily_quests');
      const q = query(
        questsCollectionRef, 
        where('questId', 'in', questIdsToCheck),
        where('isCompleted', '==', false),
        limit(questIdsToCheck.length) // Look for any of the relevant quests
      );
      
      const questSnapshot = await getDocs(q);

      if (questSnapshot.empty) {
        return { success: true, message: 'No active, relevant quests found for this user.' };
      }

      const batch = writeBatch(db);
      const userDocRef = doc(db, "users", userId);
      
      for (const questDoc of questSnapshot.docs) {
          const questData = questDoc.data();
          const newProgress = (questData.currentProgress || 0) + 1;

          if (newProgress >= questData.targetAmount) {
            // Quest Completed!
            batch.update(questDoc.ref, { 
                currentProgress: newProgress,
                isCompleted: true 
            });
            // Grant rewards securely
            batch.update(userDocRef, {
                xp: increment(questData.rewardXP),
                cents: increment(questData.rewardCents)
            });
          } else {
            // Quest in progress
            batch.update(questDoc.ref, { currentProgress: newProgress });
          }
      }

      await batch.commit();

      return { success: true, message: 'Quest progress updated.' };
    } catch (error) {
      console.error(`Error updating quest progress for user ${userId} and action ${actionType}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      // Note: We don't return false here as this flow is often fire-and-forget.
      // Errors are logged for debugging.
      return { success: false, message: `Failed to update quest progress: ${errorMessage}` };
    }
  }
);
