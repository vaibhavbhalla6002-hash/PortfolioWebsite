import React, { useState } from 'react';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navbar } from '@/components/ui/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { PageLoader } from '@/components/ui/PageLoader';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <div className="bg-dark text-surface-light min-h-screen selection:bg-accent selection:text-dark">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementsSection />
            <SkillsSection />
            <ContactSection />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
};

export default App;
