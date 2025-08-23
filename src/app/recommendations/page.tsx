import RecommendationForm from '@/components/recommendations/recommendation-form';

export const metadata = {
  title: 'Personalized Recommendations',
  description: 'Get AI-powered recommendations based on your taste.',
};

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-balance">Find Your Next Binge</h1>
        <p className="mt-4 text-lg text-neutral-300 text-balance">
          Tell our AI what you've watched and what you like, and we'll find your next favorite movies and shows.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <RecommendationForm />
      </div>
    </div>
  );
}
