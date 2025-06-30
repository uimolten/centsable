import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UnitHeaderProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export function UnitHeader({ Icon, title, description }: UnitHeaderProps) {
  return (
    <div className="relative mx-auto max-w-xl text-center space-y-2 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8">
      <div className="inline-block p-1 bg-gradient-to-br from-primary to-green-400 rounded-full">
        <div className="bg-background rounded-full p-4">
            <Icon className="w-16 h-16 text-primary" />
        </div>
      </div>
      <h2 className="text-3xl font-black font-headline text-primary">{title}</h2>
      <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
    </div>
  );
}
