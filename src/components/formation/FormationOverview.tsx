import { FormationData } from '@/data/formation-sample';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Target, BookOpen, Trophy } from 'lucide-react';

interface FormationOverviewProps {
  formation: FormationData;
}

export function FormationOverview({ formation }: FormationOverviewProps) {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Programme de formation</h2>
          <div className="text-sm text-muted-foreground">
            {formation.contexte_utilisateur.duree_jours} jours • {formation.contexte_utilisateur.minutes_par_jour} min/jour • 
            Début: {new Date(formation.contexte_utilisateur.date_debut).toLocaleDateString('fr-FR')}
          </div>
        </div>
        <div className="text-right">
          <Badge className="mb-2">
            {formation.contexte_utilisateur.niveau}
          </Badge>
          <div className="text-xs text-muted-foreground">
            {new Date(formation.generation.timestamp).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-medium">{formation.contexte_utilisateur.minutes_par_jour} min/jour</div>
            <div className="text-xs text-muted-foreground">Durée quotidienne</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <Calendar className="h-5 w-5 text-green-600" />
          <div>
            <div className="text-sm font-medium">{formation.contexte_utilisateur.duree_jours} jours</div>
            <div className="text-xs text-muted-foreground">Programme total</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <div>
            <div className="text-sm font-medium">{formation.programme.length} modules</div>
            <div className="text-xs text-muted-foreground">Contenu structuré</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <Trophy className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-sm font-medium">Certification</div>
            <div className="text-xs text-muted-foreground">À la réussite</div>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Objectifs & Compétences
        </h3>
        <div className="bg-gradient-to-br from-background to-secondary/20 p-4 rounded-lg border border-border/50 mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Objectif:</strong> {formation.contexte_utilisateur.objectif}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Motivation:</strong> {formation.contexte_utilisateur.motivation}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {formation.competences_ciblees.map((competence, index) => (
            <Badge key={index} variant="outline">
              {competence}
            </Badge>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Modules de formation</h3>
        <div className="space-y-3">
          {formation.programme.map((module, index) => (
            <div key={module.module_id} className="border border-border/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">
                  Module {index + 1}: {module.titre}
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {module.estimation_minutes} min
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{module.resume}</p>
              <div className="text-xs text-muted-foreground">
                {module.lecons.length} leçons • Quiz inclus ({Math.round(module.quiz.poids * 100)}% du score)
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}