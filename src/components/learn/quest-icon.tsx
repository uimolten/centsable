
import { QuestId } from '@/types/quests';
import { Target, BookOpen, Gamepad2, Goal, Search, Flame } from 'lucide-react';

interface QuestIconProps {
  questId: QuestId;
  className?: string;
}

export function QuestIcon({ questId, className = "w-6 h-6" }: QuestIconProps) {
  switch (questId) {
    case 'quiz_whiz':
      return <Target className={className} />;
    case 'lesson_learner':
      return <BookOpen className={className} />;
    case 'game_on':
      return <Gamepad2 className={className} />;
    case 'goal_setter':
      return <Goal className={className} />;
    case 'knowledge_seeker':
      return <Search className={className} />;
    case 'login_streak':
      return <Flame className={className} />;
    default:
      return <Target className={className} />;
  }
}
