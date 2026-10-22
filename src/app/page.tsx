import { getAllPortfolioData } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import ExperienceEducation from '@/components/ExperienceEducation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Use dynamic rendering in development to ensure fresh JSON Server data
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getAllPortfolioData();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#8B5CF6] selection:text-white">
      <Navbar resumeUrl={data.profile.resume} />
      <main className="flex-1">
        <Hero profile={data.profile} socials={data.socials} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <ExperienceEducation
          experience={data.experience}
          education={data.education}
        />
        <Contact profile={data.profile} socials={data.socials} />
      </main>
      <Footer profile={data.profile} socials={data.socials} />
    </div>
  );
}
