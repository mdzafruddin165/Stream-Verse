import type { Content } from '@/types';
import ContentCard from './content-card';

interface ContentCarouselProps {
  title: string;
  contents: Content[];
}

export default function ContentCarousel({ title, contents }: ContentCarouselProps) {
  if (contents.length === 0) return null;
  
  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold container mx-auto px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="relative">
        <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
          <div className="flex space-x-4 px-4 sm:px-6 lg:px-8">
            {contents.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
