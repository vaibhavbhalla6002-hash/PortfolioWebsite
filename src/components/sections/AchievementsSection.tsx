import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Trophy, Zap, Code, ShieldCheck, ArrowRight } from 'lucide-react';

interface Achievement {
  id: string;
  event: string;
  venue: string;
  badge: string;
  icon: React.ElementType;
  story: string;
  tags: string[];
}

export const AchievementsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const achievements: Achievement[] = [
    {
      id: '01',
      event: 'Eclipse 6.0 Hackathon',
      venue: 'Thapar University',
      badge: 'TOP 160 / 600+ TEAMS',
      icon: ShieldCheck,
      story:
        'Qualified among top 160 teams from 600+ registrations. Built SAAKSHI, a blockchain-based secure testimony platform with end-to-end encryption and ML-assisted case structuring.',
      tags: ['Blockchain', 'ML Structuring', 'End-to-End Encryption'],
    },
    {
      id: '02',
      event: 'Hack-X-Tract 2026',
      venue: 'MAIT Delhi',
      badge: 'OPEN INNOVATION',
      icon: Trophy,
      story:
        'Built DawaiScan, a health-tech platform with live medicine strip recognition, verification, and nearby pharmacy discovery.',
      tags: ['Health-Tech', 'OCR Recognition', 'Pharmacy Discovery'],
    },
    {
      id: '03',
      event: 'Innerve 2026',
      venue: 'IGDTUW',
      badge: 'FINALS QUALIFIER',
      icon: Zap,
      story:
        'Cleared 2 shortlisting rounds and reached the finals; built and deployed a fully functional zodiac-themed personality web experience in a 1.5-hour sprint.',
      tags: ['1.5h Sprint', 'Live Deployment', 'Rapid UX'],
    },
    {
      id: '04',
      event: 'GSSoC \'26',
      venue: 'GirlScript Summer of Code',
      badge: 'NATIONAL OPEN SOURCE',
      icon: Code,
      story:
        'Selected as Contributor/Mentee at GirlScript Summer of Code, a national open-source program, contributing as a MERN stack developer.',
      tags: ['Open Source', 'MERN Stack', 'National Mentorship'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinnedRef.current || !trackRef.current) return;

      const track = trackRef.current;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: pinnedRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Translate track horizontally along X-axis
      tl.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });

      // Animate progress bar fill
      if (progressLineRef.current) {
        tl.to(
          progressLineRef.current,
          {
            scaleX: 1,
            ease: 'none',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative min-h-[300vh] bg-dark bg-grid-pattern border-t border-dark-border/40"
    >
      {/* Pinned Screen Viewport */}
      <div
        ref={pinnedRef}
        className="w-full h-screen relative flex flex-col justify-between py-16 md:py-20 overflow-hidden"
      >
        {/* Section Header */}
        <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-dark-border/60 pb-6 z-20">
          <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-accent" />
            <span>04 // MILESTONES &amp; HACKATHONS</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-surface-muted uppercase tracking-widest">
            <span>HORIZONTAL SCROLL</span>
            <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
          </div>
        </div>

        {/* Horizontal Card Track Container */}
        <div className="my-auto w-full overflow-hidden pl-6 md:pl-16 lg:pl-24">
          <div
            ref={trackRef}
            className="flex gap-8 md:gap-12 w-max items-center pr-24 py-4"
          >
            {achievements.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-[85vw] sm:w-[460px] md:w-[520px] bg-dark-card border border-dark-border rounded-3xl p-8 md:p-10 flex flex-col justify-between shrink-0 hover:border-accent/50 transition-all duration-300 relative group shadow-2xl"
                >
                  {/* Subtle Glow Background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/15 transition-all pointer-events-none" />

                  {/* Top Card Meta */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-2xl text-accent">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="font-mono text-xs text-surface-muted uppercase tracking-widest block mb-1">
                        {item.venue}
                      </span>
                      <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight group-hover:text-accent transition-colors">
                        {item.event}
                      </h3>
                    </div>

                    <p className="text-surface-muted text-base leading-relaxed mb-8">
                      {item.story}
                    </p>
                  </div>

                  {/* Bottom Tags & Numbering */}
                  <div className="pt-6 border-t border-dark-border/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] text-surface-muted bg-dark/80 border border-dark-border px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-2xl font-black text-white/10 select-none group-hover:text-accent/30 transition-colors">
                      {item.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Scroll Progress Line */}
        <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full flex items-center justify-between z-20 pt-6 border-t border-dark-border/60">
          <div className="relative w-48 md:w-64 h-[2px] bg-dark-border overflow-hidden rounded-full">
            <div
              ref={progressLineRef}
              className="absolute inset-0 bg-accent origin-left transform scale-x-0"
            />
          </div>

          <div className="font-mono text-xs text-surface-muted">
            04 MILESTONES // TIMELINE
          </div>
        </div>
      </div>
    </section>
  );
};
