import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Phone, Menu, X } from 'lucide-react';
import { RocketLogo } from './RocketLogo';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onBookClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string, hash?: string) => {
    setIsMobileMenuOpen(false);
    if (hash) {
      navigate(`${path}${hash}`);
      // If we are already on the page, the hash change might not trigger a scroll if it's the same hash
      // But typically react-router handles this, or our page useEffect will.
      // If we are on the same page and same hash, we might need to force scroll, but let's rely on the pages' useEffect for now.
      if (location.pathname === path && location.hash === hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="flex flex-col border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors duration-300">
            <RocketLogo className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-wider font-mono-tech text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
              ROCKET_RESPONDER<span className="text-accent-blue">.AI</span>
            </h1>
            <span className="text-[10px] text-zinc-500 font-mono-tech uppercase tracking-widest hidden sm:inline-block">
              Voice Automation Systems
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <button onClick={() => handleNavClick('/', '#features')} className="hover:text-accent-blue transition-colors">Features</button>
          <button onClick={() => handleNavClick('/', '#how-it-works')} className="hover:text-accent-blue transition-colors">How It Works</button>
          <button onClick={() => handleNavClick('/pricing', '#demo')} className="hover:text-accent-blue transition-colors">Live Demo</button>
          <button onClick={() => handleNavClick('/pricing')} className="hover:text-accent-blue transition-colors">Pricing</button>
          <button onClick={() => handleNavClick('/pricing', '#comparison')} className="hover:text-accent-blue transition-colors">Comparison</button>
          <button onClick={() => handleNavClick('/pricing', '#faq')} className="hover:text-accent-blue transition-colors">FAQ</button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onBookClick}
            className="flex items-center gap-2 bg-accent-blue hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-sm transition-all shadow-lg shadow-blue-500/20"
          >
            <Phone className="w-3 h-3" />
            <span>Book Consult</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-lg font-medium text-zinc-600 dark:text-zinc-400">
            <button onClick={() => handleNavClick('/', '#features')} className="text-left hover:text-accent-blue transition-colors">Features</button>
            <button onClick={() => handleNavClick('/', '#how-it-works')} className="text-left hover:text-accent-blue transition-colors">How It Works</button>
            <button onClick={() => handleNavClick('/pricing', '#demo')} className="text-left hover:text-accent-blue transition-colors">Live Demo</button>
            <button onClick={() => handleNavClick('/pricing')} className="text-left hover:text-accent-blue transition-colors">Pricing</button>
            <button onClick={() => handleNavClick('/pricing', '#comparison')} className="text-left hover:text-accent-blue transition-colors">Comparison</button>
            <button onClick={() => handleNavClick('/pricing', '#faq')} className="text-left hover:text-accent-blue transition-colors">FAQ</button>
          </nav>
          <button
            onClick={() => { onBookClick(); setIsMobileMenuOpen(false); }}
            className="flex items-center justify-center gap-2 bg-accent-blue hover:bg-blue-600 text-white text-sm font-bold tracking-wider uppercase px-4 py-3 rounded-sm transition-all shadow-lg shadow-blue-500/20 w-full"
          >
            <Phone className="w-4 h-4" />
            <span>Book Consult</span>
          </button>
        </div>
      )}
    </header>
  );
};