import { useNavigate } from 'react-router-dom';
import { Cake } from '../types';

interface CakeCardProps {
  cake: Cake;
  isHovered: boolean;
}

export default function CakeCard({ cake, isHovered }: CakeCardProps) {
  const navigate = useNavigate();
  const deliveryPrice = 150; // Fixed delivery price in DA

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/order', { state: { cake, quantity: 1 } });
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-md overflow-hidden
        transition-all duration-300 ease-in-out
        ${isHovered ? 'transform scale-105 z-10' : 'filter blur-0 hover:scale-105'}
      `}
    >
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{cake.name}</h3>
        
        {/* Price section with delivery info */}
        <div className="mt-1">
          <div className="text-pink-600 font-medium">
            {cake.price.toFixed(2)} DA
          </div>
          <div className="text-sm text-gray-500">
            + {deliveryPrice.toFixed(2)} DA delivery
          </div>
        </div>
        
        <div className={`
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}
        `}>
          <p className="text-gray-600 mt-2">{cake.fullDescription}</p>
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Flavors:</span>{' '}
              {cake.flavors.join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Serves:</span>{' '}
              {cake.servingSize}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Total with delivery:</span>{' '}
              {(cake.price + deliveryPrice).toFixed(2)} DA
            </p>
          </div>

          <button
            onClick={handleOrderClick}
            className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg 
                     hover:bg-pink-700 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Order Now
          </button>
        </div>
        
        <p className={`
          text-gray-600 mt-2 transition-all duration-300
          ${isHovered ? 'opacity-0' : 'opacity-100'}
        `}>
          {cake.description}
        </p>
      </div>
    </div>
  );
}
