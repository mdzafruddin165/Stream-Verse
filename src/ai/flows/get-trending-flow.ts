'use server';
/**
 * @fileOverview A flow for fetching trending movies and TV shows.
 * 
 * - getTrending - Fetches trending content from The Movie Database (TMDB) API.
 * - GetTrendingOutput - The return type for the getTrending function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

const TrendingContentSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable(),
  // Add other fields you might need from the TMDB response
});

const GetTrendingOutputSchema = z.object({
  results: z.array(TrendingContentSchema),
});
export type GetTrendingOutput = z.infer<typeof GetTrendingOutputSchema>;

export async function getTrending(): Promise<GetTrendingOutput> {
  return getTrendingFlow();
}

const getTrendingFlow = ai.defineFlow(
  {
    name: 'getTrendingFlow',
    inputSchema: z.void(),
    outputSchema: GetTrendingOutputSchema,
  },
  async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch trending data: ${res.statusText}`);
    }
    const json = await res.json();
    return { results: json.results };
  }
);
