'use client';
import { useState } from 'react';
import useCalculatorStore from '@/store/calculatorStore';
import { Save, FolderOpen, Trash2, CheckCircle } from 'lucide-react';

const Header = () => {
  const { clearTemplate } = useCalculatorStore();
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    // The zustand persist middleware handles saving automatically on state change.
    // This button now just provides user feedback.
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleLoad = () => {
    // Zustand persist middleware loads automatically on initialization.
    // This is more of a "reset to saved state" button if needed, or can be removed.
    window.location.reload(); // Simple way to force re-initialization from storage
  };

  const handleClear = () => {
      if (confirm('Are you sure you want to clear the entire calculator? This cannot be undone.')) {
          clearTemplate();
      }
  }

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-green-400">🌍 Impact Story Pro</h1>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleLoad} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
          <FolderOpen size={16} /> Load Saved
        </button>
        <button onClick={handleSave} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors w-28 justify-center">
          {showSaved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save</>}
        </button>
        <button onClick={handleClear} className="p-2 text-sm font-medium text-gray-300 bg-red-800/50 rounded-md hover:bg-red-700/60 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;