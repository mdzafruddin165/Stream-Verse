// This is a server-side file, mark it as such.
'use server';

/**
 * @fileOverview A flow for providing personalized movie and TV show recommendations based on viewing history and preferences.
 *
 * - getPersonalizedRecommendations - A function that takes user viewing history and preferences as input and returns personalized recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const PersonalizedRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of movie and TV show titles the user has watched.'),
  preferences: z
    .string()
    .describe(
      'A description of the user\s viewing preferences, including genres, actors, and directors they enjoy.'
    ),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of recommendations to return.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of personalized movie and TV show recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      console.warn("API key not found. Returning empty recommendations.");
      return { recommendations: ["AI Recommendations are currently unavailable. Please configure your API key."] };
    }
    
    const prompt = ai.definePrompt({
      name: 'personalizedRecommendationsPrompt',
      input: {schema: PersonalizedRecommendationsInputSchema},
      output: {schema: PersonalizedRecommendationsOutputSchema},
      model: googleAI('gemini-2.0-flash'),
      prompt: `You are a movie and TV show recommendation expert.

      Based on the user's viewing history and preferences, provide {{numberOfRecommendations}} personalized recommendations.

      Viewing History: {{{viewingHistory}}}
      Preferences: {{{preferences}}}

      Recommendations:`,
    });

    const {output} = await prompt(input);
    return output!;
  }
);
