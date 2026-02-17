import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { RocketLogo } from './components/RocketLogo';
import { Mail } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { TapedFooter } from './components/ui/footer-taped-design';

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

      <TapedFooter />
    </div>
  );
}