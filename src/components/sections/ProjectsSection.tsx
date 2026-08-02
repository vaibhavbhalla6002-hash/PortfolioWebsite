import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ExternalLink, Github, CheckCircle2, ArrowUpRight, Scan, Sprout, ShoppingBag } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  stack: string[];
  story: string;
  outcomes: string[];
  gradient: string;
  accentGlow: string;
  codeSnippet: string;
}

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);

  const projects: Project[] = [
    {
      id: '01',
      name: 'DawaiScanner',
      category: 'Healthcare & AI OCR Engine',
      icon: Scan,
      stack: ['React.js', 'Node.js', 'OCR', 'AI APIs'],
      story:
        'A medicine-scanning platform that extracts and analyzes medicine details using OCR and AI-powered processing. Built APIs for prescription parsing, medicine info lookup, and safety insights. Focused on accessibility and turning a photo of a medicine strip into structured, useful data in seconds.',
      outcomes: [
        'Instant OCR & AI prescription parsing for medicine safety insights.',
        'High-accessibility UI transforming raw camera photos into structured data.',
        'Robust Node.js API pipeline for fast medicine information lookup.',
      ],
      gradient: 'from-cyan-500/20 via-blue-600/10 to-transparent',
      accentGlow: '#00f0ff',
      codeSnippet: `// DawaiScanner OCR Pipeline
const scanPrescription = async (imageBuffer) => {
  const rawText = await ocrEngine.extract(imageBuffer);
  const parsedData = await aiSafetyEngine.analyze(rawText);
  return { status: 200, medicineInfo: parsedData };
};`,
    },
    {
      id: '02',
      name: 'FarmerDaddy',
      category: 'Agri-Tech Digital Ecosystem',
      icon: Sprout,
      stack: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
      story:
        'A digital platform helping Indian farmers access agricultural resources, services, and market information. Secure authentication and session management, scalable backend for listings and farmer-service interactions. Built to improve accessibility and tech adoption in agriculture.',
      outcomes: [
        'Empowering Indian farmers with centralized resource & market listings.',
        'Secure multi-role authentication & session state management.',
        'Scalable MongoDB schema handling real-time service requests.',
      ],
      gradient: 'from-emerald-500/20 via-teal-600/10 to-transparent',
      accentGlow: '#10b981',
      codeSnippet: `// FarmerDaddy Service Engine
const registerServiceListing = async (farmerId, serviceData) => {
  const listing = await Marketplace.create({ farmerId, ...serviceData });
  await NotificationService.notifyNearby(listing.location);
  return listing;
};`,
    },
    {
      id: '03',
      name: 'Scatch',
      category: 'Full-Stack E-Commerce Platform',
      icon: ShoppingBag,
      stack: ['JavaScript', 'Node.js', 'Authentication Systems'],
      story:
        'A modern e-commerce-style web app emphasizing secure authentication, clean UI workflows, and responsive UX. Session management, protected routes, scalable backend architecture, and modular full-stack practices.',
      outcomes: [
        'End-to-end e-commerce architecture with protected router middleware.',
        'Encrypted token session management & modular authentication.',
        'Optimized responsive checkout workflow engineered for performance.',
      ],
      gradient: 'from-indigo-500/20 via-purple-600/10 to-transparent',
      accentGlow: '#a855f7',
      codeSnippet: `// Scatch Protected Session Router
router.post('/checkout', verifyToken, async (req, res) => {
  const cart = await Cart.findBySession(req.session.id);
  const transaction = await PaymentGateway.process(cart);
  res.json({ success: true, orderId: transaction.id });
});`,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((block) => {
        if (!block) return;

        const visual = block.querySelector('.project-visual');
        const text = block.querySelector('.project-text');

        if (visual && text) {
          // Scroll-scrubbed reveal with parallax speed offset
          gsap.fromTo(
            text,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.8,
              },
            }
          );

          gsap.fromTo(
            visual,
            { y: 140, opacity: 0, scale: 0.92 },
            {
              y: -20,
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                end: 'top 25%',
                scrub: 1.2, // Faster scrub for parallax depth
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-dark py-24 border-t border-dark-border/40">
      {/* Section Sticky Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-16">
        <div className="flex items-center gap-3 text-accent font-mono text-xs md:text-sm uppercase tracking-widest mb-4">
          <span className="w-8 h-[1px] bg-accent" />
          <span>03 // SELECTED WORKS</span>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight">
          Featured Engineering Projects
        </h2>
      </div>

      {/* Case Study Blocks */}
      <div className="space-y-32 md:space-y-48">
        {projects.map((proj, idx) => {
          const IconComp = proj.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={proj.id}
              ref={(el) => {
                if (el && !projectRefs.current.includes(el)) {
                  projectRefs.current[idx] = el;
                }
              }}
              className="min-h-[90vh] flex items-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text Content Column */}
                <div
                  className={`project-text lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                      CASE STUDY {proj.id}
                    </span>
                    <span className="text-surface-muted text-xs font-mono">• {proj.category}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-4">
                    {proj.name}
                  </h3>

                  <p className="text-surface-muted text-base md:text-lg leading-relaxed mb-6">
                    {proj.story}
                  </p>

                  {/* Key Outcomes */}
                  <div className="space-y-3 mb-8">
                    {proj.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-surface-light text-sm md:text-base">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-surface-muted bg-dark-card border border-dark-border px-3 py-1.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      className="group inline-flex items-center gap-2 bg-dark-card border border-dark-border text-white px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all font-mono text-sm font-medium"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    <a
                      href="https://github.com/vaibhavbhalla6002-hash" target="_blank"
                      className="p-3 text-surface-muted hover:text-white transition-colors border border-dark-border rounded-full hover:border-surface-muted"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Abstract Visual / Mockup Column */}
                <div
                  className={`project-visual lg:col-span-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-2xl border border-dark-border bg-dark-card p-6 md:p-8 overflow-hidden shadow-2xl group hover:border-accent/40 transition-colors">
                    {/* Background Gradient & Pattern */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${proj.gradient} opacity-60 pointer-events-none`}
                    />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Window Control Header Mockup */}
                    <div className="flex items-center justify-between pb-6 border-b border-dark-border/60 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="font-mono text-xs text-surface-muted flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-accent" />
                        <span>{proj.name.toLowerCase()}.app</span>
                      </div>
                    </div>

                    {/* Code Snippet / Visual Mockup Canvas */}
                    <div className="py-6 relative z-10 font-mono text-xs md:text-sm text-surface-muted bg-dark/80 rounded-xl p-5 border border-dark-border/60 overflow-x-auto">
                      <pre className="text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                        {proj.codeSnippet}
                      </pre>
                    </div>

                    {/* Visual Card Footer Badge */}
                    <div className="flex items-center justify-between pt-4 relative z-10 font-mono text-xs text-surface-muted border-t border-dark-border/60">
                      <span>STATUS: DEPLOYED</span>
                      <span className="text-accent flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> LIVE SYSTEM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
