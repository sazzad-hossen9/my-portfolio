import { getAllPortfolioData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import ExperienceEducation from '@/components/ExperienceEducation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import RevealSection from '@/components/ui/RevealSection';

// Use dynamic rendering in development to ensure fresh JSON Server data
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getAllPortfolioData();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#8B5CF6] selection:text-white">
      <Navbar resumeUrl={data.profile.resume} />
      <main className="flex-1">
        {/* Hero renders and animates in first for instant LCP */}
        <Hero profile={data.profile} socials={data.socials} />
        
        {/* Consistent scroll-reveal wrapping matching 3D room-to-room navigation */}
        <RevealSection direction="right">
          <About profile={data.profile} />
        </RevealSection>
        
        <RevealSection direction="left">
          <Skills skills={data.skills} />
        </RevealSection>
        
        <RevealSection direction="right">
          <Projects projects={data.projects} />
        </RevealSection>
        
        <RevealSection direction="left">
          <ExperienceEducation
            experience={data.experience}
            education={data.education}
          />
        </RevealSection>
        
        <RevealSection direction="up">
          <Contact profile={data.profile} socials={data.socials} />
        </RevealSection>
      </main>
      <Footer profile={data.profile} socials={data.socials} />
    </div>
  );
}
