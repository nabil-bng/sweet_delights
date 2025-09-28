import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import LoginPage from './components/LoginPage';
import Shop from './components/Shop';
import TraditionalCakes from './components/pages/TraditionalCakes';
import FestiveCakes from './components/pages/FestiveCakes';
import FrenchCakes from './components/pages/FrenchCakes';
import OrderPage from './components/pages/OrderPage';
import CartPage from './components/pages/CartPage';
import './index.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" expand closeButton richColors />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedPages />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

function ProtectedPages() {
  return (
    <Routes>
      <Route path="/shop" element={<Shop />} />
      <Route path="/traditional" element={<TraditionalCakes />} />
      <Route path="/festive" element={<FestiveCakes />} />
      <Route path="/french" element={<FrenchCakes />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/shop" replace />} />
    </Routes>
  );
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  let isAuthenticated = false;
  
  try {
    const user = localStorage.getItem('user');
    isAuthenticated = !!user;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return <Navigate to="/login" replace />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default App;
