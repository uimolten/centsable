
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { GoalBuilderStep } from '@/types/lesson';

interface GoalBuilderComponentProps {
  step: GoalBuilderStep;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export function GoalBuilderStep({ step, userAnswer, onAnswerChange }: GoalBuilderComponentProps) {
  const renderInput = () => {
    switch (step.inputType) {
      case 'text':
        return (
          <Input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={step.placeholder}
            className="w-full max-w-sm text-2xl font-bold text-center bg-muted/50 border-border/50 h-14"
            autoFocus
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={step.placeholder}
            className="w-full max-w-sm text-2xl font-bold text-center bg-muted/50 border-border/50 h-14"
            autoFocus
          />
        );
      case 'date':
        return (
          <RadioGroup 
            onValueChange={onAnswerChange} 
            value={userAnswer} 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {step.dateOptions?.map((option) => (
              <Label 
                key={option.value}
                htmlFor={option.value}
                className="flex items-center justify-center cursor-pointer rounded-md p-4 text-lg font-semibold border-2 border-border/50 bg-background/50 has-[:checked]:bg-primary/20 has-[:checked]:border-primary"
              >
                <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={step.type}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-center bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{step.instructions}</h2>
      <div className="flex justify-center">
        {renderInput()}
      </div>
    </motion.div>
  );
}
