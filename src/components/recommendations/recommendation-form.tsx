'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateRecommendationsAction } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Film, Sparkles } from 'lucide-react';

const initialState = {
  message: '',
  recommendations: [],
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full font-bold">
      {pending ? 'Thinking...' : 'Get Recommendations'}
      <Sparkles className="ml-2 h-5 w-5" />
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useFormState(generateRecommendationsAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success! Here are your recommendations.') {
      if (!state.errors || Object.keys(state.errors).length === 0) {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-6 bg-card p-8 rounded-lg shadow-2xl">
        <div className="space-y-2">
          <Label htmlFor="viewingHistory" className="text-lg font-semibold">What you've watched</Label>
          <p className="text-sm text-muted-foreground">Enter some movies or TV shows you liked, separated by commas.</p>
          <Input
            id="viewingHistory"
            name="viewingHistory"
            placeholder="e.g., The Matrix, Breaking Bad, Inception"
            className="text-base"
          />
          {state.errors?.viewingHistory && (
            <p className="text-sm text-destructive">{state.errors.viewingHistory.join(', ')}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferences" className="text-lg font-semibold">What you're looking for</Label>
          <p className="text-sm text-muted-foreground">Describe your taste. Mention genres, actors, or moods you enjoy.</p>
          <Textarea
            id="preferences"
            name="preferences"
            placeholder="e.g., I love mind-bending sci-fi with great visuals, or funny sitcoms."
            className="text-base"
            rows={4}
          />
          {state.errors?.preferences && (
            <p className="text-sm text-destructive">{state.errors.preferences.join(', ')}</p>
          )}
        </div>
        <SubmitButton />
      </form>

      {state.recommendations && state.recommendations.length > 0 && (
        <Card className="shadow-2xl animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="text-primary" />
              Your Personalized Picks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-secondary rounded-md">
                   <Film className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span className="text-base text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
