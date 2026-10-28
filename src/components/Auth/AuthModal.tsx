import { Lock, Mail, User, X } from 'lucide-react';
import { Facebook, Github } from '../BrandIcons'; // Fixed import
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Logo from '../../Logo/leaf.png'; // Fixed path

function AuthModal() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setShowAuthModal, signIn, signUp, signInWithSocial } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignIn) {
        await signIn(email, password);
      } else {
        await signUp(email, password, username);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'facebook' | 'github') => {
    setIsLoading(true);
    try {
      await signInWithSocial(provider);
    } catch (error) {
      console.error('Social authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialButtons = [
    { provider: 'facebook' as const, icon: Facebook, label: 'Facebook', bgColor: 'bg-blue-600 hover:bg-blue-700' },
    { provider: 'google' as const, icon: Mail, label: 'Google', bgColor: 'bg-red-500 hover:bg-red-600' },
    { provider: 'github' as const, icon: Github, label: 'GitHub', bgColor: 'bg-gray-800 hover:bg-gray-900' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
      
      <div className="relative bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4 animate-slide-up text-gray-900">
        
        <div className="flex justify-center items-center mb-6">
          <img src={Logo} alt="Nova.Tech Logo" className="h-14 w-auto transition-all duration-300 relative z-10 opacity-90" />
          <div className="relative ml-1 z-20">
            <span className="text-4xl font-black leading-none tracking-tight transition-all duration-300 relative z-30 text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text">
              Nova.Tech
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button onClick={() => setIsSignIn(true)} className={`font-bold text-lg transition-colors duration-200 ${isSignIn ? 'text-orange-600' : 'text-gray-600'}`}>
              {t('auth.signIn')}
            </button>
            <button onClick={() => setIsSignIn(false)} className={`font-bold text-lg transition-colors duration-200 ${!isSignIn ? 'text-orange-600' : 'text-gray-600'}`}>
              {t('auth.signUp')}
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAuthModal(false)} className="p-1.5 rounded-md hover:bg-white/50 transition-colors duration-200 text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('auth.email')} className="w-full pl-12 pr-4 py-3 bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm" required />
          </div>

          {!isSignIn && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={`${t('auth.username')} (${t('common.optional')})`} className="w-full pl-12 pr-4 py-3 bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm" />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.password')} className="w-full pl-12 pr-4 py-3 bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm" required />
          </div>

          {!isSignIn && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t('auth.confirmPassword')} className="w-full pl-12 pr-4 py-3 bg-white/50 text-gray-900 placeholder-gray-500 rounded-xl border border-white/30 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm" required />
            </div>
          )}

          {isSignIn && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                <span className="text-sm font-medium text-gray-800">{t('auth.rememberMe')}</span>
              </label>
              <button type="button" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200">
                {t('auth.forgotPassword')}
              </button>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? t('common.loading') : t(isSignIn ? 'auth.signIn' : 'auth.signUp')}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-white/40 px-4 text-gray-700 font-medium rounded-full">{t(isSignIn ? 'auth.orSignInWith' : 'auth.orSignUpWith')}</span></div>
          </div>
          <div className="mt-4 grid gap-3">
            {socialButtons.map(({ provider, icon: Icon, label, bgColor }) => (
              <button key={provider} onClick={() => handleSocialSignIn(provider)} disabled={isLoading} className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${bgColor}`}>
                <Icon className="w-5 h-5" />
                {t('auth.continueWith')} {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm font-medium text-gray-700">
          {isSignIn ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}{' '}
          <button onClick={() => setIsSignIn(!isSignIn)} className="text-orange-600 hover:text-orange-700 font-bold transition-colors duration-200">
            {t(isSignIn ? 'auth.signUp' : 'auth.signIn')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
