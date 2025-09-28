import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { Cake } from '../../types';
import PageTransition from '../PageTransition';
import Header from '../Header';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  quantity: number;
}

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cake = location.state?.cake as Cake;
  const initialQuantity = location.state?.quantity || 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!cake) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">No cake selected.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    setIsAdding(true);
    try {
      const existingCartJSON = localStorage.getItem('cart');
      const existingCart: CartItem[] = existingCartJSON ? JSON.parse(existingCartJSON) : [];
      
      const existingItemIndex = existingCart.findIndex(item => item.id === cake.id);
      
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: cake.id,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      setShowSuccess(true);
      setQuantity(1);
      
      toast.success('Added to cart successfully!', {
        action: {
          label: 'View Cart',
          onClick: () => navigate('/cart')
        },
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const totalPrice = cake.price * quantity;

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <PageTransition>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cakes
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/2">
                <div className="h-72 md:h-full">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-serif text-gray-800 mb-2">
                    {cake.name}
                  </h1>
                  <p className="text-2xl font-medium text-pink-600">
                    {cake.price.toFixed(2)} DA <span className="text-sm text-gray-500">per cake</span>
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      Description
                    </h2>
                    <p className="text-gray-600">
                      {cake.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      Details
                    </h2>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Flavors:</span>{' '}
                        {cake.flavors.join(', ')}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Serves:</span>{' '}
                        {cake.servingSize}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Category:</span>{' '}
                        {cake.category.charAt(0).toUpperCase() + cake.category.slice(1)}
                      </p>
                    </div>
                  </div>

                  {showSuccess && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 animate-fade-in">
                      <Check className="w-5 h-5" />
                      Added to cart successfully!
                    </div>
                  )}

                  {/* Quantity and Price Section */}
                  <div className="bg-pink-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800">Quantity</h3>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-2 rounded-lg hover:bg-pink-100 text-pink-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        
                        <span className="w-12 text-center font-medium text-lg text-gray-700">
                          {quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-2 rounded-lg hover:bg-pink-100 text-pink-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-pink-100 pt-4">
                      <span className="text-gray-600 font-medium">Total Price:</span>
                      <span className="text-2xl font-semibold text-pink-600">
                        {totalPrice.toFixed(2)} DA
                      </span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <p className="text-sm text-gray-500 mb-6">
                      * Please note that we require at least 48 hours notice for all cake orders.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={addToCart}
                        disabled={isAdding}
                        className="flex-1 bg-pink-600 text-white py-3 rounded-xl
                                 hover:bg-pink-700 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                                 flex items-center justify-center gap-2
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAdding ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Adding...
                          </span>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Add To Cart
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-xl
                                 hover:bg-pink-50 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
