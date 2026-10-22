'use client';

import React from 'react';
import { Profile } from '@/types/portfolio';
import { Code, BookOpen, Layers, Target, Compass, Sparkles, MapPin } from 'lucide-react';

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  const learningPillars = [
    {
      icon: <BookOpen className="w-5 h-5 text-[#8B5CF6]" />,
      title: 'Continuous Learning',
      description:
        'Actively learning modern frontend technologies, diving deep into React, Next.js, and TypeScript through structured practice and tutorials.',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#22C55E]" />,
      title: 'Responsive & Clean UI',
      description:
        'Passionate about crafting intuitive, accessible, and responsive user interfaces using Tailwind CSS and modern web design standards.',
    },
    {
      icon: <Code className="w-5 h-5 text-[#8B5CF6]" />,
      title: 'Hands-on Building',
      description:
        'Believer in learning by doing. Creating practical web applications to reinforce core programming principles and web design.',
    },
    {
      icon: <Target className="w-5 h-5 text-[#22C55E]" />,
      title: 'Growth-Oriented Mindset',
      description:
        'Always eager to expand technical skills, welcome constructive feedback, and collaborate on engaging frontend web projects.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/10 text-xs sm:text-sm font-semibold text-[#8B5CF6] mb-3">
            <Compass className="w-4 h-4" />
            <span>Get To Know Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About <span className="text-[#8B5CF6]">Sazzad Islam</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A beginner Frontend Developer passionate about building modern, clean, and accessible web experiences.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Background Card */}
          <div className="lg:col-span-7 bg-white/70 dark:bg-[#0E1520]/80 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-[#8B5CF6]/20 backdrop-blur-xl shadow-xl shadow-[#8B5CF6]/5 relative overflow-hidden space-y-6">
            
            {/* Ambient Background Gradient Shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B5CF6]/10 to-[#22C55E]/5 blur-3xl -z-10 rounded-full" />

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>My Journey Into Web Development</span>
                <Sparkles className="w-5 h-5 text-[#22C55E]" />
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                {profile.description}
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                As a beginner in frontend development, I focus on turning ideas into functional code by building responsive web apps with HTML, CSS, JavaScript, React, and Next.js. I love the creative problem-solving and visual satisfaction of building sleek, modern user interfaces that work seamlessly across devices.
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
                I am actively learning best practices, modular code structure, state management, and modern styling with Tailwind CSS. I am eager to contribute, grow, and take on new challenges.
              </p>
            </div>

            {/* Quick Details Highlights */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#080D12]/60 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Location
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#22C55E]" />
                  {profile.location || 'Bangladesh'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#080D12]/60 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Primary Role
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[#8B5CF6]" />
                  {profile.role || 'Frontend Developer'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Core Focus Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {learningPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-white/60 dark:bg-[#0E1520]/60 border border-slate-200/70 dark:border-[#8B5CF6]/15 hover:border-[#22C55E]/40 hover:bg-white dark:hover:bg-[#0E1520] transition-all hover:translate-x-1 duration-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#080D12] border border-slate-200 dark:border-[#8B5CF6]/20 transition-colors group-hover:border-[#22C55E]/40">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {pillar.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
