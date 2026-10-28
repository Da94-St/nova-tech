import Logo from '../../src/Logo/leaf.png';
import {
  AlertCircle, CheckCircle, CreditCard, Eye, EyeOff, Headphones,
  Lock, LogIn, Mail, Shield, Smartphone, Star, User, UserPlus, Zap
} from 'lucide-react';
import { Facebook, Github } from '../components/BrandIcons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../lib/auth-client'; // Import Better Auth client

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', agreeToTerms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Full name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      // Real Better Auth Email/Password logic
      if (isLogin) {
        const { error } = await signIn.email({ email: formData.email, password: formData.password });
        if (error) throw new Error(error.message);
        setSuccessMessage('Successfully signed in! Redirecting...');
      } else {
        const { error } = await signIn.email({ email: formData.email, password: formData.password, name: formData.name, callbackURL: '/' });
        if (error) throw new Error(error.message);
        setSuccessMessage('Account created successfully! Welcome to Nova.Tech');
      }
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch (error: any) {
      setErrors({ submit: error.message || 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Real Better Auth Social Login
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      await signIn.social({
        provider: provider,
        callbackURL: '/', // Redirects here after successful login
      });
    } catch (error: any) {
      alert(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 px-4 pb-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[90vw] mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
            <p className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">Join</p>
            <div className="relative z-20">
              <span className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text">Nova.Tech</span>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto px-2">
            Join the future of technology. Access exclusive products, personalized recommendations, and premium support.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-center">
          
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Star className="w-9 h-9 text-amber-400" /> Why Join Nova.Tech?
              </h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: <Zap className="w-7 h-7 text-orange-500" />, title: 'Early Access', desc: 'Be the first to get new tech releases and limited editions' },
                  { icon: <Shield className="w-7 h-7 text-green-400" />, title: 'Secure Shopping', desc: 'Military-grade encryption and fraud protection' },
                  { icon: <CreditCard className="w-7 h-7 text-blue-400" />, title: 'Flexible Payments', desc: 'Multiple payment options including crypto' },
                  { icon: <Headphones className="w-7 h-7 text-purple-400" />, title: '24/7 Priority Support', desc: 'Dedicated support team for members' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/50">
                    <div className="w-12 h-12 rounded-lg bg-gray-900/50 flex items-center justify-center flex-shrink-0">{feature.icon}</div>
                    <div><h3 className="text-xl font-semibold text-white mb-1">{feature.title}</h3><p className="text-gray-400">{feature.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex mb-8 bg-gray-900/50 rounded-2xl p-1">
                <button onClick={() => setIsLogin(true)} className={`flex-1 py-4 text-center text-lg font-semibold rounded-xl transition-all duration-300 ${isLogin ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                  <div className="flex items-center justify-center gap-2"><LogIn className="w-7 h-7" /> Sign In</div>
                </button>
                <button onClick={() => setIsLogin(false)} className={`flex-1 py-4 text-center text-lg font-semibold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                  <div className="flex items-center justify-center gap-2"><UserPlus className="w-7 h-7" /> Sign Up</div>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white focus:ring-2 focus:ring-orange-500 placeholder-gray-500`} placeholder="John Smith" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:ring-2 focus:ring-orange-500 placeholder-gray-500`} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-900/50 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:ring-2 focus:ring-orange-500 placeholder-gray-500`} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {errors.submit && <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4"><p className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="w-6 h-6" /> {errors.submit}</p></div>}
                {successMessage && <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4"><p className="text-green-400 text-sm flex items-center gap-2"><CheckCircle className="w-6 h-6" /> {successMessage}</p></div>}

                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In to Your Account' : 'Create Nova.Tech Account')}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
                  <div className="relative flex justify-center text-sm"><span className="px-4 bg-gray-900 text-gray-500">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { provider: 'google', icon: <Mail className="w-6 h-6" />, bg: 'from-red-500 to-red-700' },
                    { provider: 'facebook', icon: <Facebook className="w-6 h-6" />, bg: 'from-blue-600 to-blue-800' },
                    { provider: 'github', icon: <Github className="w-6 h-6" />, bg: 'from-gray-700 to-gray-900' },
                  ].map((social) => (
                    <button key={social.provider} type="button" onClick={() => handleSocialLogin(social.provider as any)} className={`flex items-center justify-center gap-2 py-4 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-br ${social.bg} border border-white/20 shadow-lg`}>
                      {social.icon} <span className="text-sm font-semibold hidden sm:inline">{social.provider.charAt(0).toUpperCase() + social.provider.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
