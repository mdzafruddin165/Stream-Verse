import type { Content, Category } from '@/types';

export const mockCategories: Category[] = [
  { id: 'trending', title: 'Trending Now' },
  { id: 'action', title: 'Action Packed' },
  { id: 'comedy', title: 'Top Comedies' },
  { id: 'drama', title: 'Critically Acclaimed Dramas' },
  { id: 'sci-fi', title: 'Sci-Fi & Fantasy' },
];

export const mockContent: Content[] = [
  {
    id: 1,
    title: 'Cosmic Odyssey',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    image: 'https://placehold.co/800x450/121212/E50914',
    type: 'movie',
    genres: ['sci-fi', 'trending'],
    year: 2024,
    rating: 'PG-13',
    duration: '2h 49m',
    featured: true,
  },
  {
    id: 2,
    title: 'The Last Stand',
    description: 'A retired sheriff fights against a cartel leader and his army of goons.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['action', 'trending'],
    year: 2023,
    rating: 'R',
    duration: '1h 47m'
  },
  {
    id: 3,
    title: 'Echoes of Time',
    description: 'A historian discovers a time-traveling device and must prevent the past from being altered.',
    image: 'https://placehold.co/300x450',
    type: 'tv',
    genres: ['drama', 'sci-fi'],
    year: 2022,
    rating: 'TV-14',
    duration: '2 Seasons'
  },
  {
    id: 4,
    title: 'Cyber City',
    description: 'In a futuristic metropolis, a detective uncovers a conspiracy that threatens the city.',
    image: 'https://placehold.co/300x450',
    type: 'tv',
    genres: ['sci-fi', 'trending'],
    year: 2024,
    rating: 'TV-MA',
    duration: '1 Season'
  },
  {
    id: 5,
    title: 'Jesters Inc.',
    description: 'Two friends start a company that pulls elaborate pranks, but their latest job goes too far.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['comedy'],
    year: 2023,
    rating: 'R',
    duration: '1h 35m'
  },
  {
    id: 6,
    title: 'Mountain\'s Fury',
    description: 'An elite soldier must rescue a hostage from a fortress high in the mountains.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['action'],
    year: 2024,
    rating: 'R',
    duration: '2h 10m'
  },
  {
    id: 7,
    title: 'The King\'s Decree',
    description: 'A young queen must navigate the treacherous politics of her court to save her kingdom.',
    image: 'https://placehold.co/300x450',
    type: 'tv',
    genres: ['drama', 'trending'],
    year: 2021,
    rating: 'TV-14',
    duration: '3 Seasons'
  },
  {
    id: 8,
    title: 'Laugh Riot',
    description: 'A stand-up comedian\'s life is turned upside down when his jokes become reality.',
    image: 'https://placehold.co/300x450',
    type: 'tv',
    genres: ['comedy'],
    year: 2023,
    rating: 'TV-PG',
    duration: '1 Season'
  },
  {
    id: 9,
    title: 'Zero Hour',
    description: 'A team of special agents has 24 hours to stop a global catastrophe.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['action'],
    year: 2022,
    rating: 'PG-13',
    duration: '2h 5m'
  },
  {
    id: 10,
    title: 'The Inheritance',
    description: 'A family gathers for the reading of a will, only to find themselves trapped in a deadly game.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['drama', 'trending'],
    year: 2024,
    rating: 'R',
    duration: '1h 55m'
  },
  {
    id: 11,
    title: 'Space Cadets',
    description: 'A group of bumbling astronauts accidentally launch themselves into deep space.',
    image: 'https://placehold.co/300x450',
    type: 'tv',
    genres: ['comedy', 'sci-fi'],
    year: 2022,
    rating: 'TV-PG',
    duration: '2 Seasons'
  },
  {
    id: 12,
    title: 'Final Target',
    description: 'An assassin on her last job finds out her target is a child.',
    image: 'https://placehold.co/300x450',
    type: 'movie',
    genres: ['action', 'drama'],
    year: 2023,
    rating: 'R',
    duration: '1h 42m'
  },
];
