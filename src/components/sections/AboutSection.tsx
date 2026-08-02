import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Terminal, Award, BookOpen, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const narrativeLines = [
    {
      num: '01',
      tag: 'ORIGINS & STACK',
      icon: Terminal,
      content: (
        <>
          A full stack developer based in <span className="text-white font-semibold">Delhi, India</span>, focused on <span className="text-accent font-semibold underline underline-offset-8 decoration-accent/40">MERN (and beyond)</span>.
        </>
      ),
    },
    {
      num: '02',
      tag: 'EDUCATION',
      icon: BookOpen,
      content: (
        <>
          Currently a <span className="text-white font-semibold">3rd year B.Tech student</span> specializing in <span className="text-accent font-semibold">Data Science</span>, expected to graduate <span className="font-mono text-white/90">2028</span>.
        </>
      ),
    },
    {
      num: '03',
      tag: 'RAPID EXECUTION',
      icon: Sparkles,
      content: (
        <>
          Thrives in <span className="text-white font-semibold">hackathons &amp; rapid prototyping</span> — has shipped working products in <span className="text-accent font-semibold">under 48 hours</span>
        </>
      ),
    },
    {
      num: '04',
      tag: 'COMMUNITY & IMPACT',
      icon: Award,
      content: (
        <>
          Currently a <span className="text-white font-semibold">Contributor / Mentee</span> at <span className="text-accent font-semibold">GirlScript Summer of Code 2026 (GSSoC '26)</span>, a national open-source program.
        </>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinnedRef.current) return;

      const lines = lineRefs.current.filter(Boolean);
      if (lines.length === 0) return;

      // Set initial states
      lines.forEach((line, index) => {
        gsap.set(line, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 50,
          scale: index === 0 ? 1 : 0.95,
          filter: index === 0 ? 'blur(0px)' : 'blur(10px)',
          pointerEvents: index === 0 ? 'auto' : 'none',
        });
      });

      // Create pin and scrub sequence timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 3 full viewports of scroll distance
          pin: pinnedRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Animate progress bar fill
      if (progressLineRef.current) {
        tl.to(
          progressLineRef.current,
          {
            scaleY: 1,
            ease: 'none',
          },
          0
        );
      }

      // Step transitions between lines
      const totalSteps = lines.length;
      const stepDuration = 1 / totalSteps;

      lines.forEach((_, i) => {
        if (i < totalSteps - 1) {
          const currentLine = lines[i];
          const nextLine = lines[i + 1];
          const startTime = (i + 1) * stepDuration - 0.08;

          // Outgoing current line
          tl.to(
            currentLine,
            {
              opacity: 0,
              y: -50,
              scale: 0.95,
              filter: 'blur(10px)',
              pointerEvents: 'none',
              duration: 0.2,
              ease: 'power2.inOut',
            },
            startTime
          );

          // Incoming next line
          tl.to(
            nextLine,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              pointerEvents: 'auto',
              duration: 0.2,
              ease: 'power2.out',
            },
            startTime + 0.08
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[400vh] bg-dark bg-grid-pattern border-t border-dark-border/40"
    >
      {/* Pinned Screen Container */}
      <div
        ref={pinnedRef}
        className="w-full h-screen relative flex flex-col justify-between px-6 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Section Header Indicator */}
        <div className="flex items-center justify-between border-b border-dark-border/60 pb-6 z-20">
          <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-accent" />
            <span>01 // NARRATIVE SEQUENCE</span>
          </div>

          <div className="text-xs font-mono text-surface-muted uppercase tracking-widest">
            [ SCROLL TO CONTINUE STORY ]
          </div>
        </div>

        {/* Center Narrative Screen - Positioned lines */}
        <div className="relative my-auto w-full min-h-[320px] md:min-h-[400px] flex items-center justify-center">
          {narrativeLines.map((line, idx) => {
            const IconComp = line.icon;
            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el && !lineRefs.current.includes(el)) {
                    lineRefs.current[idx] = el;
                  }
                }}
                className="absolute inset-0 flex flex-col justify-center max-w-5xl mx-auto transform-gpu"
              >
                {/* Meta Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-xl text-accent">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs md:text-sm text-accent tracking-widest uppercase font-semibold">
                    {line.num} — {line.tag}
                  </span>
                </div>

                {/* Big Display Narrative Text */}
                <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-surface-muted leading-[1.25] tracking-tight">
                  {line.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Story Timeline Progress Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-dark-border/60 z-20">
          <div className="flex items-center gap-6">
            <div className="relative w-32 md:w-48 h-[2px] bg-dark-border overflow-hidden rounded-full">
              <div
                ref={progressLineRef}
                className="absolute inset-0 bg-accent origin-left transform scale-x-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
