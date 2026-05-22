import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_CATEGORIES = [
  { value: 'all', label: 'All' },
  // { value: 'pet-supplies', label: 'Pet Supplies' },
  // { value: 'sports-outdoor', label: 'Sports and Outdoor' },
  // { value: 'home-kitchen', label: 'Home and Kitchen' },
  // { value: 'beauty-personal-care', label: 'Beauty And Personal Care' },
  // { value: 'automotive', label: 'Automotive Parts & Accessories' },
  // { value: 'household-health-baby', label: 'Household, Health & Baby Care' },
  // { value: 'tools-home-improvement', label: 'Tools and Home Improvement' },
];

const Header = ({ authLoading, authUser, onLogout, onSearch, onCategoryChange, selectedCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          return;
        }

        const categoryData = await response.json();
        const backendCategories = categoryData.map((category) => ({ value: category.slug, label: category.label }));
        const mergedCategories = [
          ...DEFAULT_CATEGORIES,
          ...backendCategories.filter((backendCategory) =>
            !DEFAULT_CATEGORIES.some((defaultCategory) => defaultCategory.value === backendCategory.value)
          ),
        ];

        setCategories(mergedCategories);
      } catch (error) {
        console.warn('Failed to load categories from backend:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[auto_minmax(320px,1fr)_auto]">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="AHSAN E SALES LTD" className="h-12 w-auto md:h-16" />
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex justify-center">
            <div className="w-full max-w-xl">
              <div className="hidden md:flex items-center bg-white rounded-full overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-black outline-none"
                />
                <button type="submit" className="bg-blue-800 px-5 py-3 text-white hover:bg-blue-700">
                  Search
                </button>
              </div>
              <div className="md:hidden flex items-center bg-white rounded-full overflow-hidden shadow-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-black outline-none"
                />
                <button type="submit" className="bg-blue-800 px-4 py-3 text-white hover:bg-blue-700">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <Link
              to="/cart"
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-blue-700 hover:bg-blue-100 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Bag
            </Link>
            {authUser?.role === 'admin' ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-blue-700 hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>
            ) : null}
            {authLoading ? (
              <span className="rounded-full bg-blue-700 px-4 py-2 text-sm text-white">Loading...</span>
            ) : authUser ? (
              <>
                <span className="rounded-full bg-white px-4 py-2 text-blue-700">
                  {authUser.name}
                </span>
                <button
                  onClick={onLogout}
                  className="rounded-full bg-blue-800 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-white bg-white px-4 py-2 text-blue-700 transition hover:bg-blue-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-blue-800 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden self-end">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="mt-4 pt-2 hidden md:flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${selectedCategory === cat.value ? 'bg-white text-blue-700' : 'bg-blue-700 text-white hover:bg-blue-600'}`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black"
            />
            <button type="submit" className="w-full mt-2 bg-blue-800 px-4 py-2 rounded-md hover:bg-blue-700">
              Search
            </button>
          </form>
          <nav className="space-y-2">
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-full bg-white px-3 py-2 text-center text-blue-700 hover:bg-blue-100"
            >
              🛍️ Bag
            </Link>
            {authUser?.role === 'admin' ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-full bg-white px-3 py-2 text-center text-blue-700 hover:bg-blue-100"
              >
                Dashboard
              </Link>
            ) : null}
            {authLoading ? (
              <div className="block w-full rounded-full bg-white px-3 py-2 text-center text-blue-700">
                Loading...
              </div>
            ) : authUser ? (
              <>
                <div className="block w-full rounded-full bg-white px-3 py-2 text-center text-blue-700">
                  {authUser.name}
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full rounded-full bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-full bg-white px-3 py-2 text-center text-blue-700 hover:bg-blue-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-full bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-400"
                >
                  Register
                </Link>
              </>
            )}
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  onCategoryChange(cat.value);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left rounded-full px-3 py-2 text-sm transition-colors ${selectedCategory === cat.value ? 'bg-white text-blue-700' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
