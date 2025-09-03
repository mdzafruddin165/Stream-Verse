'use server';
/**
 * @fileOverview Fetches top-rated movies from The Movie Database (TMDB) API.
 */
import type { Movie } from '@/types';

const TMDB_API_KEY = "b9f1496741d630dbc8b9b52f8fa92e54";

export async function getTopRated(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`
    );
    if (!res.ok) {
      console.error(`Failed to fetch top rated movies: ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    return json.results || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}
