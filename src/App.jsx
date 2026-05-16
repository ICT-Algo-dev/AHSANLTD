import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import OrderStatus from './pages/OrderStatus';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { API_BASE_URL } from './lib/api';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category') || 'all';
    const searchParam = params.get('search') || '';

    setCategory(categoryParam);
    setSearchTerm(searchParam);
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [category, searchTerm]);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    const savedUser = localStorage.getItem('authUser');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (savedUser) {
          try {
            setAuthUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem('authUser');
            setAuthUser(null);
          }
        } else {
          setAuthUser(null);
        }
        setAuthLoading(false);
        return;
      }

      const data = await response.json();
      setAuthUser(data.user);
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } catch (error) {
      console.error('Session restore failed:', error);
      if (savedUser) {
        try {
          setAuthUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('authUser');
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const queryParams = new URLSearchParams();

      if (category !== 'all') {
        queryParams.set('category', category);
      } else {
        queryParams.set('shuffle', 'true');

        if (!searchTerm) {
          queryParams.set('limit', '30');
        }
      }

      if (searchTerm) {
        queryParams.set('search', searchTerm);
      }

      const queryString = queryParams.toString();
      const response = await fetch(`${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setError('Products load nahi ho rahe. Backend server aur browser origin check karein.');
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const params = new URLSearchParams(location.search);

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    navigate({ pathname: '/', search: params.toString() }, { replace: true });
  };

  const handleCategoryChange = (newCategory) => {
    const params = new URLSearchParams(location.search);

    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }

    navigate({ pathname: '/', search: params.toString() }, { replace: true });
  };

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    localStorage.setItem('authUser', JSON.stringify(user));
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
      setAuthUser(null);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        authLoading={authLoading}
        authUser={authUser}
        onLogout={handleLogout}
        selectedCategory={category}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home products={products} category={category} searchTerm={searchTerm} loading={loading} error={error} />} />
          <Route path="/product/:id" element={<ProductDetails apiBaseUrl={API_BASE_URL} />} />
          <Route path="/cart" element={<Cart apiBaseUrl={API_BASE_URL} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route
            path="/dashboard"
            element={(
              <ProtectedAdminRoute authLoading={authLoading} authUser={authUser}>
                <Dashboard />
              </ProtectedAdminRoute>
            )}
          />
          <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/register" element={<Register onAuthSuccess={handleAuthSuccess} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
