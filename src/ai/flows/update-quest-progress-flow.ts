
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, writeBatch, increment, doc } from "firebase/firestore";
import type { QuestActionType, Quest } from '@/types/quests';
import type { UserData } from '@/types/user';

const UpdateQuestProgressInputSchema = z.object({
  userId: z.string(),
  actionType: z.custom<QuestActionType>(),
});
type UpdateQuestProgressInput = z.infer<typeof UpdateQuestProgressInputSchema>;

const UpdateQuestProgressOutputSchema = z.object({
  success: z.boolean(),
  questsUpdated: z.number(),
});
type UpdateQuestProgressOutput = z.infer<typeof UpdateQuestProgressOutputSchema>;


const actionToQuestMap: Record<QuestActionType, string[]> = {
    complete_quiz_question: ['quiz_whiz'],
    complete_lesson_step: ['lesson_learner'],
    start_new_lesson: ['topic_starter'],
    complete_unit: ['unit_finisher'],
    complete_practice_session: ['practice_perfect'],
    play_minigame_round: ['game_on', 'budget_buster_champ'],
    beat_high_score: ['high_scorer'],
    login: ['login_streak'],
    update_profile: ['profile_updater'],
    visit_page: ['explorer'],
    create_goal: [], // No quest for this action currently
};

export async function updateQuestProgress(input: UpdateQuestProgressInput): Promise<UpdateQuestProgressOutput> {
  return updateQuestProgressFlow(input);
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
      if (!relevantQuestIds || relevantQuestIds.length === 0) {
        return { success: true, questsUpdated: 0 };
      }

      const userDocRef = doc(db, "users", userId);
      const questsRef = collection(userDocRef, "daily_quests");
      
      const q = query(
        questsRef, 
        where('questId', 'in', relevantQuestIds),
        where('isCompleted', '==', false)
      );

      const questsToUpdateSnapshot = await getDocs(q);
      if (questsToUpdateSnapshot.empty) {
        return { success: true, questsUpdated: 0 };
      }

      const batch = writeBatch(db);
      let updatedCount = 0;
      let justCompletedQuests: string[] = [];

      questsToUpdateSnapshot.forEach(questDoc => {
        const quest = { id: questDoc.id, ...questDoc.data() } as Quest;
        const newProgress = quest.currentProgress + 1;

        batch.update(questDoc.ref, { currentProgress: increment(1) });
        
        if (newProgress >= quest.targetAmount) {
          batch.update(questDoc.ref, { isCompleted: true });
          batch.update(userDocRef, {
            xp: increment(quest.rewardXP),
            cents: increment(quest.rewardCents)
          });
          justCompletedQuests.push(questDoc.id);
        }
        updatedCount++;
      });
      
      // We only want to check for the grand bonus if at least one quest was just completed.
      if (justCompletedQuests.length > 0) {
        const allQuestsSnapshot = await getDocs(questsRef);
        const allQuests = allQuestsSnapshot.docs.map(doc => doc.data() as Quest);

        // This checks if ALL quests are now complete.
        // It's important to do this check outside the forEach loop to have the full picture.
        const allDailyQuestsCompleted = allQuests.every(q => 
            q.isCompleted || justCompletedQuests.includes((q as any).id)
        );
        
        const userDoc = await userDocRef.get();
        const userData = userDoc.data() as UserData;

        // Give bonus only if all quests are done and bonus hasn't been given yet
        if (allDailyQuestsCompleted && allQuests.length === 3 && !userData.dailyQuestsCompleted) {
           batch.update(userDocRef, {
             xp: increment(25),
             cents: increment(15),
             dailyQuestsCompleted: true, // Set flag to prevent giving bonus again
           });
        }
      }

      await batch.commit();

      return { success: true, questsUpdated: updatedCount };
    } catch (error) {
      console.error("Error updating quest progress:", error);
      return { success: false, questsUpdated: 0 };
    }
  }
);
