import { CakeCategory } from '../types';

interface CategoryFilterProps {
  selectedCategories: Set<CakeCategory>;
  onCategoryChange: (categories: Set<CakeCategory>) => void;
}

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const categories: { value: Exclude<CakeCategory, 'all'>; label: string }[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'cream', label: 'Cream' },
    { value: 'sweet', label: 'Sweet' },
  ];

  const handleCategoryClick = (category: Exclude<CakeCategory, 'all'>) => {
    const newCategories = new Set(selectedCategories);
    
    if (newCategories.has(category)) {
      newCategories.delete(category);
      // If no categories selected, set it back to 'all'
      if (newCategories.size === 0) {
        newCategories.add('all');
      }
    } else {
      // If 'all' is currently selected, remove it
      newCategories.delete('all');
      newCategories.add(category);
    }
    
    onCategoryChange(newCategories);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleCategoryClick(value)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200
            ${selectedCategories.has(value)
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-pink-50'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
