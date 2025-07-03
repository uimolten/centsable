"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual } from 'lodash';

import { lessonSaving1 } from '@/data/lesson-saving-1';
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import type { Step, MultipleChoiceStep } from '@/types/lesson';

const getLessonData = (lessonId: string) => {
  if (lessonId === 's1') return lessonSaving1;
  return null;
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  const lesson = getLessonData(lessonId);

  const [moduleIndex, setModuleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (lesson) {
      setTotalSteps(lesson.modules.reduce((acc, module) => acc + module.steps.length, 0));
    }
  }, [lesson]);

  if (!lesson) {
    return <div>Lesson not found!</div>;
  }

  const currentModule = lesson.modules[moduleIndex];
  const currentStep = currentModule.steps[stepIndex];
  
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleSelectAnswer = (answer: string) => {
    if (hasAnswered) return;

    if (currentStep.type === 'multiple-choice') {
      const step = currentStep as MultipleChoiceStep;
      const isMultiSelect = Array.isArray(step.correctAnswer);
      
      if (isMultiSelect) {
        setUserAnswers(prev => 
          prev.includes(answer) 
            ? prev.filter(a => a !== answer) 
            : [...prev, answer]
        );
      } else {
        setUserAnswers([answer]);
      }
    } else {
      setUserAnswers([answer]);
    }
  };
  
  const handleLessonComplete = () => {
    router.push(`/learn?completed=${lessonId}`);
  };

  const handleFooterAction = () => {
    const isStepWithoutCheck = currentStep.type === 'intro' || currentStep.type === 'concept' || currentStep.type === 'scenario';
    const isInteractiveComplete = (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') && hasAnswered;
    const isLessonComplete = currentStep.type === 'complete';
    
    // Case 1: "Continue" button for correct answers or non-checkable steps
    if (isStepWithoutCheck || isInteractiveComplete || (hasAnswered && isCorrect)) {
      if (isLessonComplete) {
        handleLessonComplete();
        return;
      }

      setCompletedSteps(prev => prev + 1);

      if (stepIndex < currentModule.steps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else if (moduleIndex < lesson.modules.length - 1) {
        setModuleIndex(moduleIndex + 1);
        setStepIndex(0);
      }
      
      // Reset for next step
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);
    
    // Case 2: "Try Again" button for incorrect answers
    } else if (hasAnswered && isCorrect === false) {
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);

    // Case 3: "Check" button for questions that haven't been answered yet
    } else {
      setHasAnswered(true);
      let correct = false;
      
      switch (currentStep.type) {
        case 'multiple-choice':
          const mcStep = currentStep as MultipleChoiceStep;
          if (Array.isArray(mcStep.correctAnswer)) {
            correct = isEqual(userAnswers.sort(), mcStep.correctAnswer.sort());
          } else {
            correct = userAnswers.length === 1 && userAnswers[0] === mcStep.correctAnswer;
          }
          break;
        case 'fill-in-the-blank':
          correct = userAnswers[0]?.trim().toLowerCase() === currentStep.correctAnswer.toLowerCase();
          break;
      }
      setIsCorrect(correct);
    }
  };

  const renderStep = (step: Step) => {
    switch (step.type) {
      case 'intro':
        return <IntroCard step={step} />;
      case 'concept':
      case 'scenario':
        return <ConceptCard step={step} />;
      case 'multiple-choice':
        return <MultipleChoice step={step} onSelectAnswer={handleSelectAnswer} userAnswers={userAnswers} hasAnswered={hasAnswered} isCorrect={isCorrect} />;
       case 'fill-in-the-blank':
        return <FillInTheBlank step={step} onAnswerChange={handleSelectAnswer} userAnswer={userAnswers[0] ?? ''} />;
      case 'tap-the-pairs':
        return <TapThePairs step={step} onComplete={() => setHasAnswered(true)} />;
      case 'interactive-sort':
        return <InteractiveSort step={step} onComplete={() => setHasAnswered(true)} />;
       case 'complete':
        return <LessonComplete step={step} onContinue={handleLessonComplete} />;
      default:
        return <div>Unknown step type</div>;
    }
  };
  
  return (
    <LessonContainer
      progress={progress}
      onAction={handleFooterAction}
      currentStep={currentStep}
      isCorrect={isCorrect}
      hasAnswered={hasAnswered}
      userAnswers={userAnswers}
    >
      <AnimatePresence mode="wait">
        {renderStep(currentStep)}
      </AnimatePresence>
    </LessonContainer>
  );
}
