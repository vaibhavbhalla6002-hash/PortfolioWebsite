import React, { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 8;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to('#page-loader-text', {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: 'power2.in',
      }).to('#page-loader', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.8,
        ease: 'power4.inOut',
      });
    }
  }, [progress, onComplete]);

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[100] bg-[#0b0b0c] flex flex-col items-center justify-center select-none"
    >
      <div id="page-loader-text" className="flex flex-col items-center">
        <div className="font-display font-black text-6xl md:text-8xl text-white tracking-tighter mb-6">
          VB<span className="text-accent animate-pulse">.</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-surface-muted uppercase tracking-widest">
          <span>LOADING EXPERIENCE</span>
          <span className="text-accent font-bold">{Math.min(100, progress)}%</span>
        </div>
      </div>
    </div>
  );
};
