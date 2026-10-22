'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Profile, Social } from '@/types/portfolio';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '@/components/SocialIcons';
import {
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface HeroProps {
  profile: Profile;
  socials: Social[];
}

export default function Hero({ profile, socials }: HeroProps) {
  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-5 h-5" />;
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5" />;
      case 'facebook':
        return <FacebookIcon className="w-5 h-5" />;
      case 'whatsapp':
      case 'phone':
        return <Phone className="w-5 h-5" />;
      case 'mail':
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#8B5CF6]/20 dark:bg-[#8B5CF6]/25 blur-[140px] rounded-full pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-10 w-[420px] h-[420px] bg-[#22C55E]/15 dark:bg-[#22C55E]/20 blur-[130px] rounded-full pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Text & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs sm:text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA] shadow-sm hover:border-[#22C55E]/50 transition-colors">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
                </span>
                <span>Available for Frontend Projects</span>
                <span className="text-slate-400">|</span>
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                  {profile.location || 'Bangladesh'}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-lg sm:text-xl font-semibold text-[#8B5CF6] tracking-wide">
                {profile.greeting || "Hi, I'm"}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {profile.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700 dark:text-slate-300">
                I Build{' '}
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#22C55E] bg-clip-text text-transparent">
                  Modern & Interactive
                </span>{' '}
                Websites
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#22C55E] shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#22C55E]/25 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#8B5CF6]/30 hover:border-[#22C55E] hover:text-[#22C55E] bg-white/60 dark:bg-[#0E1520]/80 backdrop-blur-md transition-all shadow-sm"
              >
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-3">
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider mr-2">
                Connect:
              </span>
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-[#8B5CF6]/20 bg-white/70 dark:bg-[#0E1520]/70 text-slate-600 dark:text-slate-300 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/10 transition-colors shadow-sm"
                >
                  {getSocialIcon(social.icon)}
                </motion.a>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column: Hero Portrait with Smooth Floating Animation */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] lg:w-[420px] lg:h-[480px]"
            >
              {/* Outer decorative glowing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/40 via-[#8B5CF6]/15 to-[#22C55E]/40 blur-xl -z-10"
              />
              
              {/* Floating Card Container */}
              <motion.div
                animate={{ y: [-7, 7, -7] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                }}
                className="w-full h-full rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-b from-[#8B5CF6]/10 to-transparent p-3 backdrop-blur-sm overflow-hidden flex items-end justify-center shadow-2xl shadow-[#8B5CF6]/20 group"
              >
                <div className="relative w-full h-full flex items-end justify-center">
                  <Image
                    src="/images/hero.png"
                    alt={`${profile.name} - Frontend Developer`}
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, (max-width: 1200px) 420px, 450px"
                    className="object-contain object-bottom drop-shadow-[0_15px_25px_rgba(139,92,246,0.35)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Floating Technology Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="absolute -bottom-4 -left-4 sm:left-2 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0E1520]/95 backdrop-blur-md border border-[#8B5CF6]/30 shadow-xl flex items-center gap-3 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Specialization</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Frontend & UI Development
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
