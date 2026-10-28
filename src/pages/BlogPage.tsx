import { ArrowRight, Calendar, Clock, Globe, Sparkles, User, Search, Loader2 } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingArticles, Article } from '../services/newsService';

export default function BlogPage() {
  // INSTANT LOAD: Read from localStorage synchronously on first render
  const [blogPosts, setBlogPosts] = useState<Article[]>(() => {
    const cacheKey = `nova_news_v8_technology_12`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached).data;
    return [];
  });
  
  const [isLoading, setIsLoading] = useState(blogPosts.length === 0);
  const [selectedCategory, setSelectedCategory] = useState('Technology');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['Technology', 'Business', 'World', 'Sports', 'Entertainment'];

  useEffect(() => {
    const loadNews = async () => {
      // If switching categories, show loading. Otherwise, fetch in background.
      const currentCacheKey = `nova_news_v8_${selectedCategory.toLowerCase()}_12`;
      const hasCache = !!localStorage.getItem(currentCacheKey);
      
      if (!hasCache) setIsLoading(true);
      
      const articles = await fetchTrendingArticles(selectedCategory.toLowerCase(), 12);
      setBlogPosts(articles);
      setIsLoading(false);
      setVisibleCount(4);
    };
    loadNews();
  }, [selectedCategory]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    });
  }, [blogPosts, searchQuery]);

  const stats = [
    { value: '500+', label: 'Articles Published', icon: <Sparkles className="w-6 h-6" /> },
    { value: '1M+', label: 'Monthly Readers', icon: <User className="w-6 h-6" /> },
    { value: '24/7', label: 'Fresh Content', icon: <Clock className="w-6 h-6" /> },
    { value: '50+', label: 'Expert Authors', icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-900/50 to-purple-900/30" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 pt-32 pb-16">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
              <span className="text-purple-200 font-semibold text-sm">Live Tech Insights & Trends</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Tech <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Insights</span> & Trends
            </h1>
          </div>
        </div>
      </section>

      <section className="py-4 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="w-[85vw] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-purple-300">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-purple-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-[85vw] mx-auto py-16">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Insights</h2>
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by title, author, or keywords..." className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg transition-all" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${selectedCategory === category ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-2xl' : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-xl text-gray-600 font-medium">Fetching latest headlines...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No live articles found</h3>
            <p className="text-gray-600 mb-6">We couldn't fetch news for this category right now. Please try another category.</p>
            <button onClick={() => setSelectedCategory('Technology')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors">
              Go back to Tech
            </button>
          </div>
        ) : (
          <>
            <section className="mb-16">
              {filteredPosts.length > 0 && (
                <Link to={`/blog/${filteredPosts[0].id}`} state={{ article: filteredPosts[0] }} className="block bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-72 lg:h-auto overflow-hidden bg-gray-100">
                      <img 
                        src={filteredPosts[0].image} 
                        alt={filteredPosts[0].title} 
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'; }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-bold shadow-lg">Featured Article</span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {filteredPosts[0].date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {filteredPosts[0].readTime}</span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300 line-clamp-3">{filteredPosts[0].title}</h2>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-3">{filteredPosts[0].excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <span className="font-semibold text-gray-700">{filteredPosts[0].author}</span>
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 flex items-center gap-2">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </section>

            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1, visibleCount).map((post) => (
                  <Link to={`/blog/${post.id}`} state={{ article: post }} key={post.id} className="block h-full">
                    <article className="bg-white rounded-3xl shadow-lg border border-gray-200 group flex flex-col overflow-hidden hover:shadow-2xl hover:border-purple-200 transition-all duration-300 h-full">
                      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'; }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full text-xs font-bold shadow-sm">{post.category}</span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 min-h-[56px]">{post.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                        
                        <div className="flex flex-col mt-auto pt-4 border-t border-gray-100">
                           <span className="text-sm font-semibold text-gray-700 mb-4">{post.author}</span>
                           <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300">
                              <span>Read Article</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              
              {filteredPosts.length > visibleCount && (
                <div className="text-center mt-12">
                  <button onClick={() => setVisibleCount(prev => prev + 3)} className="px-8 py-4 bg-white border-2 border-purple-500 text-purple-600 font-bold rounded-xl hover:bg-purple-50 hover:shadow-lg transition-all duration-300">
                    Load More Articles
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

