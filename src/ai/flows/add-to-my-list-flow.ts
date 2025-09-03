'use server';
/**
 * @fileOverview A flow for adding a movie to a user's "My List" in Firestore.
 * 
 * - addToMyList - Adds a movie to the user's list.
 * - AddToMyListInput - The input type for the addToMyList function.
 * - AddToMyListOutput - The return type for the addToMyList function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

const MovieDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  // Include any other movie properties you want to save
}).catchall(z.any());


const AddToMyListInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  movie: MovieDataSchema.describe('The movie data to add to the list.'),
});
export type AddToMyListInput = z.infer<typeof AddToMyListInputSchema>;

const AddToMyListOutputSchema = z.object({
  success: z.boolean(),
});
export type AddToMyListOutput = z.infer<typeof AddToMyListOutputSchema>;

export async function addToMyList(input: AddToMyListInput): Promise<AddToMyListOutput> {
  return addToMyListFlow(input);
}

const addToMyListFlow = ai.defineFlow(
  {
    name: 'addToMyListFlow',
    inputSchema: AddToMyListInputSchema,
    outputSchema: AddToMyListOutputSchema,
  },
  async ({ userId, movie }) => {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    
    const listRef = doc(db, 'users', userId, 'myList', movie.id.toString());
    
    await setDoc(listRef, {
      ...movie,
      addedAt: serverTimestamp(),
    });

    return { success: true };
  }
);
