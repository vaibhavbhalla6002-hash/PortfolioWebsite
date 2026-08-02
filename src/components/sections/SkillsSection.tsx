import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Layout, Server, Database, Shield, Cloud, Cpu } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  skills: { name: string; highlight?: boolean }[];
}

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const categories: SkillCategory[] = [
    {
      id: '01',
      name: 'Frontend',
      icon: Layout,
      skills: [
        { name: 'React.js', highlight: true },
        { name: 'JavaScript' },
        { name: 'Tailwind CSS', highlight: true },
        { name: 'EJS' },
      ],
    },
    {
      id: '02',
      name: 'Backend',
      icon: Server,
      skills: [
        { name: 'Node.js', highlight: true },
        { name: 'Express.js', highlight: true },
      ],
    },
    {
      id: '03',
      name: 'Databases',
      icon: Database,
      skills: [
        { name: 'MongoDB', highlight: true },
        { name: 'PostgreSQL' },
        { name: 'Prisma' },
      ],
    },
    {
      id: '04',
      name: 'Auth & Security',
      icon: Shield,
      skills: [
        { name: 'JWT', highlight: true },
        { name: 'bcrypt' },
        { name: 'Session Management' },
      ],
    },
    {
      id: '05',
      name: 'Cloud & Tools',
      icon: Cloud,
      skills: [
        { name: 'Firebase' },
        { name: 'Git / GitHub', highlight: true },
      ],
    },
    {
      id: '06',
      name: 'Other & Specialized',
      icon: Cpu,
      skills: [
        { name: 'OCR Integration', highlight: true },
        { name: 'AI API Integration', highlight: true },
        { name: 'Blockchain (SAAKSHI)' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const header = card.querySelector('.skill-header');
        const tags = card.querySelectorAll('.skill-tag');

        // ScrollTrigger entrance animation for each skill card
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          header,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          tags,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: 'back.out(1.4)',
          },
          '-=0.3'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="bg-dark py-32 px-6 md:px-16 lg:px-24 border-t border-dark-border/40">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest mb-4">
          <span className="w-8 h-[1px] bg-accent" />
          <span>05 // TECHNICAL MATRIX</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight">
            Skills &amp; Capabilities
          </h2>
          <p className="text-surface-muted text-base max-w-md">
            Technologies and architectural tools used to construct scalable full-stack software.
          </p>
        </div>

        {/* 6-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                ref={(el) => {
                  if (el && !cardRefs.current.includes(el)) {
                    cardRefs.current[idx] = el;
                  }
                }}
                className="bg-dark-card border border-dark-border rounded-3xl p-8 flex flex-col justify-between hover:border-accent/40 transition-all duration-300 relative group shadow-xl"
              >
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all pointer-events-none" />

                <div className="skill-header">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border/60">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-xl text-accent">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-white tracking-tight">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-accent">{cat.id}</span>
                  </div>
                </div>

                {/* Staggered Skill Tags Cloud */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`skill-tag font-mono text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-default flex items-center gap-2 ${
                        skill.highlight
                          ? 'bg-accent/10 border-accent/30 text-white font-medium hover:border-accent hover:bg-accent/20'
                          : 'bg-dark/80 border-dark-border text-surface-muted hover:text-white hover:border-surface-muted'
                      }`}
                    >
                      {skill.highlight && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
