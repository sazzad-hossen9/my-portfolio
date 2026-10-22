'use client';

import React from 'react';
import { Profile, Social } from '@/types/portfolio';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '@/components/SocialIcons';
import {
  Code2,
  Mail,
  Phone,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  profile: Profile;
  socials: Social[];
}

export default function Footer({ profile, socials }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'facebook':
        return <FacebookIcon className="w-4 h-4" />;
      case 'whatsapp':
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'mail':
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-[#8B5CF6]/15 bg-white/40 dark:bg-[#080D12]/60 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/70 dark:border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <a
              href="#home"
              className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#22C55E] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-[#080D12] rounded-[6px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-[#8B5CF6]" />
                </div>
              </div>
              <span>
                {profile.name} <span className="text-[#8B5CF6]">.dev</span>
              </span>
            </a>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
              {profile.role} passionate about creating clean, accessible, and responsive web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <a href="#home" className="hover:text-[#8B5CF6] transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-[#8B5CF6] transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-[#8B5CF6] transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-[#8B5CF6] transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-[#8B5CF6] transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Socials & Top Action */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Follow & Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#22C55E] hover:border-[#22C55E]/40 hover:bg-[#22C55E]/5 transition-all"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#22C55E] transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Built with Next.js & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
