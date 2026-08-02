import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Thin Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-dark-border z-[60] pointer-events-none">
        <div
          className="h-full bg-accent transition-all duration-75 ease-out shadow-[0_0_10px_#00f0ff]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom Percentage Counter (Desktop) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 bg-dark-card/80 backdrop-blur-md border border-dark-border px-3 py-1.5 rounded-full text-xs font-mono text-surface-muted pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-white font-semibold">{Math.round(scrollProgress)}%</span>
      </div>
    </>
  );
};
