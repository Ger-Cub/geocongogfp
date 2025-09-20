import { useState, useCallback } from 'react';
import { FormationData } from '@/data/formation-sample';

export interface FormationState {
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: Set<string>;
  answers: Record<string, number>;
  finalTestAnswers: Record<string, number>;
  finalTestTaken: boolean;
}

export function useFormationState(formation: FormationData) {
  const [state, setState] = useState<FormationState>({
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    completedLessons: new Set(),
    answers: {},
    finalTestAnswers: {},
    finalTestTaken: false
  });

  const setCurrentLesson = useCallback((moduleIndex: number, lessonIndex: number) => {
    setState(prev => ({
      ...prev,
      currentModuleIndex: moduleIndex,
      currentLessonIndex: lessonIndex
    }));
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    setState(prev => ({
      ...prev,
      completedLessons: new Set([...prev.completedLessons, lessonId])
    }));
  }, []);

  const setQuizAnswer = useCallback((questionId: string, answerIndex: number) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex
      }
    }));
  }, []);

  const navigateLesson = useCallback((direction: 1 | -1) => {
    setState(prev => {
      const currentModule = formation.programme[prev.currentModuleIndex];
      let newModuleIndex = prev.currentModuleIndex;
      let newLessonIndex = prev.currentLessonIndex;

      if (direction === 1) {
        // Aller à la leçon suivante
        if (newLessonIndex < currentModule.lecons.length - 1) {
          newLessonIndex++;
        } else if (newModuleIndex < formation.programme.length - 1) {
          newModuleIndex++;
          newLessonIndex = 0;
        }
      } else {
        // Aller à la leçon précédente
        if (newLessonIndex > 0) {
          newLessonIndex--;
        } else if (newModuleIndex > 0) {
          newModuleIndex--;
          newLessonIndex = formation.programme[newModuleIndex].lecons.length - 1;
        }
      }

      return {
        ...prev,
        currentModuleIndex: newModuleIndex,
        currentLessonIndex: newLessonIndex
      };
    });
  }, [formation]);

  const calculateProgress = useCallback(() => {
    const totalLessons = formation.programme.reduce((total, module) => total + module.lecons.length, 0);
    const completedCount = state.completedLessons.size;
    return {
      completed: completedCount,
      total: totalLessons,
      percentage: totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0
    };
  }, [formation, state.completedLessons]);

  const getCurrentLesson = useCallback(() => {
    const currentModule = formation.programme[state.currentModuleIndex];
    if (!currentModule) return null;
    
    const currentLesson = currentModule.lecons[state.currentLessonIndex];
    return currentLesson || null;
  }, [formation, state.currentModuleIndex, state.currentLessonIndex]);

  const getCurrentModule = useCallback(() => {
    return formation.programme[state.currentModuleIndex] || null;
  }, [formation, state.currentModuleIndex]);

  const canAccessModule = useCallback((moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    
    // Check if all lessons in previous modules are completed
    for (let i = 0; i < moduleIndex; i++) {
      const module = formation.programme[i];
      const allLessonsCompleted = module.lecons.every(lesson => 
        state.completedLessons.has(lesson.lecon_id)
      );
      if (!allLessonsCompleted) return false;
    }
    return true;
  }, [formation, state.completedLessons]);

  const canNavigateNext = useCallback(() => {
    const currentLesson = getCurrentLesson();
    if (!currentLesson) return false;
    
    const currentModule = getCurrentModule();
    if (!currentModule) return false;
    
    // If there's a quiz in the current module, lesson must be completed
    if (currentModule.quiz) {
      return state.completedLessons.has(currentLesson.lecon_id);
    }
    
    // If no quiz, can always navigate
    return true;
  }, [getCurrentLesson, getCurrentModule, state.completedLessons]);

  return {
    state,
    setCurrentLesson,
    markLessonComplete,
    setQuizAnswer,
    navigateLesson,
    calculateProgress,
    getCurrentLesson,
    getCurrentModule,
    canAccessModule,
    canNavigateNext
  };
}