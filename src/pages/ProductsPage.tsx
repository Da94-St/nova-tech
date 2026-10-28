import { ChevronDown, Filter, Grid, List, Search, Star, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const { addItem } = useCart();

  // Sync URL search param if changed externally (e.g. from Navbar)
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    // Update URL without adding to history
    if (val.trim()) {
      setSearchParams({ search: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto scroll to the products grid when they submit the search
    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category || 'Uncategorized');
    return ['all', ...Array.from(new Set(allCategories))].filter(Boolean);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product =>
        selectedRatings.some(rating => product.rating >= rating && product.rating < rating + 1)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.reviewCount - a.reviewCount;
        case 'popular':
        default: return b.reviewCount - a.reviewCount;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy, searchQuery, selectedRatings]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 3000]);
    setSearchQuery('');
    setSearchParams({}, { replace: true });
    setSelectedRatings([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner - 80vh Height with Perfect Spacing */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-16 w-full">
          <div className="text-center max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Discover Our <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Premium</span> Collection
            </h1>
            
            {/* Functional Search Form */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 relative">
              <Search className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/80" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products, categories, or features..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => { setSearchQuery(''); setSearchParams({}, { replace: true }); }} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            <button
              onClick={() => {
                document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Products
                <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <div id="products-grid" className="max-w-120xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
              </h2>
              <p className="text-gray-600">Showing {filteredAndSortedProducts.length} of {products.length} products</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-orange-900">×</button>
                  </span>
                )}
                {(selectedCategory !== 'all' || selectedRatings.length > 0 || searchQuery) && (
                  <button onClick={resetFilters} className="text-sm text-gray-600 hover:text-gray-800 font-medium">Clear all</button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors duration-200 ${viewMode === 'grid' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>
                    <Grid className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-colors duration-200 ${viewMode === 'list' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'hover:bg-gray-100 text-gray-600'}`}>
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold px-6 py-3 rounded-xl mb-6 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-80 space-y-6`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button onClick={resetFilters} className="text-sm font-medium text-orange-600 hover:text-orange-700">Reset All</button>
              </div>

              <div className="mb-6">
                <button onClick={() => setExpandedFilters(prev => ({...prev, categories: !prev.categories}))} className="flex items-center justify-between w-full mb-3">
                  <h4 className="font-bold text-gray-700">Categories</h4>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.categories ? 'rotate-180' : ''}`} />
                </button>
                {expandedFilters.categories && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                          selectedCategory === category ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 font-bold border border-orange-200' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{category === 'all' ? 'All Categories' : category}</span>
                        {selectedCategory === category && <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button onClick={() => setExpandedFilters(prev => ({...prev, price: !prev.price}))} className="flex items-center justify-between w-full mb-3">
                  <h4 className="font-bold text-gray-700">Price Range</h4>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`} />
                </button>
                {expandedFilters.price && (
                  <div className="space-y-4">
                    {/* Fixed functional slider with standard accent */}
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-gray-600">${priceRange[0]}</span>
                      <span className="font-bold text-gray-800">${priceRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {filteredAndSortedProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-8 max-w-md">We couldn't find anything matching your search or filters. Try adjusting your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
