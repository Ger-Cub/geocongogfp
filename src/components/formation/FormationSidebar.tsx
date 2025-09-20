import { FormationData } from '@/data/formation-sample';
import { FormationState } from '@/hooks/useFormationState';
import { BookOpen, Calendar, Trophy, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FormationSidebarProps {
  formation: FormationData;
  state: FormationState;
  progress: { completed: number; total: number; percentage: number };
  onLessonSelect: (moduleIndex: number, lessonIndex: number) => void;
  onModuleSelect: (moduleIndex: number) => void;
  canAccessModule: (moduleIndex: number) => boolean;
}

export function FormationSidebar({ formation, state, progress, onLessonSelect, onModuleSelect, canAccessModule }: FormationSidebarProps) {
  return (
    <aside className="w-80 bg-gradient-to-b from-card to-secondary/30 border-r border-border p-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="text-lg font-bold text-primary mb-1">GeoCongo AI</div>
        <div className="text-sm text-muted-foreground">Formation personnalisée — Demo</div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-6">
          {/* Modules */}
          <div>
            <div className="text-sm font-medium text-foreground/70 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Sommaire
            </div>
            <div className="space-y-2">
              {formation.programme.map((module, moduleIndex) => {
                const hasAccess = canAccessModule(moduleIndex);
                
                return (
                  <div key={module.module_id} className="space-y-1">
                    <div 
                      className={cn(
                        "text-sm font-medium px-3 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2",
                        moduleIndex === state.currentModuleIndex 
                          ? "bg-primary/10 text-primary" 
                          : hasAccess
                          ? "text-foreground/80 hover:bg-accent"
                          : "text-muted-foreground/50",
                        !hasAccess && "cursor-not-allowed"
                      )}
                      onClick={() => hasAccess && onModuleSelect(moduleIndex)}
                    >
                      {!hasAccess && <Lock className="h-3 w-3" />}
                      {module.titre}
                    </div>
                    <div className="ml-3 space-y-1">
                      {module.lecons.map((lecon, lessonIndex) => (
                        <div
                          key={lecon.lecon_id}
                          onClick={() => hasAccess && onLessonSelect(moduleIndex, lessonIndex)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
                            moduleIndex === state.currentModuleIndex && lessonIndex === state.currentLessonIndex
                              ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium"
                              : hasAccess 
                              ? "hover:bg-accent text-muted-foreground hover:text-foreground"
                              : "text-muted-foreground/50 cursor-not-allowed",
                            state.completedLessons.has(lecon.lecon_id) && "text-green-600"
                          )}
                        >
                          {state.completedLessons.has(lecon.lecon_id) && (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          )}
                          <span className="flex-1">{lecon.titre}</span>
                          <span className="text-xs text-muted-foreground">{lecon.estimated_minutes}min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Plan */}
          <div>
            <div className="text-sm font-medium text-foreground/70 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Plan journalier
            </div>
            <div className="space-y-2">
              {formation.planning_journalier.slice(0, 5).map((jour) => (
                <div
                  key={jour.jour}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-card border text-sm"
                >
                  <span>Jour {jour.jour}</span>
                  <span className="text-muted-foreground">{jour.minutes_total}min</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="text-sm font-medium text-foreground/70 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Progression
            </div>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Leçons complétées: {progress.completed} / {progress.total}
              </div>
              <Progress value={progress.percentage} className="h-2" />
              <Badge variant="secondary" className="text-xs">
                {Math.round(progress.percentage)}% terminé
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}