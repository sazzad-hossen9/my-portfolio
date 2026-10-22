'use client';

import React from 'react';
import Image from 'next/image';
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

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Background Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B5CF6]/15 dark:bg-[#8B5CF6]/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-[#22C55E]/10 dark:bg-[#22C55E]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs sm:text-sm font-medium text-[#8B5CF6] dark:text-[#A78BFA]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
              </span>
              <span>Available for Frontend Projects</span>
              <span className="text-slate-400">|</span>
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                {profile.location || 'Bangladesh'}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
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
            </div>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.description}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#22C55E] shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#22C55E]/20 transition-all hover:scale-105"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#8B5CF6]/30 hover:border-[#22C55E] hover:text-[#22C55E] bg-white/60 dark:bg-[#0E1520]/80 backdrop-blur-md transition-all hover:scale-105"
              >
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider mr-2">
                Connect:
              </span>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-[#8B5CF6]/20 bg-white/70 dark:bg-[#0E1520]/70 text-slate-600 dark:text-slate-300 hover:text-[#22C55E] hover:border-[#22C55E]/50 hover:bg-[#22C55E]/5 hover:scale-110 transition-all shadow-sm"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Portrait / Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] lg:w-[420px] lg:h-[480px]">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/40 via-[#8B5CF6]/10 to-[#22C55E]/40 blur-xl -z-10 animate-pulse" />
              
              {/* Card Container */}
              <div className="w-full h-full rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-b from-[#8B5CF6]/10 to-transparent p-3 backdrop-blur-sm overflow-hidden flex items-end justify-center shadow-2xl shadow-[#8B5CF6]/20">
                <div className="relative w-full h-full flex items-end justify-center">
                  <Image
                    src="/images/hero.png"
                    alt={`${profile.name} - Frontend Developer`}
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, (max-width: 1200px) 420px, 450px"
                    className="object-contain object-bottom drop-shadow-[0_15px_25px_rgba(139,92,246,0.35)]"
                  />
                </div>
              </div>

              {/* Floating Technology Badge */}
              <div className="absolute -bottom-4 -left-4 sm:left-2 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-[#0E1520]/90 backdrop-blur-md border border-[#8B5CF6]/30 shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Specialization</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Frontend & UI Development
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
