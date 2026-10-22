'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types/portfolio';
import { GithubIcon } from '@/components/SocialIcons';
import UnderwaterCard from '@/components/ui/UnderwaterCard';
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  ImageOff,
} from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#8B5CF6]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5CF6]/10 text-xs sm:text-sm font-semibold text-[#8B5CF6] mb-3">
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent <span className="text-[#8B5CF6]">Projects</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Real-world web applications and frontend projects I designed and developed while learning modern web development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const hasLiveUrl = project.liveUrl && project.liveUrl.trim().length > 0;
            const hasGithubUrl = project.githubUrl && project.githubUrl.trim().length > 0;
            const isImageError = imageErrors[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="h-full"
              >
                <UnderwaterCard className="h-full" maxTilt={8} bobPhase={index * 1.2}>
                {/* Project Screenshot Container */}
                <div className="relative w-full h-52 sm:h-56 bg-slate-100 dark:bg-[#080D12] overflow-hidden border-b border-slate-200/70 dark:border-slate-800/80">
                  {!isImageError ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                      onError={() => handleImageError(project.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0E1520] dark:to-[#080D12]">
                      <ImageOff className="w-10 h-10 mb-2 text-[#8B5CF6]/60" />
                      <span className="text-xs font-medium text-center">
                        {project.title} Preview
                      </span>
                    </div>
                  )}

                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured Pill */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/90 text-white shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#8B5CF6] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-[#080D12] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-[#8B5CF6]/15 group-hover:border-[#8B5CF6]/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Live Demo and GitHub */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                    {hasLiveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#22C55E] shadow-sm shadow-[#8B5CF6]/25 transition-all"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}

                    {hasGithubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#8B5CF6]/20 hover:border-[#22C55E] hover:text-[#22C55E] bg-slate-50 dark:bg-[#080D12] transition-colors"
                        aria-label="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Code</span>
                      </motion.a>
                    )}
                  </div>

                </div>
                </UnderwaterCard>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
