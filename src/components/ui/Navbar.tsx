import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-6 md:px-12 flex items-center justify-between pointer-events-auto">
      {/* Brand Monogram */}
      <a href="#hero" className="group flex items-center gap-2">
        <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-accent transition-colors">
          VB<span className="text-accent">.</span>
        </span>
      </a>

      {/* Location / Status badge */}
      <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-surface-muted font-medium bg-dark-card/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-dark-border">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        <span>Delhi, IN</span>
        <span className="text-surface-dim">•</span>
        <span className="text-white/80">Available for builds</span>
      </div>

      {/* Minimal nav links */}
      <nav className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-surface-muted">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#projects" className="hover:text-white transition-colors">Work</a>
        <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
      </nav>
    </header>
  );
};
