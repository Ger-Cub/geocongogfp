import { FormationData } from '@/data/formation-sample';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Play, Award } from 'lucide-react';

interface DailyPlanSidebarProps {
  formation: FormationData;
  onMarkComplete: () => void;
  onShowScore: () => void;
  onPrintCertificate: () => void;
}

export function DailyPlanSidebar({ 
  formation, 
  onMarkComplete, 
  onShowScore, 
  onPrintCertificate 
}: DailyPlanSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Daily Plan */}
      <Card className="p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Plan journalier
          </h3>
          <div className="text-xs text-muted-foreground">
            {formation.contexte_utilisateur.duree_jours} jours
          </div>
        </div>
        
        <div className="space-y-2">
          {formation.planning_journalier.slice(0, 4).map((jour) => (
            <div
              key={jour.jour}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="text-sm">
                <div className="font-medium">Jour {jour.jour}</div>
                <div className="text-xs text-muted-foreground">
                  {jour.activites.length} activités
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {jour.minutes_total}min
              </div>
            </div>
          ))}
          {formation.planning_journalier.length > 4 && (
            <div className="text-center text-xs text-muted-foreground py-2">
              +{formation.planning_journalier.length - 4} autres jours
            </div>
          )}
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Actions</h3>
          <div className="text-xs text-muted-foreground">Interagir</div>
        </div>
        
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkComplete}
            className="w-full justify-start gap-2"
          >
            <Play className="h-4 w-4" />
            Marquer comme lu
          </Button>
          
          <Button
            size="sm"
            onClick={onShowScore}
            className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-primary-glow"
          >
            <Award className="h-4 w-4" />
            Voir le score final
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onPrintCertificate}
            className="w-full justify-start gap-2 border-dashed border-primary/50 text-primary hover:bg-primary/5"
          >
            <Award className="h-4 w-4" />
            Certificat
          </Button>
        </div>
      </Card>
    </div>
  );
}