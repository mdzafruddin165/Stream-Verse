'use client';

import type { Movie } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getYoutubeTrailer } from '@/lib/youtube';
import { Loader, PlayCircle } from 'lucide-react';

interface ContentCardProps {
  content: Movie;
}

export default function ContentCard({ content }: ContentCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const imageUrl = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : 'https://placehold.co/300x450/121212/E50914?text=No+Image';

  const handleWatch = async () => {
    setLoading(true);
    const videoId = await getYoutubeTrailer(`${content.title} trailer`);
    setLoading(false);
    if (videoId) {
      router.push(`/watch/${content.id}?videoId=${videoId}`);
    } else {
      alert('Trailer not found.');
    }
  };

  return (
    <div
      className="group relative flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 rounded-md overflow-hidden transition-transform duration-300 ease-in-out md:hover:scale-105 md:hover:z-10 cursor-pointer"
      onClick={handleWatch}
    >
      <Image
        src={imageUrl}
        alt={content.title}
        width={300}
        height={450}
        className="object-cover w-full h-auto transition-all"
        data-ai-hint="movie poster"
      />
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
        {loading ? (
          <Loader className="h-10 w-10 text-white animate-spin" />
        ) : (
          <div className="text-center text-white">
            <PlayCircle className="h-12 w-12 mx-auto mb-2" />
            <h3 className="text-sm sm:text-base font-bold text-balance">{content.title}</h3>
            <p className="text-xs text-neutral-300 mt-1 hidden sm:block">Watch trailer</p>
          </div>
        )}
      </div>
    </div>
  );
}
