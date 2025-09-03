'use server';
/**
 * @fileOverview A flow for retrieving a user's "My List" from Firestore.
 * 
 * - getMyList - Retrieves the user's list of saved movies.
 * - GetMyListInput - The input type for the getMyList function.
 * - GetMyListOutput - The return type for the getMyList function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

const GetMyListInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
});
export type GetMyListInput = z.infer<typeof GetMyListInputSchema>;

const MovieDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  // Include any other movie properties you expect
}).catchall(z.any());

const GetMyListOutputSchema = z.object({
  myList: z.array(MovieDataSchema),
});
export type GetMyListOutput = z.infer<typeof GetMyListOutputSchema>;


export async function getMyList(input: GetMyListInput): Promise<GetMyListOutput> {
  return getMyListFlow(input);
}

const getMyListFlow = ai.defineFlow(
  {
    name: 'getMyListFlow',
    inputSchema: GetMyListInputSchema,
    outputSchema: GetMyListOutputSchema,
  },
  async ({ userId }) => {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    
    const listCollectionRef = collection(db, 'users', userId, 'myList');
    const q = query(listCollectionRef);
    const querySnapshot = await getDocs(q);
    
    const myList = querySnapshot.docs.map(doc => doc.data());

    return { myList };
  }
);
