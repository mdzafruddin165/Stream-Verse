import HeroSection from '@/components/hero-section';
import ContentCarousel from '@/components/content-carousel';
import { mockContent, mockCategories } from '@/lib/mock-data';

export default function Home() {
  const featuredContent = mockContent.find(c => c.id === 1) || mockContent[0];

  return (
    <div className="flex flex-col">
      <HeroSection content={featuredContent} />
      <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16 py-10">
        {mockCategories.map(category => (
          <ContentCarousel 
            key={category.id} 
            title={category.title} 
            contents={mockContent.filter(c => c.genres.includes(category.id))} 
          />
        ))}
      </div>
    </div>
  );
}
