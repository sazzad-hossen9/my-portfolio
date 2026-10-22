'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/portfolio';
import {
  Code2,
  Palette,
  Database,
  Terminal,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Layers className="w-4 h-4" />;
      case 'programming':
        return <Terminal className="w-4 h-4" />;
      case 'styling':
        return <Palette className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#8B5CF6]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#22C55E]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/10 text-xs sm:text-sm font-semibold text-[#8B5CF6] mb-3">
            <Code2 className="w-4 h-4" />
            <span>Technologies & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className="text-[#8B5CF6]">Technical Skills</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Foundational frontend and web technologies I am actively practicing, building with, and mastering.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === cat
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30 scale-105'
                    : 'bg-white/70 dark:bg-[#0E1520]/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6]'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-5 rounded-2xl bg-white/70 dark:bg-[#0E1520]/80 border border-slate-200/80 dark:border-[#8B5CF6]/20 hover:border-[#22C55E]/50 hover:bg-white dark:hover:bg-[#0E1520] backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-[#8B5CF6]/10 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] group-hover:text-[#22C55E] group-hover:bg-[#22C55E]/10 transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-[#8B5CF6] transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Level Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                  <CheckCircle2 className="w-3 h-3" />
                  {skill.level}
                </span>
              </div>

              {/* Learning Progress Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                    <span>Learning Status</span>
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Active Practice
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22C55E] w-3/5 group-hover:w-3/4 transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
