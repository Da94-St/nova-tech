import { ArrowLeft, ArrowRight, Minus, Plus, RefreshCw, Shield, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const shipping = state.total > 50 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shipping + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-120xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Your Cart is <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Empty</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Add some amazing products to your cart and start shopping!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/deals" 
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View Today's Deals
              </Link>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Nova Pro Smartphone', price: 899, image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800' },
                { name: 'SoundWave Pro Headphones', price: 349, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800' },
                { name: 'SmartWatch Elite', price: 449, image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800' },
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 text-center group hover:shadow-2xl transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <Link 
                    to="/products" 
                    className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-120xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                Shopping <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Cart</span>
              </h1>
              <p className="text-gray-600">
                {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Truck className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Free Shipping on Orders Over $50!</h3>
                <p className="text-green-100">
                  {shipping > 0 
                    ? `Add $${(50 - state.total).toFixed(2)} more for free shipping` 
                    : '🎉 You qualify for free shipping!'}
                </p>
              </div>
            </div>
            {shipping > 0 && (
              <div className="bg-white text-green-700 font-bold px-4 py-2 rounded-full">
                ${(50 - state.total).toFixed(2)} to go
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <Link to={`/products/${item.id}`} className="block md:w-48 md:h-48 w-full h-64">
                    <div className="relative overflow-hidden rounded-2xl h-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                          ×{item.quantity}
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/products/${item.id}`}>
                              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-bold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-600">Item Total</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                Order Summary
              </h2>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-800">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-bold text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center mb-4 group"
              >
                <span className="flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>

              {/* Security & Guarantee */}
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Secure Checkout</p>
                    <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">30-Day Returns</p>
                    <p className="text-xs text-gray-600">Free returns within 30 days</p>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <Link
                  to="/products"
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Save for Later</h3>
            <p className="text-gray-600">Wishlist items you're not ready to buy yet</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Share Your Cart</h3>
            <p className="text-gray-600">Send your cart to friends or family</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Auto-Save</h3>
            <p className="text-gray-600">Your cart is automatically saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;