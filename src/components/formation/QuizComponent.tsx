import { Quiz } from '@/data/formation-sample';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface QuizComponentProps {
  quiz: Quiz;
  answers: Record<string, number>;
  onAnswer: (questionId: string, answerIndex: number) => void;
}

export function QuizComponent({ quiz, answers, onAnswer }: QuizComponentProps) {
  const [showResults, setShowResults] = useState(false);

  const allAnswered = quiz.questions.every(q => answers[q.q_id] !== undefined);
  const score = quiz.questions.reduce((total, question) => {
    const userAnswer = answers[question.q_id];
    return total + (userAnswer === question.correct_option_index ? 1 : 0);
  }, 0);

  const handleSubmit = () => {
    if (allAnswered) {
      setShowResults(true);
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          {quiz.titre}
        </h3>
        <Badge variant="secondary">
          Poids: {Math.round(quiz.poids * 100)}%
        </Badge>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, questionIndex) => {
          const userAnswer = answers[question.q_id];
          const isCorrect = userAnswer === question.correct_option_index;
          
          return (
            <div key={question.q_id} className="space-y-3">
              <h4 className="font-medium text-foreground">
                {questionIndex + 1}. {question.texte}
              </h4>
              
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = userAnswer === optionIndex;
                  const isCorrectOption = optionIndex === question.correct_option_index;
                  
                  return (
                    <div
                      key={optionIndex}
                      onClick={() => !showResults && onAnswer(question.q_id, optionIndex)}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-all",
                        !showResults && "hover:bg-accent",
                        isSelected && !showResults && "bg-primary/10 border-primary",
                        showResults && isSelected && isCorrect && "bg-green-50 border-green-300 text-green-800",
                        showResults && isSelected && !isCorrect && "bg-red-50 border-red-300 text-red-800",
                        showResults && !isSelected && isCorrectOption && "bg-green-50 border-green-300",
                        showResults && "cursor-default"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResults && isSelected && (
                          isCorrect ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )
                        )}
                        {showResults && !isSelected && isCorrectOption && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Explication:</strong> {question.explication}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
        {showResults ? (
          <div className="flex items-center gap-4">
            <Badge variant={score === quiz.questions.length ? "default" : "secondary"}>
              Score: {score}/{quiz.questions.length}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {Math.round((score / quiz.questions.length) * 100)}% de réussite
            </span>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {Object.keys(answers).length}/{quiz.questions.length} questions répondues
          </div>
        )}
        
        {!showResults && (
          <Button 
            onClick={handleSubmit} 
            disabled={!allAnswered}
            className="bg-gradient-to-r from-primary to-primary-glow"
          >
            Valider le quiz
          </Button>
        )}
      </div>
    </Card>
  );
}