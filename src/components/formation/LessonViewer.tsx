import { Lecon, Module } from '@/data/formation-sample';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Book, Clock, CheckCircle } from 'lucide-react';
import { QuizComponent } from './QuizComponent';

interface LessonViewerProps {
  lesson: Lecon | null;
  module: Module | null;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onMarkComplete: () => void;
  onQuizAnswer: (questionId: string, answerIndex: number) => void;
  answers: Record<string, number>;
}

export function LessonViewer({ 
  lesson, 
  module, 
  isCompleted, 
  onPrevious, 
  onNext, 
  onMarkComplete,
  onQuizAnswer,
  answers
}: LessonViewerProps) {
  if (!lesson || !module) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <Book className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Sélectionnez une leçon</h3>
          <p>Choisissez un module ou une leçon dans la sidebar pour commencer votre formation.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lesson Content */}
      <Card className="p-6 shadow-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              {lesson.titre}
              {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lesson.estimated_minutes} min
              </Badge>
              <span>Module: {module.titre}</span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-gradient-to-br from-background to-secondary/20 p-6 rounded-lg border border-border/50 mb-4">
          <div className="prose prose-sm max-w-none text-foreground">
            <p className="leading-relaxed">{lesson.contenu_resume}</p>
          </div>
        </div>

        {/* References */}
        {lesson.references.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground/70 mb-2">Références</h4>
            <div className="space-y-1">
              {lesson.references.map((ref, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {ref.titre} (pages {ref.page_start}-{ref.page_end})
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            {isCompleted ? "Leçon terminée" : "En cours"}
          </div>
          <div className="flex items-center gap-2">
            {!isCompleted && (
              <Button variant="outline" onClick={onMarkComplete} size="sm">
                Marquer comme lu
              </Button>
            )}
            <Button variant="outline" onClick={onPrevious} size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            <Button onClick={onNext} size="sm">
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quiz */}
      {module.quiz && (
        <QuizComponent
          quiz={module.quiz}
          answers={answers}
          onAnswer={onQuizAnswer}
        />
      )}
    </div>
  );
}