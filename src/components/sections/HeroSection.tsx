import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ArrowDown, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const hookRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Loading Entrance Animation Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 },
      });

      gsap.set([locationRef.current, roleRef.current, hookRef.current, scrollCueRef.current], {
        opacity: 0,
        y: 25,
      });

      gsap.set(titleWordsRef.current, {
        y: 120,
        opacity: 0,
        rotateX: -20,
      });

      tl.to(locationRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .to(
        roleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        '-=0.5'
      )
      .to(
        titleWordsRef.current,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        hookRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        '-=0.5'
      )
      .to(
        scrollCueRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.4'
      );

      // 2. Responsive Scroll Handoff (Desktop pinned scrub vs Mobile fade)
      const isMobile = window.innerWidth < 768;

      if (containerRef.current && contentRef.current) {
        if (!isMobile) {
          gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=80%',
              scrub: 1,
              pin: contentRef.current,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          })
          .to(contentRef.current, {
            scale: 0.85,
            opacity: 0.1,
            y: -100,
            filter: 'blur(8px)',
            ease: 'power2.inOut',
          })
          .to(
            scrollCueRef.current,
            {
              opacity: 0,
              y: 30,
              ease: 'power1.out',
            },
            0
          );
        } else {
          // Mobile lightweight fade without pinning
          gsap.to(contentRef.current, {
            opacity: 0.2,
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nameWords = ['VAIBHAV', 'BHALLA'];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen md:min-h-[140vh] bg-dark bg-grid-pattern overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Main Hero Viewport Content Container */}
      <div
        ref={contentRef}
        className="w-full h-screen px-6 md:px-16 lg:px-24 flex flex-col justify-between py-24 md:py-28 max-w-7xl mx-auto z-10"
      >
        {/* Top Meta Line: Location & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            ref={locationRef}
            className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-widest text-surface-muted uppercase"
          >
            <MapPin className="w-4 h-4 text-accent" />
            <span>Delhi, India</span>
          </div>

          <div
            ref={roleRef}
            className="text-xs md:text-sm font-mono tracking-wider text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full uppercase"
          >
            Full Stack Developer — MERN &amp; Beyond
          </div>
        </div>

        {/* Center Title Card Area */}
        <div className="my-auto py-8">
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] leading-[0.88] tracking-tight uppercase select-none flex flex-wrap gap-x-6 lg:gap-x-10 overflow-hidden py-2">
            {nameWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                ref={(el) => {
                  if (el && !titleWordsRef.current.includes(el)) {
                    titleWordsRef.current[wordIndex] = el;
                  }
                }}
                className={`inline-block transform-gpu ${
                  wordIndex === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-accent' : 'text-white'
                }`}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* One-Line Hook */}
          <div className="mt-8 md:mt-12 max-w-2xl">
            <p
              ref={hookRef}
              className="text-lg md:text-2xl text-surface-muted font-light leading-relaxed tracking-wide"
            >
              Building <span className="text-white font-normal">scalable, secure, real-world products</span> — from hackathons to startups.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="flex items-center justify-between pt-6 border-t border-dark-border/60 text-xs md:text-sm text-surface-muted uppercase tracking-widest"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-white/70">SCROLL TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-2 group cursor-pointer hover:text-accent transition-colors">
            <span className="font-mono">DISCOVER</span>
            <div className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <ArrowDown className="w-4 h-4 text-accent animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
