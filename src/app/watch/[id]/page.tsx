'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function WatchPlayer() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-white">Video not found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full pb-[56.25%] bg-black">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}

export default function WatchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
       <Link href="/" className="absolute top-4 left-4 z-10 text-white hover:text-primary transition-colors flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        <span className="font-bold">Back to Home</span>
      </Link>
      <main className="flex-grow flex items-center justify-center w-full">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="h-16 w-16 text-primary animate-spin" />
            </div>
          }
        >
          <WatchPlayer />
        </Suspense>
      </main>
    </div>
  );
}
