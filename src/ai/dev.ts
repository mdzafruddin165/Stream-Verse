import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-recommendations.ts';
import '@/ai/flows/get-trending-flow.ts';
import '@/ai/flows/get-movies-by-genre-flow.ts';
import '@/ai/flows/add-to-my-list-flow.ts';
import '@/ai/flows/get-my-list-flow.ts';
