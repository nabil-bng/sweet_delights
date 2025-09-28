import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
}

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  ccpNumber: string;
}

export default function CheckoutForm({ isOpen, onClose, onSuccess, total }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: '',
    ccpNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSuccess(true);
      
      // Clear cart and close form after delay
      setTimeout(() => {
        onSuccess(); // This will clear the cart
        onClose();
        // Reset states
        setIsSuccess(false);
        setFormData({
          fullName: '',
          phone: '',
          address: '',
          ccpNumber: '',
        });
      }, 2000);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="w-full max-w-md relative transform transition-all duration-300">
        <div className="relative bg-white rounded-2xl shadow-xl p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif text-gray-800 mb-2">Order Successful!</h3>
              <p className="text-gray-600 text-center">
                Thank you for your order. We'll process it right away!
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-gray-800">Checkout Details</h3>
                <p className="text-gray-500 mt-1">Total amount: {total.toFixed(2)} DA</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200 resize-none"
                    placeholder="Enter your delivery address"
                  />
                </div>

                {/* CCP Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    CCP Number
                  </label>
                  <input
                    type="text"
                    name="ccpNumber"
                    value={formData.ccpNumber}
                    onChange={handleChange}
                    required
                    pattern="[0-9]*"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    placeholder="Enter your CCP number"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full mt-6 py-4 bg-pink-600 text-white rounded-xl
                    hover:bg-pink-700 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center
                  `}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Complete Order'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
