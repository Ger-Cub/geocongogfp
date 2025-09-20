import { useState } from 'react';
import { formationSample } from '@/data/formation-sample';
import { useFormationState } from '@/hooks/useFormationState';
import { FormationSidebar } from '@/components/formation/FormationSidebar';
import { FormationHeader } from '@/components/formation/FormationHeader';
import { LessonViewer } from '@/components/formation/LessonViewer';
import { FormationOverview } from '@/components/formation/FormationOverview';
import { DailyPlanSidebar } from '@/components/formation/DailyPlanSidebar';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showOverview, setShowOverview] = useState(true);
  const { toast } = useToast();
  
  const {
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
  } = useFormationState(formationSample);

  const progress = calculateProgress();
  const currentLesson = getCurrentLesson();
  const currentModule = getCurrentModule();

  const handleLessonSelect = (moduleIndex: number, lessonIndex: number) => {
    if (canAccessModule(moduleIndex)) {
      setCurrentLesson(moduleIndex, lessonIndex);
      setShowOverview(false);
    } else {
      toast({
        title: "Accès restreint",
        description: "Vous devez terminer les modules précédents pour accéder à celui-ci.",
        variant: "destructive"
      });
    }
  };

  const handleModuleSelect = (moduleIndex: number) => {
    if (canAccessModule(moduleIndex)) {
      setCurrentLesson(moduleIndex, 0);
      setShowOverview(false);
    } else {
      toast({
        title: "Accès restreint", 
        description: "Vous devez terminer les modules précédents pour accéder à celui-ci.",
        variant: "destructive"
      });
    }
  };

  const handleMarkComplete = () => {
    const lesson = getCurrentLesson();
    if (lesson) {
      markLessonComplete(lesson.lecon_id);
      toast({
        title: "Leçon terminée",
        description: `"${lesson.titre}" marquée comme complétée.`,
      });
    }
  };

  const handleShowScore = () => {
    toast({
      title: "Score en cours de calcul",
      description: "Votre progression sera bientôt disponible.",
    });
  };

  const handlePrintCertificate = () => {
    toast({
      title: "Certificat disponible",
      description: "Votre certificat sera généré une fois la formation terminée.",
    });
  };

  const handleFinalTest = () => {
    toast({
      title: "Test final",
      description: "Le test final sera bientôt disponible.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <FormationSidebar
        formation={formationSample}
        state={state}
        progress={progress}
        onLessonSelect={handleLessonSelect}
        onModuleSelect={handleModuleSelect}
        canAccessModule={canAccessModule}
      />
      
      <main className="flex-1 p-6 overflow-auto">
        <FormationHeader
          formation={formationSample}
          onOverviewClick={() => setShowOverview(true)}
          onFinalTestClick={handleFinalTest}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {showOverview ? (
              <FormationOverview formation={formationSample} />
            ) : (
              <LessonViewer
                lesson={currentLesson}
                module={currentModule}
                isCompleted={currentLesson ? state.completedLessons.has(currentLesson.lecon_id) : false}
                canNavigateNext={canNavigateNext()}
                onPrevious={() => navigateLesson(-1)}
                onNext={() => navigateLesson(1)}
                onMarkComplete={handleMarkComplete}
                onQuizAnswer={setQuizAnswer}
                answers={state.answers}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <DailyPlanSidebar
              formation={formationSample}
              onMarkComplete={handleMarkComplete}
              onShowScore={handleShowScore}
              onPrintCertificate={handlePrintCertificate}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
