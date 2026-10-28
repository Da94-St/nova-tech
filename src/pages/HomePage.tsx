import { Zap, Shield, Headphones, Truck, ArrowRight, CheckCircle, Loader2, Users, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSlideshow from '../components/Hero/HeroSlideshow';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import { useToaster } from '../contexts/ToasterContext';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToaster();

  const featuredProducts = products.slice(0, 4).map(product => ({
    ...product,
    name: getProductName(product.id),
    description: getProductDescription(product.id)
  }));

  const features = [
    { icon: Zap, title: 'Lightning Fast Delivery', description: 'Get your products delivered in record time with our premium shipping network.' },
    { icon: Shield, title: 'Secure Shopping', description: 'Your data is protected with military-grade encryption and fraud prevention.' },
    { icon: Headphones, title: '24/7 Customer Support', description: 'Our dedicated team is always ready to assist you, day or night.' },
    { icon: Truck, title: 'Free Shipping', description: 'Enjoy free shipping on all orders over $50. No hidden fees or surprises.' }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    
    console.log('Attempting to subscribe:', email);

    try {
      const response = await fetch("https://formsubmit.co/ajax/grayss1994@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, _subject: "New Newsletter Subscriber!" })
      });
      
      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        addToast({ type: 'success', message: 'Welcome to the Nova.Tech inner circle!' });
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        throw new Error(data.message || 'Failed');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      addToast({ type: 'error', message: 'Subscription failed. Please try again.' });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="animate-fade-in overflow-hidden">
      <HeroSlideshow />

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-120xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4">Why Choose Nova.Tech?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience premium technology shopping with benefits designed for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group cursor-pointer">                   <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-120xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl">Discover our curated selection of premium technology products</p>
            </div>
            <a href="/products" className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          FLOATING SQUARE NEWSLETTER BANNER
          ========================================= */}
      <section className="py-20 bg-white flex justify-center items-center">
        
        {/* The Floating Dark Square Box */}
        <div className="relative w-[90vw] max-w-[1200px] bg-gray-950 rounded-[3rem] shadow-2xl border border-gray-800 overflow-hidden flex flex-col items-center text-center py-12 px-6 md:px-12">
          
          {/* Inner Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Top Decorative Gradient Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

          {/* Scrolling Ticker (Inside the box) */}
          <div className="w-full overflow-hidden flex whitespace-nowrap border-b border-white/10 pb-4 mb-8 relative z-10">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex gap-12 items-center text-lg font-bold uppercase tracking-widest text-orange-500/80"
            >
              <span>⚡ Sarah from NY just subscribed</span>
              <span>🔥 Exclusive weekly tech drops</span>
              <span>✨ Join the inner circle today</span>
              <span>🎧 Alex from CA just subscribed</span>
              <span>⚡ Sarah from NY just subscribed</span>
              <span>🔥 Exclusive weekly tech drops</span>
              <span>✨ Join the inner circle today</span>
              <span>🎧 Alex from CA just subscribed</span>
            </motion.div>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(249,115,22,0.4)] relative z-10">
            <Zap className="w-12 h-12 text-white" />
          </div>

          {/* Text Content */}
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight relative z-10">
            Stay Ahead of the Curve
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-8 text-xl font-medium text-gray-400 bg-white/5 px-5 py-2 rounded-full border border-white/5 relative z-10">
            <Users className="w-10 h-10 text-orange-400" />
            <span className="text-white font-bold">12,458+</span> tech enthusiasts
          </div>

          {/* Form */}
          <form onSubmit={handleSubscribe} className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all text-center sm:text-left"
              disabled={isSubscribing || isSubscribed}
              required
            />
            <button
              type="submit"
              disabled={isSubscribing || isSubscribed}
              className={`px-8 py-4 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-lg min-w-[200px] ${
                isSubscribed 
                  ? 'bg-green-500 text-white cursor-default' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-[1.02]'
              }`}
            >
              {isSubscribing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Subscribing...</>
              ) : isSubscribed ? (
                <><CheckCircle className="w-5 h-5" /> Subscribed!</>
              ) : (
                <>Subscribe Now <Sparkles className="w-8 h-8" /></>
              )}
            </button>
          </form>
          
          <p className="text-md text-gray-200 mt-6 flex items-center justify-center gap-2 relative z-10">
            <Shield className="w-6 h-6 text-green-500/70" /> We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-120xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-600">Brand Partners</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  function getProductName(id: string): string {
    const names: Record<string, string> = { '1': 'Wireless Earbuds Pro', '2': 'Smart Watch Series 8', '3': 'Gaming Laptop RTX 4080', '4': '4K Professional Camera' };
    return names[id] || 'Product';
  }
  function getProductDescription(id: string): string {
    const descs: Record<string, string> = { '1': 'Premium wireless earbuds with active noise cancellation and 30-hour battery life.', '2': 'Advanced smartwatch with health monitoring, GPS, and LTE connectivity.', '3': 'High-performance gaming laptop with RTX 4080 graphics and 240Hz display.', '4': 'Professional 4K camera with 30x optical zoom and advanced stabilization.' };
    return descs[id] || 'High-quality product with premium features.';
  }
}


