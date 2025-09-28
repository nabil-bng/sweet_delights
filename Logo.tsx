import { useLocation } from 'react-router-dom';

export default function Logo() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`
      h-10 flex items-center transform transition-transform duration-300 hover:scale-105
      ${isLoginPage ? 'h-12' : ''}
    `}>
      <h1 className={`
        font-serif text-2xl font-bold
        ${isLoginPage
          ? 'text-white text-3xl'
          : 'bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent'
        }
      `}>
        Sweet Delights
      </h1>
    </div>
  );
}
