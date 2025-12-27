import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface BookOpenTransitionProps {
  children: ReactNode;
}

export function BookOpenTransition({ children }: BookOpenTransitionProps) {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    // Trigger book animation only when navigating TO the library from home
    if (location.pathname === '/library' && previousPath === '/') {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1200);
      return () => clearTimeout(timer);
    }
    setPreviousPath(location.pathname);
  }, [location.pathname, previousPath]);

  return (
    <>
      {/* Book Opening Animation Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
            
            {/* Left Page */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1/2 origin-right"
              style={{
                background: 'linear-gradient(to left, hsl(var(--secondary) / 0.2), hsl(var(--muted)))',
                borderRight: '4px solid hsl(var(--secondary) / 0.5)',
                boxShadow: 'inset -30px 0 60px hsl(var(--primary) / 0.1)',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -120 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2 
              }}
            >
              {/* Page Texture Lines */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-px bg-foreground/30" 
                    style={{ marginTop: `${12 + i * 24}px` }}
                  />
                ))}
              </div>
              
              {/* Potter Logo on Page */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20">📖</span>
              </div>
            </motion.div>

            {/* Right Page */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-1/2 origin-left"
              style={{
                background: 'linear-gradient(to right, hsl(var(--secondary) / 0.2), hsl(var(--muted)))',
                borderLeft: '4px solid hsl(var(--secondary) / 0.5)',
                boxShadow: 'inset 30px 0 60px hsl(var(--primary) / 0.1)',
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 120 }}
              transition={{ 
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2 
              }}
            >
              {/* Page Texture Lines */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-px bg-foreground/30" 
                    style={{ marginTop: `${12 + i * 24}px` }}
                  />
                ))}
              </div>
              
              {/* Welcome Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  className="text-6xl font-cinzel text-secondary opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.1 }}
                >
                  📚
                </motion.span>
              </div>
            </motion.div>

            {/* Center Spine */}
            <motion.div
              className="absolute top-0 bottom-0 w-2 bg-secondary/60"
              style={{ left: 'calc(50% - 4px)' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />

            {/* Magical Sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-secondary"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  scale: 0,
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * 600,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.3 + Math.random() * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with Page Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
