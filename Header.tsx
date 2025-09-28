import { Search, ShoppingCart, LogOut, Camera, UserCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import Logo from './Logo';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const isCartPage = location.pathname === '/cart';

  useEffect(() => {
    // Load profile photo from localStorage
    const storedPhoto = localStorage.getItem('profilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && inputRef.current && !isCartPage) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded, isCartPage]);

  const handleSearchClick = () => {
    if (isCartPage) return;
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCartPage) return;
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('profilePhoto', base64String);
        setProfilePhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = [
    { id: 'all', label: 'All', path: '/shop' },
    { id: 'traditional', label: 'Traditional', path: '/traditional' },
    { id: 'festive', label: 'Festive & Celebratory', path: '/festive' },
    { id: 'french', label: 'French-Inspired', path: '/french' }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div onClick={() => navigate('/shop')}>
                <Logo />
              </div>
              
              <nav className="hidden lg:flex space-x-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => navigate(category.path)}
                    className={`
                      relative py-1 text-sm font-medium transition-colors whitespace-nowrap
                      ${location.pathname === category.path ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'}
                    `}
                  >
                    <span>{category.label}</span>
                    {location.pathname === category.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-6">
              <div ref={searchRef} className="relative">
                <div className={`
                  flex items-center
                  transition-all duration-300 ease-in-out
                  ${isSearchExpanded ? 'w-64' : 'w-10'}
                `}>
                  <button
                    onClick={handleSearchClick}
                    className={`
                      p-2 rounded-full transition-colors duration-200
                      ${isCartPage 
                        ? 'text-gray-300 cursor-not-allowed hover:bg-transparent'
                        : isSearchExpanded
                          ? 'text-pink-600 hover:bg-pink-50'
                          : 'text-gray-600 hover:bg-pink-50'
                      }
                    `}
                    aria-label="Toggle search"
                    disabled={isCartPage}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  
                  {onSearch && (
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={isCartPage ? "" : "Search cakes..."}
                      className={`
                        absolute left-0
                        pl-10 pr-4 py-2
                        border border-gray-200 rounded-full
                        focus:outline-none focus:ring-2 focus:ring-pink-200
                        transition-all duration-300 ease-in-out
                        ${isCartPage ? 'cursor-not-allowed' : ''}
                        ${isSearchExpanded 
                          ? 'opacity-100 w-full' 
                          : 'opacity-0 w-0 pointer-events-none'
                        }
                      `}
                      value={searchValue}
                      onChange={handleSearch}
                      disabled={isCartPage}
                      aria-label="Search cakes"
                    />
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/cart')}
                className={`
                  p-2 rounded-full transition-all duration-200
                  ${isCartPage 
                    ? 'text-pink-600 bg-pink-50' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }
                `}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 h-5" />
              </button>
              
              <div ref={profileDropdownRef} className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-pink-100 hover:border-pink-300 transition-colors"
                  aria-label="User profile"
                >
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 text-sm font-medium">
                        {localStorage.getItem('user') ? 
                          JSON.parse(localStorage.getItem('user')!).username.charAt(0).toUpperCase() 
                          : 'U'}
                      </span>
                    </div>
                  )}
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => {
                        setIsProfileSettingsOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center gap-2"
                    >
                      <UserCircle className="w-4 h-4" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Update Photo
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileSettings 
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />
    </>
  );
}
