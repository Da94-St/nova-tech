import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const { addItem, state } = useCart();

  const isInCart = state.items.some(item => item.id === product.id);

  useEffect(() => {
    if (showAddedNotification) {
      const timer = setTimeout(() => {
        setShowAddedNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddedNotification]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setShowAddedNotification(true);
    setIsAddingToCart(false);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const wishlistAriaLabel = isWishlisted
    ? `Remove ${product.name} from wishlist`
    : `Add ${product.name} to wishlist`;

  return (
    <div className="relative group h-full">
      {/* Added to Cart Notification */}
      {showAddedNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap">
            <ShoppingCart className="w-4 h-4" />
            <span className="font-medium">{product.name} added to cart!</span>
          </div>
        </div>
      )}

      <Link to={`/products/${product.id}`} className="block h-full">
        {/* Changed: Removed group-hover:scale-105 to stop layout jumps, added h-full flex flex-col for perfect alignment */}
        <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
          
          {/* Image container */}
          <div className="relative overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-white shadow-sm"
              aria-label={wishlistAriaLabel}
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                  isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                }`}
              />
            </button>

            {/* Stock Status */}
            <div className="absolute top-3 left-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                  product.inStock
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="p-5 flex flex-col flex-1 justify-between bg-white">
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1 mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px] mb-3">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock && (
                  <span className="text-xs text-green-600 font-medium mt-1">
                    ✓ Free shipping
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className={`relative overflow-hidden py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  isInCart
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-105'
                } ${!product.inStock ? 'bg-gray-400 cursor-not-allowed' : ''}`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
