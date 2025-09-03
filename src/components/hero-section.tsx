import type { Movie } from '@/types';
import { Button } from './ui/button';
import { Info, Play } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  content: Movie;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const backdropUrl = content.backdrop_path
    ? `https://image.tmdb.org/t/p/original${content.backdrop_path}`
    : `https://placehold.co/1280x720/121212/E50914?text=${content.title}`;

  return (
    <div className="relative h-[56.25vw] min-h-[400px] max-h-[800px] w-full">
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={content.title}
          fill
          className="object-cover"
          data-ai-hint="futuristic spaceship"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-white container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md lg:max-w-lg space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-balance">
            {content.title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-neutral-200 line-clamp-3">
            {content.overview}
          </p>
          <div className="flex items-center space-x-4">
            <Button size="lg" className="font-bold">
              <Play className="mr-2 -ml-1 h-6 w-6" />
              Play
            </Button>
            <Button size="lg" variant="secondary" className="font-bold bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              <Info className="mr-2 -ml-1 h-6 w-6" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
