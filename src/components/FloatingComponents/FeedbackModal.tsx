import { motion } from 'framer-motion';
import { Send, Star, X } from 'lucide-react';
import React, { useState } from 'react';
import { useToaster } from '../../contexts/ToasterContext';

interface FeedbackModalProps {
  onClose: () => void;
}

function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToaster();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToast({
      type: 'success',
      message: 'Thank you for your feedback! We appreciate your input.',
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Light Glass Container */}
      <div className="relative w-full max-w-md mx-4 bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 animate-slide-up text-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Send Feedback</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
            aria-label="Close feedback form"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-3">
              How would you rate your experience?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 rounded transition-transform duration-200"
                >
                  <Star
                    className={`w-9 h-9 ${
                      star <= rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-white'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="feedback-message" className="block text-lg font-medium text-gray-800 mb-2">
              Your feedback
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              className="w-full bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none p-4 resize-none shadow-sm"
              required
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/50 hover:bg-white/70 border border-white/30 text-gray-800 font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Send Feedback
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
