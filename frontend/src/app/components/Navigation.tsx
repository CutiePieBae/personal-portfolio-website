import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (roughly 80% of viewport height)
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setIsVisible(scrollY > threshold);

      // Determine active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1 px-2 py-2 bg-card/80 backdrop-blur-xl border border-border rounded-full shadow-[var(--card-shadow)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-full"
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    activeSection === item.id
                      ? 'text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

