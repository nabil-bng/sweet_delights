import { useState, useEffect, useRef } from 'react';
import { X, Camera, User, Mail, Phone } from 'lucide-react';

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileData {
  username: string;
  email: string;
  phone: string;
  photo?: string;
}

export default function ProfileSettings({ isOpen, onClose }: ProfileSettingsProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    email: '',
    phone: '',
    photo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const userData = localStorage.getItem('user');
      const photoData = localStorage.getItem('profilePhoto');
      
      if (userData) {
        const parsed = JSON.parse(userData);
        setProfileData({
          username: parsed.username || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          photo: photoData || ''
        });
      }
    }
  }, [isOpen]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      localStorage.setItem('user', JSON.stringify({
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone
      }));
      
      if (profileData.photo) {
        localStorage.setItem('profilePhoto', profileData.photo);
      }

      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred while updating your profile.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="w-full max-w-md relative transform transition-all duration-300">
        <div className="relative bg-white rounded-2xl shadow-2xl p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Title */}
          <div className="mb-8">
            <h3 className="text-2xl font-serif text-gray-800">Profile Settings</h3>
            <p className="text-gray-500 mt-1 text-sm">Update your personal information</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`
              mb-6 p-4 rounded-xl text-sm font-medium
              transition-all duration-300 ease-out transform
              ${message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
              }
            `}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {profileData.photo ? (
                    <img 
                      src={profileData.photo} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center">
                      <User className="w-10 h-10 text-pink-300" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2.5 bg-pink-600 text-white rounded-full shadow-lg
                           hover:bg-pink-700 transition-all duration-200 transform
                           group-hover:scale-110 hover:rotate-12"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                             focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400
                             transition-all duration-200"
                    pattern="[0-9+\-\s()]+"
                    title="Please enter a valid phone number"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3.5 px-4 mt-6
                bg-gradient-to-r from-pink-500 to-pink-600
                text-white font-medium rounded-xl shadow-lg
                transform transition-all duration-200
                hover:from-pink-600 hover:to-pink-700 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isLoading ? 'animate-pulse' : 'hover:-translate-y-0.5'}
              `}
            >
              {isLoading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
