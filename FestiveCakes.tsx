import { useState } from 'react';
import PageTransition from '../PageTransition';
import Header from '../Header';
import CakeCard from '../CakeCard';
import { festiveCakes } from '../../data/cakes';

export default function FestiveCakes() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-serif text-pink-600 mb-6">Festive & Celebratory Cakes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {festiveCakes.map((cake) => (
              <div
                key={cake.id}
                onMouseEnter={() => setHoveredId(cake.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CakeCard
                  cake={cake}
                  isHovered={hoveredId === cake.id}
                />
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
