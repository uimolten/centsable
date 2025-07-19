
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { isEqual, shuffle } from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth } from '@/hooks/use-auth';
import { saveProgress } from '@/ai/flows/save-progress-flow';
import { updateQuestProgress } from '@/ai/flows/update-quest-progress-flow';
import { playCorrectSound } from '@/lib/audio-utils';

import { lessonSaving1 } from '@/data/lesson-saving-1';
import { lessonSaving2 } from '@/data/lesson-saving-2';
import { lessonSaving3 } from '@/data/lesson-saving-3';
import { lessonSaving4 } from '@/data/lesson-saving-4';
import { lessonBudgeting1 } from '@/data/lesson-budgeting-1';
import { lessonBudgeting2 } from '@/data/lesson-budgeting-2';
import { lessonBudgeting3 } from '@/data/lesson-budgeting-3';
import { lessonBudgeting4 } from '@/data/lesson-budgeting-4';
import { lessonBudgetingPractice1 } from '@/data/lesson-budgeting-practice-1';
import { lessonBudgetingQuiz } from '@/data/lesson-budgeting-quiz';
import { lessonCredit1 } from '@/data/lesson-credit-1';
import { lessonCredit2 } from '@/data/lesson-credit-2';
import { lessonCredit3 } from '@/data/lesson-credit-3';
import { lessonCredit4 } from '@/data/lesson-credit-4';
import { lessonCredit5 } from '@/data/lesson-credit-5';
import { lessonCreditPractice1 } from '@/data/lesson-credit-practice-1';
import { lessonCreditPractice2 } from '@/data/lesson-credit-practice-2';
import { lessonCreditQuiz } from '@/data/lesson-credit-quiz';
import { lessonInvesting1 } from '@/data/lesson-investing-1';
import { lessonInvesting2 } from '@/data/lesson-investing-2';
import { lessonInvesting3 } from '@/data/lesson-investing-3';
import { lessonInvesting4 } from '@/data/lesson-investing-4';
import { lessonInvesting5 } from '@/data/lesson-investing-5';
import { lessonTaxes1 } from '@/data/lesson-taxes-1';
import { lessonTaxes2 } from '@/data/lesson-taxes-2';
import { lessonTaxes3 } from '@/data/lesson-taxes-3';
import { lessonTaxes4 } from '@/data/lesson-taxes-4';
import { lessonTaxesPractice1 } from '@/data/lesson-taxes-practice-1';
import { lessonTaxesPractice2 } from '@/data/lesson-taxes-practice-2';
import { lessonTaxesQuiz } from '@/data/lesson-taxes-quiz';
import { lessonRetirement1 } from '@/data/lesson-retirement-1';
import { lessonRetirement2 } from '@/data/lesson-retirement-2';
import { lessonRetirement3 } from '@/data/lesson-retirement-3';
import { lessonRetirement4 } from '@/data/lesson-retirement-4';
import { lessonRetirementPractice1 } from '@/data/lesson-retirement-practice-1';
import { lessonRetirementQuiz1 } from '@/data/lesson-retirement-quiz-1';
import { lessonInsurance1 } from '@/data/lesson-insurance-1';
import { lessonInsurance2 } from '@/data/lesson-insurance-2';
import { lessonInsurance3 } from '@/data/lesson-insurance-3';
import { lessonInsurance4 } from '@/data/lesson-insurance-4';
import { lessonInsurancePractice1 } from '@/data/lesson-insurance-practice-1';
import { lessonInsuranceQuiz1 } from '@/data/lesson-insurance-quiz-1';
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
import { ScenarioStep } from '@/types/lesson';

import type { Step, MultipleChoiceStep, FillInTheBlankStep, GoalBuilderStep, Lesson, SortItem as BaseSortItem, CompleteStep } from '@/types/lesson';
import { useToast } from '@/hooks/use-toast';

// This is the extended type for the component's state
type SortItem = BaseSortItem & { location: 'pool' | 'box1' | 'box2' };

const getLessonData = (lessonId: string): Lesson | null => {
  // Savings
  if (lessonId === 's1') return lessonSaving1;
  if (lessonId === 's2') return lessonSaving2;
  if (lessonId === 's3') return lessonSaving3;
  if (lessonId === 's4') return lessonSaving4;
  
  // Budgeting
  if (lessonId === 'b1') return lessonBudgeting1;
  if (lessonId === 'b2') return lessonBudgeting2;
  if (lessonId === 'b3') return lessonBudgeting3;
  if (lessonId === 'b4') return lessonBudgeting4;
  if (lessonId === 'bp1') return lessonBudgetingPractice1;
  if (lessonId === 'bq1') return lessonBudgetingQuiz;

  // Credit
  if (lessonId === 'c1') return lessonCredit1;
  if (lessonId === 'c2') return lessonCredit2;
  if (lessonId === 'cp1') return lessonCreditPractice1;
  if (lessonId === 'c3') return lessonCredit3;
  if (lessonId === 'c4') return lessonCredit4;
  if (lessonId === 'cp2') return lessonCreditPractice2;
  if (lessonId === 'c5') return lessonCredit5;
  if (lessonId === 'cq1') return lessonCreditQuiz;

  // Investing
  if (lessonId === 'i1') return lessonInvesting1;
  if (lessonId === 'i2') return lessonInvesting2;
  if (lessonId === 'i3') return lessonInvesting3;
  if (lessonId === 'i4') return lessonInvesting4;
  if (lessonId === 'i5') return lessonInvesting5;

  // Taxes
  if (lessonId === 't1') return lessonTaxes1;
  if (lessonId === 't2') return lessonTaxes2;
  if (lessonId === 't3') return lessonTaxes3;
  if (lessonId === 't4') return lessonTaxes4;
  if (lessonId === 'tp1') return lessonTaxesPractice1;
  if (lessonId === 'tp2') return lessonTaxesPractice2;
  if (lessonId === 'tq1') return lessonTaxesQuiz;

  // Retirement
  if (lessonId === 'r1') return lessonRetirement1;
  if (lessonId === 'r2') return lessonRetirement2;
  if (lessonId === 'r3') return lessonRetirement3;
  if (lessonId === 'r4') return lessonRetirement4;
  if (lessonId === 'rp1') return lessonRetirementPractice1;
  if (lessonId === 'rq1') return lessonRetirementQuiz1;

  // Insurance
  if (lessonId === 'ui1') return lessonInsurance1;
  if (lessonId === 'ui2') return lessonInsurance2;
  if (lessonId === 'ui3') return lessonInsurance3;
  if (lessonId === 'ui4') return lessonInsurance4;
  if (lessonId === 'uip1') return lessonInsurancePractice1;
  if (lessonId === 'uiq1') return lessonInsuranceQuiz1;


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
  const { user, userData, refreshUserData } = useAuth();
  const { toast } = useToast();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [totalSteps, setTotalSteps] = useState(0);
  const [interactiveStepsCount, setInteractiveStepsCount] = useState(0);
  const [totalIncorrectAttempts, setTotalIncorrectAttempts] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [tryAgainCounter, setTryAgainCounter] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [goalData, setGoalData] = useState<Record<string, string | number>>({});
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [interactiveSortItems, setInteractiveSortItems] = useState<SortItem[]>([]);
  const [isSortIncomplete, setIsSortIncomplete] = useState(false);
  const [isLessonAlreadyCompleted, setIsLessonAlreadyCompleted] = useState(false);
  const [bonusXp, setBonusXp] = useState(0);

  useEffect(() => {
    if (userData) {
      setIsLessonAlreadyCompleted(userData.completedLessons?.includes(lessonId) ?? false);
    }
  }, [userData, lessonId]);


  useEffect(() => {
    const loadedLesson = getLessonData(lessonId);
    if (loadedLesson) {
      if (user && refreshUserData && !isLessonAlreadyCompleted) {
        updateQuestProgress({ userId: user.uid, actionType: 'start_new_lesson' }).then(() => refreshUserData());
      }
      setLesson(loadedLesson);
      const steps = loadedLesson.modules.reduce((acc, module) => acc + module.steps.length, 0);
      setTotalSteps(steps);
      
      const interactiveSteps = loadedLesson.modules.flatMap(m => m.steps).filter(s => ['multiple-choice', 'fill-in-the-blank', 'interactive-sort', 'tap-the-pairs'].includes(s.type)).length;
      setInteractiveStepsCount(interactiveSteps);

      // Set lives based on lesson length
      if (steps > 10) {
        setLives(5);
      } else if (steps > 5) {
        setLives(3);
      } else {
        setLives(2);
      }

    } else {
      // Handle lesson not found, maybe redirect
      router.push('/learn');
    }
  }, [lessonId, router, user, refreshUserData, isLessonAlreadyCompleted]);
  
  const currentModule = lesson?.modules[moduleIndex];
  const currentStep = currentModule?.steps[stepIndex];

  // Derived state for progress to ensure accuracy
  useEffect(() => {
    if (!lesson) return;
    
    let stepsSoFar = 0;
    for (let i = 0; i < moduleIndex; i++) {
      stepsSoFar += lesson.modules[i].steps.length;
    }
    stepsSoFar += stepIndex;
    
    setCompletedSteps(stepsSoFar);
  }, [moduleIndex, stepIndex, lesson]);

  useEffect(() => {
    if (currentStep?.type === 'interactive-sort') {
      setInteractiveSortItems(shuffle(currentStep.items).map(item => ({ ...item, location: 'pool' })));
    }
  }, [currentStep]);

  const handleLessonComplete = useCallback(async () => {
    if (!user || !lessonId || !lesson) {
        router.push(`/learn`);
        return;
    }

    if (!isLessonAlreadyCompleted) {
        const isPractice = lesson.title.toLowerCase().includes('practice');
        const isQuiz = lesson.title.toLowerCase().includes('quiz');
        const lastStep = lesson.modules.slice(-1)[0].steps.slice(-1)[0] as CompleteStep;

        const actionType = isPractice ? 'complete_practice_session' : isQuiz ? 'complete_unit' : undefined;

        // Calculate accuracy for bonus XP
        const accuracy = interactiveStepsCount > 0 ? 1 - (totalIncorrectAttempts / interactiveStepsCount) : 1;
        const calculatedBonusXp = accuracy >= 0.9 ? 5 : 0;
        setBonusXp(calculatedBonusXp); // Set state for UI
        const totalXp = lastStep.rewards.xp + calculatedBonusXp;

        try {
            const operations = [
                saveProgress({
                    userId: user.uid,
                    lessonId: lessonId,
                    xpGained: totalXp,
                    centsGained: lastStep.rewards.coins,
                })
            ];

            if (actionType) {
                operations.push(updateQuestProgress({ userId: user.uid, actionType }));
            }

            await Promise.all(operations);
            await refreshUserData?.(); // Refresh user data to get new XP/Cents
        } catch (error) {
            console.error('Failed to save progress or update quest', error);
            toast({
                variant: 'destructive',
                title: 'Error Saving Progress',
                description: 'Could not save your progress, but you can continue.',
            });
        }
    }
    
    // This is now only a marker to show the completion UI
    setStepIndex(prev => prev + 1);

}, [lessonId, router, user, refreshUserData, toast, interactiveStepsCount, totalIncorrectAttempts, lesson, isLessonAlreadyCompleted]);
  
  const goToNextStep = useCallback(async () => {
      if (user && refreshUserData) {
          updateQuestProgress({ userId: user.uid, actionType: 'complete_lesson_step' }).then(() => refreshUserData());
      }
      if (stepIndex < (currentModule?.steps.length ?? 0) - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        // This is the end of the last step, trigger completion logic
        await handleLessonComplete();
      }
      
      setHasAnswered(false);
      setIsCorrect(null);
      setUserAnswers([]);
      setTryAgainCounter(0);
      setIncorrectAttempts(0);
      setIsSortIncomplete(false);
  }, [currentModule?.steps.length, handleLessonComplete, moduleIndex, stepIndex, user, refreshUserData]);

  const goToPreviousStep = useCallback(() => {
    if (moduleIndex === 0 && stepIndex === 0) return;

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
    setIsSortIncomplete(false);
  }, [moduleIndex, stepIndex, lesson]);
  
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
         // An answer is correct only if every item is in its correct box.
         // Items left in the pool automatically make it incorrect.
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
      playCorrectSound();
      setStreak(prev => prev + 1);
      if (user && refreshUserData) {
          const isQuiz = lesson?.title.toLowerCase().includes('quiz');
          if (isQuiz) {
              updateQuestProgress({ userId: user.uid, actionType: 'complete_quiz_question' }).then(() => refreshUserData());
          }
      }
    } else {
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      if (newIncorrectAttempts === 1) { // Only count the first mistake per step
          setTotalIncorrectAttempts(prev => prev + 1);
      }
      setStreak(0);
      setLives(prev => Math.max(0, prev - 1));
    }
  }, [checkAnswer, hasAnswered, incorrectAttempts, lesson?.title, user, refreshUserData]);

  const handleFooterAction = useCallback(async () => {
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
        // This case is for the final completion screen.
        router.push('/learn');
        return;
    }

    if (currentStep.type === 'interactive-sort' && interactiveSortItems.some(item => item.location === 'pool')) {
      setIsSortIncomplete(true);
      handleCheck(); // This will register as an incorrect answer
      return;
    }
    
    const isStepWithoutCheck = ['intro', 'concept', 'scenario', 'complete', 'goal-summary'].includes(currentStep.type);
    
    if (currentStep.type === 'goal-builder') {
        const step = currentStep as GoalBuilderStep;
        if (user && refreshUserData && step.storageKey === 'item') { // Assume goal creation quest updates on first step
            updateQuestProgress({ userId: user.uid, actionType: 'create_goal' }).then(() => refreshUserData());
        }
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
      // User is trying again
      setHasAnswered(false);
      setIsCorrect(null);
      setIsSortIncomplete(false);
      if (currentStep.type !== 'fill-in-the-blank' && currentStep.type !== 'interactive-sort') {
          setUserAnswers([]);
      }
      
      if (currentStep.type === 'tap-the-pairs' || currentStep.type === 'interactive-sort') {
          setTryAgainCounter(count => count + 1);
      }
      return;
    }
    
    handleCheck();

  }, [currentStep, hasAnswered, isCorrect, userAnswers, goToNextStep, lives, router, toast, handleCheck, interactiveSortItems, user, refreshUserData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.target as HTMLElement).tagName !== 'TEXTAREA') {
        event.preventDefault(); 
        
        const isAnswerEmpty = userAnswers.length === 0 || (userAnswers.length > 0 && String(userAnswers[0]).trim() === '');
        
        const isInputBasedStep = currentStep && ['multiple-choice', 'fill-in-the-blank', 'goal-builder'].includes(currentStep.type);
        if (isInputBasedStep && isAnswerEmpty) {
          return; // Block enter if no answer is provided for interactive steps
        }
        
        handleFooterAction();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleFooterAction, currentStep, userAnswers]);


  if (!lesson) {
    return <div>Lesson not found or has ended! Redirecting...</div>;
  }
  
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleSelectAnswer = (answer: string) => {
    const isCompleteAndCorrect = hasAnswered && isCorrect === true;
    if (isCompleteAndCorrect) return;

    // This resets the 'Try Again' state if the user changes their answer.
    if (hasAnswered && isCorrect === false) {
      setHasAnswered(false);
      setIsCorrect(null);
    }


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
      playCorrectSound();
      setStreak(prev => prev + 1);
      if (user && refreshUserData) {
          const isQuiz = lesson?.title.toLowerCase().includes('quiz');
          if (isQuiz) {
              updateQuestProgress({ userId: user.uid, actionType: 'complete_quiz_question' }).then(() => refreshUserData());
          }
      }
    } else {
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      if(newIncorrectAttempts === 1) { // Only count the first mistake per step
          setTotalIncorrectAttempts(prev => prev + 1);
      }
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
      case 'concept':
        return step.text ?? '';
      case 'intro':
          return step.text ?? '';
      case 'scenario':
        return step.text ?? '';
      default:
        return '';
    }
  }

  const renderStepContent = (step: Step) => {
    const uniqueKey = `${moduleIndex}-${stepIndex}-${tryAgainCounter}`;
    let stepProps: any = {
      step: step as any,
      onContinue: () => router.push('/learn'),
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
        return <IntroCard key={uniqueKey} {...stepProps} />;
      case 'concept':
        return <ConceptCard key={uniqueKey} {...stepProps} />;
      case 'scenario':
        return <ConceptCard key={uniqueKey} {...{ step: step as ScenarioStep }} />;
      
      case 'complete':
        stepProps = { ...stepProps, isReviewMode: isLessonAlreadyCompleted, bonusXp };
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
        isSortIncomplete={isSortIncomplete}
      >
        <AnimatePresence mode="wait">
          {currentStep ? renderStepContent(currentStep) : (
            <LessonComplete 
              step={lastStepOfLesson as any} 
              onContinue={() => router.push('/learn')}
              isReviewMode={isLessonAlreadyCompleted}
              bonusXp={bonusXp}
            />
          )}
        </AnimatePresence>
      </LessonContainer>
    </DndProvider>
  );
}
