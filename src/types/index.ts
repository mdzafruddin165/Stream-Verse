export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  runtime?: number;
  [key: string]: any;
}

export interface Category {
  id: string;
  title: string;
}

// Keeping original Content type for now in case it's used elsewhere, can be removed later.
export interface Content {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'movie' | 'tv';
  genres: string[];
  year: number;
  rating: string;
  duration?: string;
  featured?: boolean;
}
