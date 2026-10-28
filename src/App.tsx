import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import TranslationHelper from './components/TranslationHelper/TranslationHelper';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToasterProvider } from './contexts/ToasterContext';
import { prefetchNews } from './services/newsService';

import FlipCardsPage from './components/FlipCardsPage';
import FloatingComponents from './components/FloatingComponents/FloatingComponents';
import GalleryPage from './components/GalleryPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';

import ScrollToTopButton from './components/ScrollToTopButton';

function AppContent() {
  const location = useLocation();
  
  const fullBannerPages = ['/', '/about', '/contact', '/services', '/blog', '/products', '/cart', '/checkout', '/flip-cards', '/gallery', '/auth', '/faq'];
  const hasFullBanner = fullBannerPages.includes(location.pathname) || 
                       location.pathname.startsWith('/products/') || 
                       location.pathname.startsWith('/blog/');

  return (
    <div className={`min-h-screen ${hasFullBanner ? 'bg-transparent' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      <Navbar />
      <main className={hasFullBanner ? '' : 'pt-16'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/flip-cards" element={<FlipCardsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>

      <ScrollToTopButton />
      <FloatingComponents />
      <TranslationHelper />
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    prefetchNews();
  }, []);

  return (
    <AuthProvider>
      <ToasterProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </CartProvider>
      </ToasterProvider>
    </AuthProvider>
  );
}

export default App;