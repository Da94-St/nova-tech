import { Mail, MapPin, Phone } from 'lucide-react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Tiktok, Discord } from '../BrandIcons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../src/Logo/leaf.png';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative mt-4">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/9e/f7/c9/9ef7c96d9aaa08ffbc05acdf768bdb1d.jpg')", filter: "blur(16px)", opacity: 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-250/70 to-orange-300/70 backdrop-blur-xl z-1" />
      
      <div className="relative z-10 max-w-full mx-auto px-4 py-12">
        
        {/* Changed to XL breakpoint so it stays 1 column on tablets and small laptops */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 text-center xl:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <Link to="/" className="flex flex-col xl:flex-row items-center justify-center xl:justify-start mb-6 group">
              <img src={Logo} alt="Nova.Tech Logo" className="h-12 md:h-14 w-auto mb-2 xl:mb-0" />
              <div className="xl:ml-2">
                <span className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">Nova.Tech</span>
              </div>
            </Link>
            <p className="text-black text-md font-medium mb-6 leading-relaxed drop-shadow-sm text-center xl:text-left max-w-sm">
              Your premier destination for cutting-edge electronics, premium entertainment, and fashion-forward clothing.
            </p>
            
            <div className="flex flex-wrap justify-center xl:justify-start gap-2 w-full">
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1877F2] text-white shadow-md hover:-translate-y-1 transition-transform"><Facebook className="w-6 h-6" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-black text-white shadow-md hover:-translate-y-1 transition-transform"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white shadow-md hover:-translate-y-1 transition-transform"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FF0000] text-white shadow-md hover:-translate-y-1 transition-transform"><Youtube className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0A66C2] text-white shadow-md hover:-translate-y-1 transition-transform"><Linkedin className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-black text-white shadow-md hover:-translate-y-1 transition-transform"><Tiktok className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#5865F2] text-white shadow-md hover:-translate-y-1 transition-transform"><Discord className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <h3 className="text-xl font-bold mb-6 text-black">Quick Links</h3>
            <ul className="space-y-3 flex flex-col items-center xl:items-start">
              <li><Link to="/" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">About</Link></li>
              <li><Link to="/faq" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <h3 className="text-xl font-bold mb-6 text-black">Customer Service</h3>
            <ul className="space-y-3 flex flex-col items-center xl:items-start">
              <li><Link to="/contact" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Contact Support</Link></li>
              <li><a href="#" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-black text-lg font-medium hover:text-orange-600 transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col items-center xl:items-start w-full">
            <h3 className="text-xl font-bold mb-6 text-black">Get in Touch</h3>
            <div className="space-y-4 flex flex-col items-center xl:items-start">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-orange-600" />
                <span className="text-black text-lg font-medium">support@novatech.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-orange-600" />
                <span className="text-black text-lg font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3 text-center xl:text-left">
                <MapPin className="w-6 h-6 text-orange-600 mt-1" />
                <span className="text-black text-lg font-medium">
                  123 Innovation Drive<br />Tech Valley, CA 94025
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Row */}
        <div className="py-6 mt-12 border-t border-orange-400/30 flex flex-col items-center xl:flex-row xl:justify-between gap-6 text-center xl:text-left">
          <div>
            <h3 className="text-xl font-bold text-black mb-1">Stay Updated</h3>
            <p className="text-black font-medium">Subscribe for exclusive offers and latest updates.</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex">
            {isSubscribed ? (
               <div className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-bold text-center">Thanks for subscribing!</div>
            ) : (
              <>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-2 bg-white/80 border border-orange-300 rounded-l-lg focus:outline-none text-black" required />
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-r-lg font-bold hover:opacity-90">Subscribe</button>
              </>
            )}
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 pb-4 xl:pb-6 border-t border-orange-400/30 flex flex-col items-center justify-center xl:flex-row xl:justify-start gap-4">
          <p className="text-black font-medium text-md text-center xl:text-left">© 2026 Nova.Tech. All rights reserved.</p>
          <div className="flex justify-center xl:justify-start gap-4 text-md font-medium text-black">
            <a href="#" className="hover:text-orange-600">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;