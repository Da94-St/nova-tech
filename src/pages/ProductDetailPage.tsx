import { ArrowLeft, ArrowLeftRight, Battery, Check, Cpu, Heart, Monitor, RotateCcw, Shield, ShoppingCart, Star, Truck, Wifi, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import CompareModal from '../components/Compare/CompareModal';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { addItem, state } = useCart();
  
  // React 19 Math.random() purity fix
  const [itemsLeft] = useState(() => Math.floor(Math.random() * 50) + 10);

  // Compare Modal State
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Initialize Wishlist and Compare states from localStorage
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved).includes(id) : false;
  });

  const [isCompared, setIsCompared] = useState(() => {
    const saved = localStorage.getItem('compare');
    return saved ? JSON.parse(saved).includes(id) : false;
  });

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);
  const isInCart = state.items.some(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (showAddedNotification) {
      const timer = setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddedNotification]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-32 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.images || [
    product.image,
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const getFeatures = () => {
    const features = [
      { icon: <Zap className="w-7 h-7" />, text: 'Fast Performance' },
      { icon: <Battery className="w-7 h-7" />, text: 'Long Battery Life' },
      { icon: <Wifi className="w-7 h-7" />, text: 'Wireless Connectivity' },
      { icon: <Cpu className="w-7 h-7" />, text: 'High-end Processor' },
      { icon: <Monitor className="w-7 h-7" />, text: 'High Resolution Display' },
      { icon: <Shield className="w-7 h-7" />, text: 'Premium Build Quality' }
    ];
    return features.slice(0, 4);
  };

  const getSpecifications = () => {
    const baseSpecs = {
      'Brand': product.brand || 'NovaTech',
      'Model': product.model || `${product.name} Pro`,
      'Color': 'Black/Matte',
      'Weight': '1.2 kg',
      'Dimensions': '12.5 x 8.5 x 0.7 inches',
      'Warranty': '2 Years',
      'SKU': `NT-${product.id.padStart(4, '0')}`
    };
    
    if (product.category?.includes('Audio')) {
      return {
        ...baseSpecs,
        'Battery Life': '30 hours',
        'Connectivity': 'Bluetooth 5.2',
        'Noise Cancellation': 'Active',
        'Water Resistance': 'IPX7'
      };
    } else if (product.category?.includes('Wearables')) {
      return {
        ...baseSpecs,
        'Display': 'AMOLED 1.75"',
        'Battery': '7 days',
        'Water Resistance': '5 ATM',
        'Sensors': 'Heart Rate, GPS, SpO2'
      };
    }
    
    return baseSpecs;
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setShowAddedNotification(true);
  };

  const handleWishlistToggle = () => {
    const saved = localStorage.getItem('wishlist');
    let list = saved ? JSON.parse(saved) : [];
    
    if (isWishlisted) {
      list = list.filter((item: string) => item !== id);
    } else {
      list.push(id);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(list));
    setIsWishlisted(!isWishlisted);
  };

  const handleCompareToggle = () => {
    const saved = localStorage.getItem('compare');
    let list = saved ? JSON.parse(saved) : [];
    
    if (isCompared) {
      list = list.filter((item: string) => item !== id);
    } else {
      if (list.length >= 4) {
        alert("You can only compare up to 4 products at a time.");
        return;
      }
      list.push(id);
    }
    
    localStorage.setItem('compare', JSON.stringify(list));
    setIsCompared(!isCompared);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 px-4 pb-16">
      {showAddedNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <Check className="w-7 h-7" />
            <div>
              <p className="font-bold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} × {product.name}</p>
            </div>
            <button onClick={() => setShowAddedNotification(false)} className="ml-4 text-white/80 hover:text-white">✕</button>
          </div>
        </div>
      )}

      <div className="w-[90vw] max-w-[1600px] mx-auto">
        {/* Distinguished Breadcrumbs */}
        <nav className="inline-flex items-center gap-4 text-base md:text-lg font-medium text-gray-700 bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl mb-8 shadow-sm border border-gray-200">
          <Link to="/" className="hover:text-orange-600 transition-colors duration-300">Home</Link>
          <span className="text-gray-400 font-bold">/</span>
          <Link to="/products" className="hover:text-orange-600 transition-colors duration-300">Products</Link>
          <span className="text-gray-400 font-bold">/</span>
          <span className="font-bold text-gray-900 truncate max-w-[200px] md:max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-200 mb-6">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-4 transition-all duration-300 hover:scale-105 ${
                      index === selectedImage ? 'border-orange-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold rounded-full">
                  {product.brand || 'NovaTech'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  product.inStock ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                }`}>
                  {product.inStock ? 'In Stock ✓' : 'Out of Stock'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{product.rating} • {product.reviewCount} reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-2xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="text-sm font-bold text-green-600">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {getFeatures().map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <span className="font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200">
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-800 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white transition-colors duration-200">
                      <span className="text-2xl text-gray-600">−</span>
                    </button>
                    <span className="w-16 text-center text-2xl font-bold text-gray-800">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white transition-colors duration-200">
                      <span className="text-2xl text-gray-600">+</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Only {itemsLeft} items left</p>
                    <p className="text-green-600 font-medium">Free shipping</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isInCart}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isInCart ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl' : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-xl hover:scale-[1.02]'
                  } ${!product.inStock ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isInCart ? 'Already in Cart ✓' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
                
                <div className="flex gap-3 pt-4">
                  {/* Wishlist Button - Fixed Size Shift */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex-1 py-3 px-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                      isWishlisted
                        ? 'bg-red-50 text-red-600 border-red-200 shadow-inner'
                        : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                  
                  {/* Compare Button - Fixed Size Shift */}
                  <button
                    onClick={handleCompareToggle}
                    className={`flex-1 py-3 px-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                      isCompared
                        ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-inner'
                        : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <ArrowLeftRight className={`w-5 h-5 ${isCompared ? 'text-blue-600' : ''}`} />
                    {isCompared ? 'Comparing' : 'Compare'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    <Truck className="w-7 h-7 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $50</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                    <RotateCcw className="w-7 h-7 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">30-Day Returns</p>
                  <p className="text-xs text-gray-600">Easy return policy</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">2-Year Warranty</p>
                  <p className="text-xs text-gray-600">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Specifications Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Specifications
            </h2>
            <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
              Download Spec Sheet →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(getSpecifications()).map(([key, value]) => (
              <div 
                key={key} 
                className="flex items-center justify-between p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-bold text-gray-700">{key}</span>
                </div>
                <span className="font-medium text-gray-900 text-right">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Customer Reviews</h2>
            <button onClick={() => alert('All reviews page coming soon!')} className="text-sm font-medium text-orange-600 hover:text-orange-700">
              View All {product.reviewCount} Reviews →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div>
                  <p className="font-bold text-gray-800">Alex Johnson</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Absolutely love this product! The quality exceeded my expectations. Battery life is fantastic and the performance is top-notch."</p>
              <p className="text-sm text-gray-400">Verified Purchase • 2 weeks ago</p>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div>
                  <p className="font-bold text-gray-800">Sam Wilson</p>
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"Great value for money. The design is sleek and modern. Minor issues with connectivity but customer support was very helpful."</p>
              <p className="text-sm text-gray-400">Verified Purchase • 1 month ago</p>
            </div>
          </div>
        </section>

        {/* Floating Compare Bar */}
        {JSON.parse(localStorage.getItem('compare') || '[]').length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
            <button
              onClick={() => setShowCompareModal(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-all duration-300 border border-gray-700"
            >
              <ArrowLeftRight className="w-5 h-5 text-orange-400" />
              Compare ({JSON.parse(localStorage.getItem('compare') || '[]').length})
            </button>
          </div>
        )}

        {/* Compare Modal */}
        <CompareModal 
          isOpen={showCompareModal} 
          onClose={() => setShowCompareModal(false)} 
          compareIds={JSON.parse(localStorage.getItem('compare') || '[]')}
          removeCompare={(id) => {
            const list = JSON.parse(localStorage.getItem('compare') || '[]').filter((item: string) => item !== id);
            localStorage.setItem('compare', JSON.stringify(list));
            if (list.length === 0) setShowCompareModal(false);
            if (id === product.id) setIsCompared(false);
            // Force re-render
            setShowCompareModal(true); 
          }}
          clearCompare={() => {
            localStorage.setItem('compare', '[]');
            setIsCompared(false);
            setShowCompareModal(false);
          }}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Related Products</h2>
              <Link to="/products" className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                View All Products →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
