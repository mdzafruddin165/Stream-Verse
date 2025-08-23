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

export interface Category {
  id: string;
  title: string;
}
