'use server';
/**
 * @fileOverview Fetches movies by genre from The Movie Database (TMDB) API.
 */

import type { Movie } from '@/types';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
    );
    if (!res.ok) {
      console.error(`Failed to fetch movies for genre ${genreId}: ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    return json.results || [];
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return [];
  }
}
