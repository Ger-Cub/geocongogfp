import { FormationData } from '@/data/formation-sample';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Trophy } from 'lucide-react';

interface FormationHeaderProps {
  formation: FormationData;
  onOverviewClick: () => void;
  onFinalTestClick: () => void;
}

export function FormationHeader({ formation, onOverviewClick, onFinalTestClick }: FormationHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
          {formation.titre}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {formation.description_courte}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onOverviewClick} className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Vue d'ensemble
        </Button>
        <Button onClick={onFinalTestClick} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow">
          <Trophy className="h-4 w-4" />
          Test final
        </Button>
      </div>
    </div>
  );
}