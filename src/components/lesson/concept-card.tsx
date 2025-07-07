
import { motion } from 'framer-motion';
import type { ConceptStep, ScenarioStep } from '@/types/lesson';
import Image from 'next/image';
import { Search, Tag, ThumbsUp, Heart, Calendar } from 'lucide-react';

interface ConceptCardProps {
  step: ConceptStep | ScenarioStep;
}

const iconMap = {
  'search': Search,
  'tag': Tag,
  'thumbs-up': ThumbsUp,
  'heart': Heart,
  'calendar': Calendar,
}

export function ConceptCard({ step }: ConceptCardProps) {
  const Icon = step.type === 'concept' && step.icon ? iconMap[step.icon] : null;

  return (
    <motion.div
      key={step.type + (step.text ?? '')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-8 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      {Icon && (
         <div className="flex justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary">
                <Icon className="w-10 h-10" />
            </div>
        </div>
      )}
      {step.image && (
        <div className="flex justify-center">
            <Image
                src={step.image}
                alt={step.text ?? 'Lesson illustration'}
                width={400}
                height={225}
                className="rounded-lg bg-muted"
                data-ai-hint={step.imageHint}
            />
        </div>
      )}
      <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">{step.text}</p>
    </motion.div>
  );
}
