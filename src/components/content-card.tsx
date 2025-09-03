'use client';

import type { Movie } from '@/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { Plus, Play, ChevronDown } from 'lucide-react';

interface ContentCardProps {
  content: Movie;
}

export default function ContentCard({ content }: ContentCardProps) {
  const imageUrl = content.poster_path 
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : 'https://placehold.co/300x450/121212/E50914?text=No+Image';

  return (
    <div className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out md:hover:!scale-110 md:hover:z-10">
      <Image
        src={imageUrl}
        alt={content.title}
        width={300}
        height={450}
        className="object-cover w-full h-auto transition-all"
        data-ai-hint="movie poster"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-white text-lg font-bold">{content.title}</h3>
          <div className="text-xs text-neutral-400 mt-1">
            <span>{content.release_date?.substring(0, 4)}</span> &middot; <span>{content.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button size="icon" className="w-10 h-10 bg-white text-black hover:bg-neutral-200">
            <Play className="h-6 w-6 fill-black" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="w-10 h-10 bg-transparent border-2 border-neutral-400 text-white hover:border-white hover:bg-white/10">
              <Plus className="h-6 w-6" />
            </Button>
             <Button variant="outline" size="icon" className="w-10 h-10 bg-transparent border-2 border-neutral-400 text-white hover:border-white hover:bg-white/10">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
