
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual, shuffle } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { lessonSaving1 } from '@/data/lesson-saving-1';
import { lessonSaving2 } from '@/data/lesson-saving-2';
import { lessonSaving3 } from '@/data/lesson-saving-3';
import { lessonSaving4 } from '@/data/lesson-saving-4';
import { lessonBudgeting1 } from '@/data/lesson-budgeting-1';
import { lessonBudgeting2 } from '@/data/lesson-budgeting-2';
import { lessonInvesting1 } from '@/data/lesson-investing-1';
import { lessonInvesting2 } from '@/data/lesson-investing-2';
import { lessonInvesting3 } from '@/data/lesson-investing-3';
import { lessonInvesting4 } from '@/data/lesson-investing-4';
import { lessonInvesting5 } from '@/data/lesson-investing-5';
import { LessonContainer } from '@/components/lesson/lesson-container';
import { IntroCard } from '@/components/lesson/intro-card';
import { MultipleChoice } from '@/components/lesson/multiple-choice';
import { LessonComplete } from '@/components/lesson/lesson-complete';
import { ConceptCard } from '@/components/lesson/concept-card';
import { FillInTheBlank } from '@/components/lesson/fill-in-the-blank';
import { TapThePairs } from '@/components/lesson/tap-the-pairs';
import { InteractiveSort } from '@/components/lesson/interactive-sort';
import { GoalBuilderStep as GoalBuilderComponent } from '@/components/lesson/goal-builder-step';
import { GoalSummary } from '@/components/lesson/goal-summary';

import type { Step, MultipleChoiceStep, FillInTheBlankStep, GoalBuilderStep, Lesson, SortItem as BaseSortItem } from '@/types/lesson';
import { useToast } from '@/hooks/use-toast';

// This is the extended type for the component's state
type SortItem = BaseSortItem & { location: 'pool' | 'box1' | 'box2' };

const getLessonData = (lessonId: string): Lesson | null => {
  if (lessonId === 's1') return lessonSaving1;
  if (lessonId === 's2') return lessonSaving2;
  if (lessonId === 's3') return lessonSaving3;
  if (lessonId === 's4') return lessonSaving4;
  if (lessonId === 'b1') return lessonBudgeting1;
  if (lessonId === 'b2') return lessonBudgeting2;
  if (lessonId === 'i1') return lessonInvesting1;
  if (lessonId === 'i2') return lessonInvesting2;
  if (lessonId === 'i3') return lessonInvesting3;
  if (lessonId === 'i4') return lessonInvesting4;
  if (lessonId === 'i5') return lessonInvesting5;
  return null;
};

const isAnswerSimilar = (userAnswer: string, correctAnswer: string): boolean => {
  const formattedUserAnswer = userAnswer.trim().toLowerCase();
  
  const correctAnswers = correctAnswer.toLowerCase().split(/(\/|,| or )/).map(s => s.trim()).filter(Boolean);

  if (correctAnswers.includes(formattedUserAnswer)) {
      return true;
  }
  
  return correctAnswers.some(correct => {
    if (
        formattedUserAnswer === `${correct}s` ||
        correct === `${formattedUserAnswer}s`
    ) {
        return true;
    }
    
    const levenshtein = (a: string, b: string): number => {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      const matrix = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) { matrix[i][0] = i; }
      for (let j = 0; j <= b.length; j++) { matrix[0][j] = j; }
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
      return matrix[a.length][b.length];
    };

    const distance = levenshtein(formattedUserAnswer, correct);
    const threshold = correct.length > 7 ? 2 : 1;
    return distance <= threshold;
  });
};


export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [tryAgainCounter, setTryAgainCounter] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [goalData, setGoalData] = useState<Record<string, string | number>>({});
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [interactiveSortItems, setInteractiveSortItems] = useState<SortItem[]>([]);
  const [isAwaitingSort, setIsAwaitingSort] = useState(false);
  
  const currentModule = lesson?.modules[moduleIndex];
  const currentStep = currentModule?.steps[stepIndex];

  useEffect(() => {
    setLesson(getLessonData(lessonId));
  }, [lessonId]);

  useEffect(() => {
    if (lesson) {
      setTotalSteps(lesson.modules.reduce((acc, module) => acc + module.steps.length, 0));
    }
  }, [lesson]);
  
  useEffect(() => {
    if (currentStep?.type === 'interactive-sort') {
      setInteractiveSortItems(shuffle(currentStep.items).map(item => ({ ...item, location: 'pool' })));
    }
  }, [currentStep]);
  
  const goToNextStep = useCallback(() => {
     if(!hasAnswered) setCompletedSteps(prev => prev + 1);

      if (stepIndex < (currentModule?.steps.length ?? 0) - 1) {
        setStepIndex(stepIndex + 1);
      } else if (moduleIndex < (lesson?.modules.length ?? 0) - 1) {
        setModuleIndex(moduleIndex + 1);
        setStepIndex(0);
      } else {
        setStepIndex(stepIndex + 1); 
      }
      
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);
      setTryAgainCounter(0);
      setIncorrectAttempts(0);
  }, [currentModule?.steps.length, lesson?.modules.length, moduleIndex, stepIndex, hasAnswered]);

  const goToPreviousStep = useCallback(() => {
    if (moduleIndex === 0 && stepIndex === 0) return;

    setCompletedSteps(prev => Math.max(0, prev - 1));

    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      const prevModuleIndex = moduleIndex - 1;
      setModuleIndex(prevModuleIndex);
      if (lesson) {
        setStepIndex(lesson.modules[prevModuleIndex].steps.length - 1);
      }
    }

    setHasAnswered(false);
    setIsCorrect(null);
    setUserAnswers([]);
    setTryAgainCounter(0);
    setIncorrectAttempts(0);
    setIsAwaitingSort(false);
  }, [moduleIndex, stepIndex, lesson]);

  const handleLessonComplete = useCallback(() => {
    router.push(`/learn?completed=${lessonId}`);
  }, [lessonId, router]);

  const checkAnswer = useCallback(() => {
    if (!currentStep) return false;
    switch (currentStep.type) {
      case 'multiple-choice':
        const mcStep = currentStep as MultipleChoiceStep;
        if (Array.isArray(mcStep.correctAnswer)) {
          return isEqual(userAnswers.sort(), mcStep.correctAnswer.sort());
        }
        return userAnswers.length === 1 && userAnswers[0] === mcStep.correctAnswer;
      case 'fill-in-the-blank':
        return isAnswerSimilar(userAnswers[0] ?? '', (currentStep as FillInTheBlankStep).correctAnswer);
      case 'interactive-sort':
        return interactiveSortItems.every(item => item.location === item.correctBox);
      default:
        return false;
    }
  }, [currentStep, userAnswers, interactiveSortItems]);

  const handleCheck = useCallback(() => {
    if (hasAnswered) return;

    const correct = checkAnswer();
    
    setHasAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setStreak(prev => prev + 1);
    } else {
      setIncorrectAttempts(prev => prev + 1);
      setStreak(0);
      setLives(prev => Math.max(0, prev - 1));
    }
  }, [checkAnswer, hasAnswered]);

  const handleFooterAction = useCallback(() => {
    if (lives === 0) {
      toast({
        variant: "destructive",
        title: "Out of lives!",
        description: "Review the lesson and try again.",
      });
       router.push('/learn');
      return;
    }
    
    if (!currentStep) {
        handleLessonComplete();
        return;
    }

    if (currentStep.type === 'interactive-sort' && interactiveSortItems.some(item => item.location === 'pool')) {
      setIsAwaitingSort(true);
      return;
    }
    
    const isStepWithoutCheck = ['intro', 'concept', 'scenario', 'complete', 'goal-summary', 'tap-the-pairs'].includes(currentStep.type);
    
    if (currentStep.type === 'goal-builder') {
        const step = currentStep as GoalBuilderStep;
        setGoalData(prev => ({...prev, [step.storageKey]: userAnswers[0]}));
        goToNextStep();
        return;
    }

    if (isStepWithoutCheck) {
      goToNextStep();
      return;
    }
    
    if (hasAnswered && isCorrect) {
      goToNextStep();
      return;
    }
    
    if (hasAnswered && isCorrect === false) {
      setIncorrectAttempts(prev => prev + 1);
      
      setHasAnswered(false);
      setIsCorrect(null);
      if (currentStep.type !== 'fill-in-the-blank' && currentStep.type !== 'interactive-sort') {
          setUserAnswers([]);
      }
      
      if (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') {
          setTryAgainCounter(count => count + 1);
      }
      return;
    }
    
    handleCheck();

  }, [currentStep, hasAnswered, isCorrect, userAnswers, goToNextStep, lives, router, toast, handleCheck, interactiveSortItems, handleLessonComplete]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
        event.preventDefault(); 
        
        if (!currentStep) {
          handleLessonComplete();
          return;
        }

        const isInputBasedStep = ['multiple-choice', 'fill-in-the-blank', 'goal-builder'].includes(currentStep.type);
        const isAnswerEmpty = userAnswers.length === 0 || (userAnswers.length > 0 && String(userAnswers[0]).trim() === '');

        if (isInputBasedStep && isAnswerEmpty) {
          return;
        }
        
        handleFooterAction();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleFooterAction, currentStep, userAnswers, handleLessonComplete]);


  if (!lesson) {
    return <div>Lesson not found or has ended! Redirecting...</div>;
  }
  
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleSelectAnswer = (answer: string) => {
    const isCompleteAndCorrect = hasAnswered && isCorrect === true;
    if (isCompleteAndCorrect) return;

    if (currentStep?.type === 'multiple-choice') {
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
  
  const handleInteractiveComplete = (correct: boolean) => {
    const isCompleteAndCorrect = hasAnswered && isCorrect === true;
    if (isCompleteAndCorrect) return;

    setHasAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setStreak(prev => prev + 1);
    } else {
      setIncorrectAttempts(prev => prev + 1);
      setStreak(0);
      setLives(prev => Math.max(0, prev - 1));
    }
  };
  
  const getInstructionText = (step?: Step): string => {
    if (!step) return "Congratulations!";
    switch (step.type) {
      case 'fill-in-the-blank':
        return 'Complete the sentence:';
      case 'tap-the-pairs':
      case 'interactive-sort':
        return step.instructions;
      case 'multiple-choice':
        return step.question;
      default:
        return step.text ?? '';
    }
  }

  const renderStepContent = (step: Step) => {
    const uniqueKey = `${moduleIndex}-${stepIndex}-${tryAgainCounter}`;
    let stepProps: any = {
      step: step as any,
      onContinue: handleLessonComplete,
    };

    switch (step.type) {
      case 'multiple-choice':
        stepProps = { ...stepProps, userAnswers, onSelectAnswer: handleSelectAnswer, hasAnswered, isCorrect, incorrectAttempts };
        return <MultipleChoice key={uniqueKey} {...stepProps} />;
      
      case 'fill-in-the-blank':
        stepProps = { ...stepProps, userAnswer: userAnswers[0] ?? '', onAnswerChange: handleSelectAnswer, hasAnswered, isCorrect, incorrectAttempts };
        return <FillInTheBlank key={uniqueKey} {...stepProps} />;

      case 'tap-the-pairs':
        stepProps = { ...stepProps, onComplete: handleInteractiveComplete, hasAnswered, isCorrect, incorrectAttempts };
        return <TapThePairs key={uniqueKey} {...stepProps} />;

      case 'interactive-sort':
        stepProps = { ...stepProps, items: interactiveSortItems, onItemsChange: setInteractiveSortItems, hasAnswered, isCorrect, incorrectAttempts };
        return <InteractiveSort key={uniqueKey} {...stepProps} />;

      case 'goal-builder':
        stepProps = { ...stepProps, userAnswer: userAnswers[0] ?? '', onAnswerChange: handleSelectAnswer };
        return <GoalBuilderComponent key={uniqueKey} {...stepProps} />;

      case 'goal-summary':
        stepProps = { ...stepProps, goalData };
        return <GoalSummary key={uniqueKey} {...stepProps} />;

      case 'intro':
      case 'concept':
      case 'scenario':
        return <ConceptCard key={uniqueKey} {...stepProps} />;
      
      case 'complete':
        return <LessonComplete key={uniqueKey} {...stepProps} />;
        
      default: return <div>Unknown step type</div>;
    }
  };
  
  const lastStepOfLesson = lesson.modules.slice(-1)[0].steps.slice(-1)[0];
  const isFirstStep = moduleIndex === 0 && stepIndex === 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <LessonContainer
        progress={progress}
        onAction={handleFooterAction}
        currentStep={currentStep ?? lastStepOfLesson}
        isCorrect={isCorrect}
        hasAnswered={hasAnswered}
        userAnswers={userAnswers}
        instructionText={getInstructionText(currentStep)}
        lives={lives}
        streak={streak}
        incorrectAttempts={incorrectAttempts}
        onBack={goToPreviousStep}
        isFirstStep={isFirstStep}
        isAwaitingSort={isAwaitingSort}
        onDismissSortWarning={() => setIsAwaitingSort(false)}
      >
        <AnimatePresence mode="wait">
          {currentStep ? renderStepContent(currentStep) : (
            <LessonComplete 
              step={lastStepOfLesson as any} 
              onContinue={handleLessonComplete} 
            />
          )}
        </AnimatePresence>
      </LessonContainer>
    </DndProvider>
  );
}
