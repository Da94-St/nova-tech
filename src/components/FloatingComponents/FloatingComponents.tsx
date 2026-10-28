import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import LiveChatModal from './LiveChatModal';

function FloatingComponents() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
        {/* Feedback Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFeedback(true)}
          className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group transition-all"
          aria-label="Open feedback form"
        >
          <Send className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(true)}
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group transition-all relative"
          aria-label="Open live chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      </div>

      {/* Modals */}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      {showChat && <LiveChatModal onClose={() => setShowChat(false)} />}
    </>
  );
}

export default FloatingComponents;
