import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [isDark]);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border hover:border-accent/50 transition-colors duration-300 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-accent" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-accent" />
        </motion.div>
      </div>
    </motion.button>
  );
}
