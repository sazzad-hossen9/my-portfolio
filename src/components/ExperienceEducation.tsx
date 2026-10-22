'use client';

import React from 'react';
import { Experience, Education } from '@/types/portfolio';
import { Briefcase, GraduationCap, Clock, Sparkles } from 'lucide-react';

interface ExperienceEducationProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceEducation({
  experience,
  education,
}: ExperienceEducationProps) {
  const hasExperience = experience && experience.length > 0;
  const hasEducation = education && education.length > 0;

  // If both are empty, render a respectful, honest learning journey status card
  return (
    <section id="experience" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/10 text-xs sm:text-sm font-semibold text-[#8B5CF6] mb-3">
            <Clock className="w-4 h-4" />
            <span>Career & Learning Path</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience & <span className="text-[#8B5CF6]">Education</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Track of my professional milestones and academic background.
          </p>
        </div>

        {/* If data exists */}
        {(hasExperience || hasEducation) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-[#8B5CF6]" />
                <span>Experience</span>
              </h3>
              {hasExperience ? (
                experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-white/70 dark:bg-[#0E1520]/80 border border-slate-200 dark:border-[#8B5CF6]/20 shadow-sm"
                  >
                    <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {exp.company}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-white/40 dark:bg-[#0E1520]/40 border border-dashed border-slate-300 dark:border-slate-800 text-center text-sm text-slate-500">
                  No professional experience entries added yet.
                </div>
              )}
            </div>

            {/* Education Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-[#22C55E]" />
                <span>Education</span>
              </h3>
              {hasEducation ? (
                education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 rounded-2xl bg-white/70 dark:bg-[#0E1520]/80 border border-slate-200 dark:border-[#8B5CF6]/20 shadow-sm"
                  >
                    <span className="text-xs font-semibold text-[#22C55E] uppercase tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {edu.institution}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-white/40 dark:bg-[#0E1520]/40 border border-dashed border-slate-300 dark:border-slate-800 text-center text-sm text-slate-500">
                  No education history added yet.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Honest Empty State Banner (No Fake Jobs/Qualifications) */
          <div className="max-w-2xl mx-auto rounded-3xl bg-white/60 dark:bg-[#0E1520]/60 border border-slate-200/80 dark:border-[#8B5CF6]/20 p-8 sm:p-10 text-center backdrop-blur-md shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Currently Focusing on Skill Building & Projects
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              As a beginner frontend developer, I am actively building real-world projects and mastering core web technologies. Professional roles and formal credentials will be added here as I continue my journey.
            </p>
            <div className="pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] hover:text-[#22C55E] transition-colors"
              >
                <span>Check out my personal projects above</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
