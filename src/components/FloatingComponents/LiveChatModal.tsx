import { motion } from 'framer-motion';
import { Bot, Send, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface LiveChatModalProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

function LiveChatModal({ onClose }: LiveChatModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. A support agent will be with you shortly.',
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Light Glass Container */}
      <div className="relative w-full max-w-md mx-4 h-[500px] flex flex-col bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-slide-up text-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/10">
          <h2 className="text-2xl font-bold text-gray-900">Live Support</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
            aria-label="Close chat"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'agent' && (
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-tr-sm'
                    : 'bg-white/60 border border-white/40 text-gray-800 rounded-tl-sm'
                }`}
              >
                {/* Changed text color for agent messages so it's readable against light glass */}
                <p className="text-md">{msg.text}</p>
              </div>
              
              {msg.sender === 'user' && (
                <div className="w-10 h-10 bg-white/50 border border-white/30 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="w-6 h-6 text-gray-700" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/60 border border-white/40 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/20 bg-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none px-4 py-2 shadow-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LiveChatModal;
