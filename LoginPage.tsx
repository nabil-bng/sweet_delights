import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import ForgotPassword from './ForgotPassword';
import Logo from './Logo';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        
        const newUser = { username, email };
        localStorage.setItem('user', JSON.stringify(newUser));
        // Set default profile photo to null
        localStorage.setItem('profilePhoto', '');
      } else {
        const user = { username };
        localStorage.setItem('user', JSON.stringify(user));
        // If no profile photo exists, set it to empty
        if (!localStorage.getItem('profilePhoto')) {
          localStorage.setItem('profilePhoto', '');
        }
      }
      
      navigate('/shop');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setError(null);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-pink-50">
        <iframe
          src="https://www.youtube.com/embed/tycMfxli7Cc?autoplay=1&controls=0&mute=1&loop=1&playlist=tycMfxli7Cc&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-1/2 left-1/2 min-w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ border: 'none' }}
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />
      
      <div className="login-form-container relative z-10">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-white rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={`
            transition-all duration-300 ease-in-out transform
            ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
          `}>
            {isSignUp && (
              <div className="login-input-box mb-5">
                <User className="w-5 h-5 text-white/70" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login-input"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div className="login-input-box mb-5">
              <Mail className="w-5 h-5 text-white/70" />
              <input
                type={isSignUp ? "email" : "text"}
                placeholder={isSignUp ? "Email" : "Username"}
                value={isSignUp ? email : username}
                onChange={(e) => isSignUp ? setEmail(e.target.value) : setUsername(e.target.value)}
                className="login-input"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="login-input-box mb-5">
              <Lock className="w-5 h-5 text-white/70" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
                disabled={isLoading}
              />
            </div>

            {isSignUp && (
              <div className="login-input-box">
                <Lock className="w-5 h-5 text-white/70" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="login-input"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          {!isSignUp && (
            <div className={`
              flex items-center justify-between text-sm text-white
              transition-all duration-300 ease-in-out transform
              ${isAnimating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}
            `}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                Remember me
              </label>
              
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="login-link"
              >
                Forgot Password?
              </button>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`
              login-button
              transition-all duration-300 ease-in-out transform
              ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
            `}
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>

          <div className="login-divider">
            <span className="text-white/70 text-sm">or</span>
          </div>

          <p className="text-center text-sm text-white">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <button 
              type="button"
              onClick={toggleMode}
              className="login-link font-medium"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </form>
      </div>

      <ForgotPassword 
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}
