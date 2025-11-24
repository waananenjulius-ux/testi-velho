import React, { useContext } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LanguageContext } from '../App';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBack, onBack, title }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);

  const displayTitle = title === "Velho" ? "VELHO SERVICE" : title?.toUpperCase();

  const toggleLanguage = () => {
      setLanguage(language === 'fi' ? 'en' : 'fi');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black transition-all"
            style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))', height: 'auto' }}>
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 pb-4 pt-1">
        <div className="flex items-center gap-6">
          {showBack && (
            <button 
              onClick={onBack}
              className="flex items-center justify-center text-black hover:bg-lime-300 transition-colors w-10 h-10 border-2 border-black"
            >
              <ArrowLeft size={24} strokeWidth={2} />
            </button>
          )}
          
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase">
            {displayTitle}
          </h1>
        </div>

        <div className="flex items-center gap-6">
            {/* Language Toggle - Text Only */}
            <button 
                onClick={toggleLanguage}
                className="text-sm font-bold text-black uppercase tracking-widest hover-underline-animation"
            >
                {language === 'fi' ? 'FI / EN' : 'EN / FI'}
            </button>
        </div>
      </div>
    </header>
  );
};