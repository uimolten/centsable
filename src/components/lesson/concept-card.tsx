
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full min-h-[300px] gap-6 text-center"
    >
      {Icon && (
         <div className="flex justify-center">
            <div className="flex items-center justify-center w-40 h-40 rounded-full bg-primary/20 text-primary">
                <Icon className="w-20 h-20" />
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
                className="rounded-lg bg-muted object-cover"
                data-ai-hint={step.imageHint}
            />
        </div>
      )}
    </motion.div>
  );
}
