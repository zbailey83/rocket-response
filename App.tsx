import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { RocketLogo } from './components/RocketLogo';
import { Mail } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';

// Wrapper component to provide navigation capability to Header inside Router context
// But wait, Header is inside Router in the main App return, so it works.

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleBookConsult = () => {
    window.open('https://calendly.com/zbailey83/30min', '_blank');
  };

  // We need a wrapper to pass useNavigate to pages if they still need it,
  // OR pages can just use useNavigate() hook.
  // The props in Page components expected onNavigate.
  // Let's modify the Page components' usage in the Route to pass a wrapper function,
  // OR (better) update the Page components to use the hook.
  // I updated Page components to accept `onNavigate`. 
  // I will create a small wrapper to inject the navigate function.

  const RouteWithProps = ({ Component, ...props }: any) => {
    const navigate = useNavigate();
    return <Component {...props} onNavigate={(path: string) => navigate(path)} />;
  };

  const scrollToSection = (id: string) => {
    // This is for footer links mostly
    // If we are on the wrong page, we need to navigate.
    // But footer is outside Routes? No, footer is in App.tsx.
    // App.tsx doesn't have useLocation/useNavigate unless it's inside Router.
    // So layout should be inside Router.
  };

  return (
    <Router>
      <Layout
        theme={theme}
        toggleTheme={toggleTheme}
        onBookClick={handleBookConsult}
      />
    </Router>
  );
}

const Layout = ({ theme, toggleTheme, onBookClick }: any) => {
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const scrollToId = (id: string, path: string = '/') => {
    navigate(`${path}#${id}`);
    // The pages handle the scrolling via useEffect on location.hash
  };

  return (
    <div className="min-h-screen flex flex-col technical-grid relative text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-accent-blue/30">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onBookClick={onBookClick}
      />

      <Routes>
        <Route path="/" element={<HomePage theme={theme} onBookClick={onBookClick} onNavigate={onNavigate} />} />
        <Route path="/pricing" element={<PricingPage onBookClick={onBookClick} onNavigate={onNavigate} />} />
      </Routes>

      <footer className="py-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <RocketLogo className="w-6 h-6" />
              <span className="font-bold tracking-wider text-lg">ROCKET_RESPONDER</span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              AI-Powered Agents for Local Service Businesses. Stop losing revenue to missed calls and start booking appointments 24/7.
            </p>
            <div className="flex items-center gap-4 text-zinc-500">
              <span className="hover:text-accent-blue cursor-pointer">Twitter</span>
              <span className="hover:text-accent-blue cursor-pointer">LinkedIn</span>
              <span className="hover:text-accent-blue cursor-pointer">Facebook</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-zinc-400">Product</h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="hover:text-accent-blue cursor-pointer" onClick={() => scrollToId('features')}>Features</li>
              <li className="hover:text-accent-blue cursor-pointer" onClick={() => scrollToId('how-it-works')}>How It Works</li>
              <li className="hover:text-accent-blue cursor-pointer" onClick={() => scrollToId('demo', '/pricing')}>Live Demo</li>
              <li className="hover:text-accent-blue cursor-pointer" onClick={() => onNavigate('/pricing')}>Pricing</li>
              <li className="hover:text-accent-blue cursor-pointer" onClick={() => scrollToId('roi-calculator', '/pricing')}>ROI Calculator</li>
            </ul>
          </div>



          <div>
            <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-zinc-400">Contact</h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">

              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@rocketresponseai.com</li>
              <li>Headquartered in Austin, TX</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 font-mono-tech text-xs">
          © 2025 ROCKET RESPONSE AI. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}