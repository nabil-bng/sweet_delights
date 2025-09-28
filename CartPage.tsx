import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../PageTransition';
import Header from '../Header';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { cakes } from '../../data/cakes';
import CheckoutForm from '../CheckoutForm';

interface CartItem {
  id: number;
  quantity: number;
}

const DELIVERY_FEE = 150; // Fixed delivery fee in DA

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }
  }, []);

  const handleQuantityChange = (id: number, change: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setIsCheckoutOpen(false);
  };

  const getCartItemDetails = (id: number) => {
    return cakes.find(cake => cake.id === id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const cake = getCartItemDetails(item.id);
      return total + (cake?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + DELIVERY_FEE;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Header />
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <ShoppingCart className="w-16 h-16 text-pink-200" />
                <h1 className="text-2xl font-serif text-gray-800">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-6">
                  Start adding some delicious cakes to your cart!
                </p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3 bg-pink-600 text-white rounded-xl
                           hover:bg-pink-700 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Browse Cakes
                </button>
              </div>
            </div>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-serif text-gray-800 mb-8">Your Cart</h1>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                const cake = getCartItemDetails(item.id);
                if (!cake) return null;

                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex">
                      <div className="w-1/3 h-40">
                        <img
                          src={cake.image}
                          alt={cake.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{cake.name}</h3>
                            <p className="text-sm text-gray-500">{cake.description}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-1 rounded-lg hover:bg-pink-50 text-pink-600 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-1 rounded-lg hover:bg-pink-50 text-pink-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-medium text-pink-600">
                            {(cake.price * item.quantity).toFixed(2)} DA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-serif text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  {cartItems.map(item => {
                    const cake = getCartItemDetails(item.id);
                    if (!cake) return null;

                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {cake.name} (x{item.quantity})
                        </span>
                        <span className="font-medium">
                          {(cake.price * item.quantity).toFixed(2)} DA
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 my-4 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{calculateSubtotal().toFixed(2)} DA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">{DELIVERY_FEE.toFixed(2)} DA</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-pink-600">{calculateTotal().toFixed(2)} DA</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  * Please note that we require at least 48 hours notice for all cake orders.
                </p>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-pink-600 text-white py-3 rounded-xl
                           hover:bg-pink-700 transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                           flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        <CheckoutForm 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={clearCart}
          total={calculateTotal()}
        />
      </PageTransition>
    </div>
  );
}
