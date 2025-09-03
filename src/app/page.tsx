import HeroSection from '@/components/hero-section';
import ContentCarousel from '@/components/content-carousel';
import { getTopRated } from '@/ai/flows/get-top-rated-flow';
import { getMoviesByGenre } from '@/ai/flows/get-movies-by-genre-flow';
import type { Movie } from '@/types';

const categories = [
  { id: 28, title: 'Action Packed' },
  { id: 35, title: 'Top Comedies' },
  { id: 18, title: 'Critically Acclaimed Dramas' },
  { id: 878, title: 'Sci-Fi & Fantasy' },
];

async function fetchCategory(categoryId: number, title: string) {
  try {
    const { results } = await getMoviesByGenre({ genreId: categoryId });
    return { title, contents: results };
  } catch (error) {
    console.error(`Failed to fetch category ${title}:`, error);
    return { title, contents: [] };
  }
}

export default async function Home() {
  const { results: topRated } = await getTopRated();
  const featuredContent = topRated[0];

  const categoryData = await Promise.all(
    categories.map(category => fetchCategory(category.id, category.title))
  );

  return (
    <div className="flex flex-col">
      {featuredContent && <HeroSection content={featuredContent} />}
      <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16 py-10">
        {topRated.length > 0 && (
          <ContentCarousel 
            title="Top Rated Movies"
            contents={topRated} 
          />
        )}
        {categoryData.map(category => (
          category.contents.length > 0 &&
          <ContentCarousel 
            key={category.title} 
            title={category.title} 
            contents={category.contents} 
          />
        ))}
      </div>
    </div>
  );
}
