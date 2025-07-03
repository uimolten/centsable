import { motion } from 'framer-motion';
import type { ConceptStep, ScenarioStep } from '@/types/lesson';
import Image from 'next/image';

interface ConceptCardProps {
  step: ConceptStep | ScenarioStep;
}

export function ConceptCard({ step }: ConceptCardProps) {
  return (
    <motion.div
      key={step.type + step.text}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-8 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
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
