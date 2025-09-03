'use server';
/**
 * @fileOverview A flow for fetching movies by genre.
 * 
 * - getMoviesByGenre - Fetches movies for a specific genre from The Movie Database (TMDB) API.
 * - GetMoviesByGenreInput - The input type for the getMoviesByGenre function.
 * - GetMoviesByGenreOutput - The return type for the getMoviesByGenre function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

const GetMoviesByGenreInputSchema = z.object({
  genreId: z.number().describe('The ID of the genre to fetch movies for.'),
});
export type GetMoviesByGenreInput = z.infer<typeof GetMoviesByGenreInputSchema>;

const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  // Add other fields you might need
});

const GetMoviesByGenreOutputSchema = z.object({
  results: z.array(MovieSchema),
});
export type GetMoviesByGenreOutput = z.infer<typeof GetMoviesByGenreOutputSchema>;

export async function getMoviesByGenre(input: GetMoviesByGenreInput): Promise<GetMoviesByGenreOutput> {
  return getMoviesByGenreFlow(input);
}

const getMoviesByGenreFlow = ai.defineFlow(
  {
    name: 'getMoviesByGenreFlow',
    inputSchema: GetMoviesByGenreInputSchema,
    outputSchema: GetMoviesByGenreOutputSchema,
  },
  async ({ genreId }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch movies by genre: ${res.statusText}`);
    }
    const json = await res.json();
    return { results: json.results };
  }
);
