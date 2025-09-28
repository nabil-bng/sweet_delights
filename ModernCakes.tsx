import PageTransition from '../PageTransition';
import Header from '../Header';

export default function ModernCakes() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-serif text-pink-600 mb-6">Modern & Fusion Cakes</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </PageTransition>
    </div>
  );
}
