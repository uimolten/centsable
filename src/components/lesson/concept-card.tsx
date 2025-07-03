import { motion } from 'framer-motion';
import type { ConceptStep, ScenarioStep } from '@/types/lesson';

interface ConceptCardProps {
  step: ConceptStep | ScenarioStep;
}

export function ConceptCard({ step }: ConceptCardProps) {
  return (
    <motion.div
      key={step.type}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">{step.text}</p>
    </motion.div>
  );
}
