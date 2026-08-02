import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Building2, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const experiences: ExperienceItem[] = [
    {
      id: '01',
      role: 'Software Engineering Intern',
      company: 'Orient Electric',
      location: 'India',
      period: '2026 — Present',
      isCurrent: true,
      type: 'Internship',
      description:
        'Currently contributing as a Software Engineering Intern at Orient Electric. Working on engineering robust, high-performance software modules, modern web interfaces, and backend systems to streamline digital operations.',
      highlights: [
        'Developing and maintaining full-stack software solutions with modern web frameworks.',
        'Collaborating with engineering teams to optimize system efficiency, codebase maintainability, and API integration.',
        'Building responsive, scalable web applications focusing on performance and seamless user experience.',
      ],
      skills: ['Software Engineering', 'Full-Stack Development', 'React.js', 'Node.js', 'REST APIs', 'System Architecture'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="bg-dark py-28 px-6 md:px-16 lg:px-24 border-t border-dark-border/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest mb-4">
          <span className="w-8 h-[1px] bg-accent" />
          <span>02 // CAREER PATH</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight">
              Work Experience
            </h2>
            <p className="text-surface-muted text-base max-w-xl mt-3">
              Professional software engineering roles, industry experience, and corporate contributions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-4 py-2 rounded-full w-fit">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>CURRENTLY BUILDING AT ORIENT ELECTRIC</span>
          </div>
        </div>

        {/* Experience Cards Stream */}
        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              ref={(el) => {
                if (el && !cardRefs.current.includes(el)) {
                  cardRefs.current[idx] = el;
                }
              }}
              className="bg-dark-card border border-dark-border rounded-3xl p-8 md:p-12 relative group hover:border-accent/40 transition-all duration-300 shadow-2xl overflow-hidden"
            >
              {/* Glowing background accent */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all pointer-events-none" />

              {/* Card Header: Role & Status */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-dark-border/60">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      {exp.type}
                    </span>
                    {exp.isCurrent && (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        CURRENT ROLE
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-surface-muted text-sm font-medium pt-1">
                    <div className="flex items-center gap-1.5 text-white/90 font-semibold">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span>{exp.company}</span>
                    </div>
                    <span className="text-surface-dim">•</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-surface-muted" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 font-mono text-sm text-surface-muted bg-dark/80 border border-dark-border px-4 py-2.5 rounded-2xl w-fit self-start lg:self-center">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Card Body: Description & Highlights */}
              <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-surface-muted text-base md:text-lg leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-surface-muted">Key Focus &amp; Responsibilities</h4>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-white/90 text-sm md:text-base leading-snug">
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech & Skills Column */}
                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-dark-border/60 pt-6 lg:pt-0 lg:pl-8">
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-surface-muted">Technologies &amp; Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-xs text-white/90 bg-dark/90 border border-dark-border hover:border-accent/40 px-3.5 py-1.5 rounded-xl transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-dark-border/40 flex items-center justify-between font-mono text-xs text-surface-muted">
                    <span>STATUS: ACTIVE INTERNSHIP</span>
                    <span className="text-accent font-bold">ORIENT ELECTRIC</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
