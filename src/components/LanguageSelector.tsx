import React from 'react';
export default function LanguageSelector({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-2 w-32 border border-gray-100 relative z-50">
      <button onClick={onClose} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-800">English</button>
      <button onClick={onClose} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-800">German</button>
      <button onClick={onClose} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-800">Arabic</button>
    </div>
  );
}
