import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Mail, ArrowUpRight, Github, Linkedin, Copy, Check, MapPin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const email = 'vaibhavbhalla6002@gmail.com';
  const linkedinUrl = 'https://linkedin.com/in/vaibhav-bhalla-543765320';
  const githubUrl = 'https://github.com/vaibhavbhalla6002-hash';

  const headlineWords = ["LET'S", 'BUILD', 'SOMETHING.'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Bookend Headline Reveal Animation
      tl.fromTo(
        titleWordsRef.current,
        { y: 100, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power3.out',
        }
      ).fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-dark py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-between border-t border-dark-border/40 overflow-hidden"
    >
      {/* Closing Mesh Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-accent/15 via-blue-600/10 to-transparent rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest mb-8">
          <span className="w-8 h-[1px] bg-accent" />
          <span>05 // CURTAIN CALL &amp; CONTACT</span>
        </div>

        {/* Big Bookend Display Headline */}
        <div className="py-4 mb-12">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-[0.88] tracking-tight uppercase select-none flex flex-wrap gap-x-6 lg:gap-x-10 overflow-hidden py-2">
            {headlineWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                ref={(el) => {
                  if (el && !titleWordsRef.current.includes(el)) {
                    titleWordsRef.current[wordIndex] = el;
                  }
                }}
                className={`inline-block transform-gpu ${
                  wordIndex === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-accent' : 'text-white'
                }`}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Contact Links & Action Area */}
        <div ref={contentRef} className="space-y-12 max-w-4xl">
          {/* Primary Email CTA Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-4 bg-accent text-dark font-display font-extrabold text-lg md:text-2xl px-8 py-5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.3)]"
            >
              <Mail className="w-6 h-6" />
              <span>{email}</span>
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-dark-card border border-dark-border text-surface-muted hover:text-white hover:border-accent/50 px-5 py-5 rounded-full font-mono text-xs uppercase tracking-wider transition-all"
              title="Copy Email Address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-accent" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links List with Underline Draw Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-dark-border/60">
            <div>
              <span className="font-mono text-xs text-surface-muted uppercase tracking-widest block mb-4">
                SOCIAL NETWORKS
              </span>

              <div className="flex flex-col space-y-4">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-white hover:text-accent transition-colors w-max"
                >
                  <Linkedin className="w-6 h-6 text-accent" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
                </a>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 text-2xl md:text-3xl font-display font-bold text-white hover:text-accent transition-colors w-max"
                >
                  <Github className="w-6 h-6 text-accent" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-surface-muted uppercase tracking-widest block mb-4">
                CURRENT BASE
              </span>
              <div className="flex items-center gap-3 text-xl md:text-2xl font-display font-semibold text-white">
                <MapPin className="w-6 h-6 text-accent" />
                <span>Delhi, India</span>
              </div>
              <p className="text-surface-muted text-sm font-mono mt-2">
                UTC +05:30 // Available for remote &amp; full-time builds
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-20 border-t border-dark-border/60 mt-20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-surface-muted">
          <div>
            &copy; {new Date().getFullYear()} VAIBHAV BHALLA. ALL RIGHTS RESERVED.
          </div>
          <div>
            ENGINEERED WITH VITE + REACT + GSAP + LENIS
          </div>
        </div>
      </div>
    </section>
  );
};
