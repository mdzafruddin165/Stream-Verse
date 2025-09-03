'use server';
/**
 * @fileOverview A flow for fetching top-rated movies.
 * 
 * - getTopRated - Fetches top-rated movies from The Movie Database (TMDB) API.
 * - GetTopRatedOutput - The return type for the getTopRated function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
}).catchall(z.any());


const GetTopRatedOutputSchema = z.object({
  results: z.array(MovieSchema),
});
export type GetTopRatedOutput = z.infer<typeof GetTopRatedOutputSchema>;

export async function getTopRated(): Promise<GetTopRatedOutput> {
  return getTopRatedFlow();
}

const getTopRatedFlow = ai.defineFlow(
  {
    name: 'getTopRatedFlow',
    inputSchema: z.void(),
    outputSchema: GetTopRatedOutputSchema,
  },
  async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch top rated movies: ${res.statusText}`);
    }
    const json = await res.json();
    return { results: json.results };
  }
);
