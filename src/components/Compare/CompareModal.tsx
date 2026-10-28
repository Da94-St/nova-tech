import { X, Check, Trash2, ArrowLeftRight } from 'lucide-react';
import { products } from '../../data/products';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareIds: string[];
  removeCompare: (id: string) => void;
  clearCompare: () => void;
}

export default function CompareModal({ isOpen, onClose, compareIds, removeCompare, clearCompare }: CompareModalProps) {
  if (!isOpen) return null;

  const comparedProducts = products.filter(p => compareIds.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
          <ArrowLeftRight className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No products to compare</h2>
          <p className="text-gray-600 mb-6">Add products to your comparison list from the product pages.</p>
          <button onClick={onClose} className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg transition-all">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-orange-500" />
            Compare Products ({comparedProducts.length})
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={clearCompare} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
              Clear All
            </button>
            <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex gap-6 min-w-max">
            {comparedProducts.map(product => (
              <div key={product.id} className="w-72 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative group">
                <button 
                  onClick={() => removeCompare(product.id)}
                  className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                  <p className="text-2xl font-bold text-orange-600 mb-4">${product.price.toFixed(2)}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-bold text-gray-800">{product.rating} / 5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Reviews</span>
                      <span className="font-bold text-gray-800">{product.reviewCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">In Stock</span>
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        {product.inStock ? <><Check className="w-4 h-4 text-green-500"/> Yes</> : <span className="text-red-500">No</span>}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
