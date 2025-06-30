import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gem, MessageSquare, Shield, Timer, Zap } from 'lucide-react';

const DailyQuest = ({ icon: Icon, title, progress, max, reward: RewardIcon }: { icon: React.ElementType, title: string, progress: number, max: number, reward: React.ElementType }) => (
  <div className="flex items-center gap-4">
    <div className="bg-primary/10 text-primary p-3 rounded-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-foreground">{title}</p>
      <Progress value={(progress / max) * 100} className="h-2 mt-1" />
      <p className="text-xs text-muted-foreground mt-1">{progress} / {max}</p>
    </div>
    <RewardIcon className="w-8 h-8 text-yellow-400" />
  </div>
);

export function LeftSidebar() {
  const quests = [
    { icon: Zap, title: 'Earn 10 XP', progress: 0, max: 10, reward: Gem },
    { icon: Timer, title: 'Spend 5 minutes learning', progress: 0, max: 5, reward: Gem },
    { icon: Gem, title: 'Earn 15 Combo Bonus XP', progress: 0, max: 15, reward: Gem },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-lg border-border/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">My Assignments</CardTitle>
          <MessageSquare className="w-6 h-6 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Check back for your first assignment!</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-lg border-border/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">Sapphire League</CardTitle>
          <Button variant="link" className="p-0 h-auto text-primary">VIEW LEAGUE</Button>
        </CardHeader>
        <CardContent className="text-center">
            <Shield className="w-16 h-16 text-blue-400 mx-auto" />
          <p className="text-muted-foreground text-sm mt-2">This week's leaderboard starts in 1 hour.</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-lg border-border/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">Daily Quests</CardTitle>
          <Button variant="link" className="p-0 h-auto text-primary">VIEW ALL</Button>
        </CardHeader>
        <CardContent className="space-y-4">
            {quests.map((quest, index) => (
                <DailyQuest key={index} {...quest} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
