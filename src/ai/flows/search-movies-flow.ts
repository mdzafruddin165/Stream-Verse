'use server';
/**
 * @fileOverview A flow for searching movies.
 * 
 * - searchMovies - Searches for movies by a query string from The Movie Database (TMDB) API.
 * - SearchMoviesInput - The input type for the searchMovies function.
 * - SearchMoviesOutput - The return type for the searchMovies function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

const SearchMoviesInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SearchMoviesInput = z.infer<typeof SearchMoviesInputSchema>;

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
}).catchall(z.any());

const SearchMoviesOutputSchema = z.object({
  results: z.array(MovieSchema),
});
export type SearchMoviesOutput = z.infer<typeof SearchMoviesOutputSchema>;

export async function searchMovies(input: SearchMoviesInput): Promise<SearchMoviesOutput> {
  return searchMoviesFlow(input);
}

const searchMoviesFlow = ai.defineFlow(
  {
    name: 'searchMoviesFlow',
    inputSchema: SearchMoviesInputSchema,
    outputSchema: SearchMoviesOutputSchema,
  },
  async ({ query }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      throw new Error(`Failed to search movies: ${res.statusText}`);
    }
    const json = await res.json();
    return { results: json.results };
  }
);
