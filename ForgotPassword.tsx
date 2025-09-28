import { FormEvent, useState } from 'react';
import { Mail, X } from 'lucide-react';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPassword({ isOpen, onClose }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, always show success
    setMessage({
      type: 'success',
      text: 'If an account exists with this email, you will receive reset instructions shortly.'
    });
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="w-full max-w-md relative transform scale-100 opacity-100 transition-all duration-300">
        <div className="relative bg-white rounded-2xl shadow-xl p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-serif text-gray-800 mb-6">
            Reset Password
          </h3>

          {message ? (
            <div className={`
              mb-4 p-4 rounded-lg text-sm
              ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
            `}>
              {message.text}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="flex items-center gap-3 border-2 border-gray-200 px-4 rounded-full">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 bg-transparent placeholder-gray-400 focus:outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 bg-pink-600 text-white rounded-full font-medium
                hover:bg-pink-700 transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Remember your password?{' '}
              <button
                type="button"
                onClick={onClose}
                className="text-pink-600 hover:underline font-medium"
              >
                Back to login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
