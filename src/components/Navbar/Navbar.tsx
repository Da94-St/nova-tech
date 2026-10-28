import { AnimatePresence, motion } from 'framer-motion';
import { Home, Languages, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../src/Logo/leaf.png';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/products';

function Navbar() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const { user, isAuthenticated, signOut } = useAuth();
  const { state: cartState } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', href: '/', icon: <Home className="w-8 h-7" /> },
    { key: 'products', href: '/products', label: 'Products' },
    { key: 'services', href: '/services', label: 'Services' },
    { key: 'about', href: '/about', label: 'About' },
    { key: 'blog', href: '/blog', label: 'Blog' },
    { key: 'contact', href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const filtered = products.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleNavItemClick = (href: string) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  // Browser Translation Function
  const handleLanguageClick = () => {
    alert('To change language, please adjust your browser language preferences. The site will adapt automatically.');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSearchModal) {
        setShowSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showSearchModal]);

  return (
    <>
      <nav className="fixed top-1 left-2 right-2 z-50 rounded-full border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-[1.2] shadow-2xl">
        <div className="relative z-10 max-w-120xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-[4.5rem]">
            
            {/* Logo and Word */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center transition-all duration-300 group cursor-pointer flex-shrink-0"
            >
              <img 
                src={Logo} 
                alt="Nova.Tech Logo" 
                className="h-10 md:h-16 w-auto transition-all duration-300 relative z-10 opacity-90 group-hover:opacity-100"
              />
              <div className="relative ml-1 z-20 hidden sm:block">
                <span className="text-2xl md:text-4xl font-black leading-none tracking-tight transition-all duration-300 relative z-30 text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text">
                  Nova.Tech
                </span>
              </div>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavItemClick(item.href)}
                  className="text-lg px-4 py-2.5 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md hover:bg-white/60 text-gray-800 hover:text-gray-900 font-semibold transition-all duration-300 relative group flex items-center gap-2"
                >
                  {item.icon && React.cloneElement(item.icon, {
                    style: { filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))' }
                  })}
                  {item.key !== 'home' && item.label}
                  <span className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative group">
                <button
                  onClick={() => setShowSearchModal(true)}
                  className="flex items-center justify-center p-2.5 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-200 group-hover:bg-orange-400/30 hover:-translate-y-1"
                >
                  <Search className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </div>

              <div className="relative group hidden md:block">
                <button
                  onClick={handleLanguageClick}
                  className="flex items-center justify-center p-2.5 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-200 group-hover:bg-orange-400/30 hover:-translate-y-1 relative"
                >
                  <Languages className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </button>
              </div>

              <div className="relative group">
                <Link
                  to="/cart"
                  className="flex items-center justify-center p-2.5 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-200 group-hover:bg-orange-400/30 hover:-translate-y-1"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110" />
                    {cartState.count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                        {cartState.count}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              <div className="hidden md:block">
                {isAuthenticated ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-2.5 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-1">
                      <User className="w-7 h-7 transition-transform duration-300" />
                      <span className="hidden lg:inline text-white font-semibold">{user?.name}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center text-lg justify-center p-2.5 rounded-3xl bg-gradient-to-r from-orange-400 to-orange-500 text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <User className="w-7 h-7 transition-transform duration-300" />
                    <span className="hidden lg:inline ml-2 font-semibold mr-1">Start</span>
                  </button>
                )}
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center p-2.5 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-md hover:bg-white/60 text-gray-700 transition-all duration-200 hover:-translate-y-1"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* MOBILE MENU DROPDOWN (WORKING & VISIBLE)   */}
        {/* ========================================== */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[105%] left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-[999]">
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 p-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavItemClick(item.href)}
                    className="text-lg text-center transition-all duration-300 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-gray-800 hover:bg-orange-500/30 font-semibold"
                  >
                    {item.icon && item.icon}
                    {item.key !== 'home' && item.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setShowSearchModal(true); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                  <button
                    onClick={() => { handleLanguageClick(); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold relative"
                  >
                    <Languages className="w-5 h-5" />
                    Translate
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>
                  </button>
                </div>
                
                {/* Mobile Sign In Button */}
                <button
                  onClick={() => { handleAuthClick(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated ? 'My Account' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowSearchModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-2xl mx-4 bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl h-96 flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/10">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                  <Search className="w-6 h-6 text-gray-700"/>
                  Search Products
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSearchModal(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 text-white"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-4">
                <form onSubmit={handleSearchSubmit} className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-700" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      placeholder="Search for products, services, or categories..."
                      className="w-full pl-12 pr-4 py-3 bg-white/50 text-gray-900 placeholder-gray-600 rounded-lg border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all hidden sm:block disabled:opacity-50"
                  >
                    Search
                  </button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {searchQuery.trim() === '' ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Search className="w-16 h-16 mb-4 text-white/60" />
                    <p className="text-xl font-medium text-white">Start typing to search...</p>
                    <p className="text-sm mt-2 text-white/70">Try searching for products, services, or categories</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Search Results ({searchResults.length})
                    </h3>
                    {searchResults.map((result) => (
                      <motion.button
                        key={result.id}
                        whileHover={{ x: 5 }}
                        className="w-full text-left p-3 bg-white/50 rounded-lg hover:bg-white/70 border border-white/20 transition-colors"
                        onClick={() => {
                          navigate(`/products/${result.id}`);
                          setShowSearchModal(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{result.name}</p>
                            <p className="text-sm text-gray-600">{result.category}</p>
                          </div>
                          <Search className="w-4 h-4 text-gray-500" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <X className="w-16 h-16 mb-4 text-white/60" />
                    <p className="text-xl font-medium text-white">No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-2 mb-6 text-white/70">Try checking your spelling or use fewer keywords.</p>
                    
                    <button
                      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank')}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all"
                    >
                      Search Google for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;


