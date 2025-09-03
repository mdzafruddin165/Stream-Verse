'use client';

import type { Movie } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getYoutubeTrailer } from '@/lib/youtube';
import { Loader } from 'lucide-react';

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
      className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out md:hover:!scale-110 md:hover:z-10 cursor-pointer"
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
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        {loading ? (
          <Loader className="h-12 w-12 text-white animate-spin" />
        ) : (
          <div className="text-center text-white p-4">
            <h3 className="text-lg font-bold">{content.title}</h3>
            <p className="text-sm mt-2">Click to watch trailer</p>
          </div>
        )}
      </div>
    </div>
  );
}
