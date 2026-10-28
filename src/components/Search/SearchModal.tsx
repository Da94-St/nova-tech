import { Search, TrendingUp, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { products } from '../../data/products';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  onClose: () => void;
}

function SearchModal({ onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const trendingSearches = ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Gaming'];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Kept the Glass Background */}
      <div className="relative w-full max-w-2xl mx-4 bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-slide-up flex flex-col max-h-[80vh]">
        <form onSubmit={handleSubmit} className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-800" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 bg-white/60 text-gray-900 placeholder-gray-600 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none text-lg"
              />
            </div>
            
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all hidden sm:block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-3 rounded-xl bg-white/50 hover:bg-white/70 text-gray-700 transition-colors duration-200 border border-white/30"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </form>

        <div className="p-6 overflow-y-auto flex-1">
          {searchQuery.trim() === '' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(term);
                    }}
                    className="px-4 py-2 bg-white/20 border border-white/30 rounded-full font-medium text-white hover:bg-white/30 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                Results ({searchResults.length})
              </h3>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    navigate(`/products/${result.id}`);
                    onClose();
                  }}
                  className="w-full text-left p-3 bg-white/20 rounded-lg hover:bg-white/30 border border-white/20 transition-colors"
                >
                  <p className="font-semibold text-white">{result.name}</p>
                  <p className="text-sm text-white/80">{result.category}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              {/* FIXED: White icon and text beneath it */}
              <Search className="w-16 h-16 mb-4 text-white/60" />
              <p className="text-xl font-medium text-white">No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2 text-white/70">Try checking your spelling or use fewer keywords.</p>
              
              <button
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank')}
                className="mt-6 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Search Google for "{searchQuery}"
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
