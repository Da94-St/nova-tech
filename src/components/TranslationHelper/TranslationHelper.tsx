// components/TranslationHelper/TranslationHelper.tsx
import { Globe, MousePointer } from 'lucide-react';
import { useEffect, useState } from 'react';

function TranslationHelper() {
  const [showHelper, setShowHelper] = useState(false);
  const [userLanguage, setUserLanguage] = useState('English');

  useEffect(() => {
    // Get browser language
    const lang = navigator.language || 'en';
    
    // Get language name
    try {
      const displayName = new Intl.DisplayNames([lang], { type: 'language' }).of(lang);
      const timer = setTimeout(() => setUserLanguage(displayName || lang), 10); return () => clearTimeout(timer);
    } catch {
      const timer = setTimeout(() => setUserLanguage(lang), 10); return () => clearTimeout(timer);
    }
    
    // Show helper if not English
    const isEnglish = lang.startsWith('en');
    const hasDismissed = localStorage.getItem('translationHelperDismissed');
    
    if (!isEnglish && !hasDismissed) {
      setTimeout(() => setShowHelper(true), 3000);
    }
  }, []);

  const handleDismiss = () => {
    setShowHelper(false);
    localStorage.setItem('translationHelperDismissed', 'true');
  };

  if (!showHelper) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-2xl p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <Globe className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold mb-1">🌐 Translation Available</h3>
            <p className="text-sm mb-2">
              Your browser is set to <span className="font-bold">{userLanguage}</span>
            </p>
            
            <div className="flex items-center gap-2 text-xs bg-white/20 p-2 rounded mb-3">
              <MousePointer className="w-4 h-4" />
              <span>Right-click anywhere → "Translate to {userLanguage}"</span>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={handleDismiss}
                className="text-sm hover:underline"
              >
                Don't show again
              </button>
              <button
                onClick={() => {
                  alert(`To translate:\n1. Right-click anywhere\n2. Select "Translate to ${userLanguage}"\n3. Or use translation icon in address bar`);
                }}
                className="text-sm bg-white text-blue-600 px-3 py-1 rounded font-bold"
              >
                Show Instructions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranslationHelper;
