'use server';
/**
 * @fileOverview A flow for removing a movie from a user's "My List" in Firestore.
 * 
 * - removeFromMyList - Removes a movie from the user's list.
 * - RemoveFromMyListInput - The input type for the removeFromMyList function.
 * - RemoveFromMyListOutput - The return type for the removeFromMyList function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

const RemoveFromMyListInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  movieId: z.string().describe('The ID of the movie to remove from the list.'),
});
export type RemoveFromMyListInput = z.infer<typeof RemoveFromMyListInputSchema>;

const RemoveFromMyListOutputSchema = z.object({
  success: z.boolean(),
});
export type RemoveFromMyListOutput = z.infer<typeof RemoveFromMyListOutputSchema>;

export async function removeFromMyList(input: RemoveFromMyListInput): Promise<RemoveFromMyListOutput> {
  return removeFromMyListFlow(input);
}

const removeFromMyListFlow = ai.defineFlow(
  {
    name: 'removeFromMyListFlow',
    inputSchema: RemoveFromMyListInputSchema,
    outputSchema: RemoveFromMyListOutputSchema,
  },
  async ({ userId, movieId }) => {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    
    const listRef = doc(db, 'users', userId, 'myList', movieId);
    
    await deleteDoc(listRef);

    return { success: true };
  }
);
