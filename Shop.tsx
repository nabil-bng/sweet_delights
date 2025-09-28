import { useState } from 'react';
import { cakes } from '../data/cakes';
import CakeCard from './CakeCard';
import CategoryFilter from './CategoryFilter';
import { Cake, CakeCategory } from '../types';
import PageTransition from './PageTransition';
import Header from './Header';

export default function Shop() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<CakeCategory>>(new Set(['all']));

  const filteredCakes = cakes.filter((cake: Cake) => {
    const matchesSearch = 
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cake.flavors.some(flavor => flavor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategories.has('all') || 
      selectedCategories.has(cake.category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-pink-50">
      <Header onSearch={setSearchQuery} />
      <PageTransition>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          
          {filteredCakes.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">
              No cakes found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCakes.map((cake: Cake) => (
                <div
                  key={cake.id}
                  onMouseEnter={() => setHoveredId(cake.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={hoveredId !== null && hoveredId !== cake.id ? 'filter blur-[2px]' : ''}
                >
                  <CakeCard
                    cake={cake}
                    isHovered={hoveredId === cake.id}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </PageTransition>
    </div>
  );
}
