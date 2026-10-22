'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X, Download, Code2, Mail } from 'lucide-react';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl = '/resume.pdf' }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState<boolean | null>(null);
  const [showResumeNotice, setShowResumeNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if resume file actually exists
  useEffect(() => {
    if (!resumeUrl) {
      setTimeout(() => {
        setResumeAvailable(false);
      }, 0);
      return;
    }
    fetch(resumeUrl, { method: 'HEAD' })
      .then((res) => {
        setResumeAvailable(res.ok);
      })
      .catch(() => {
        setResumeAvailable(false);
      });
  }, [resumeUrl]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!resumeAvailable) {
      e.preventDefault();
      setShowResumeNotice(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#080D12]/85 backdrop-blur-md shadow-lg shadow-[#8B5CF6]/5 border-b border-[#8B5CF6]/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#0F172A] dark:text-white"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22C55E] p-0.5 shadow-md shadow-[#8B5CF6]/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white dark:bg-[#080D12] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-[#8B5CF6] group-hover:text-[#22C55E] transition-colors" />
              </div>
            </div>
            <span className="flex items-center gap-1 font-extrabold text-lg sm:text-xl">
              Sazzad<span className="text-[#8B5CF6]">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors rounded-lg hover:bg-[#8B5CF6]/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Theme Toggle & CV */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#8B5CF6]/20 text-slate-600 dark:text-slate-300 hover:text-[#8B5CF6] dark:hover:text-[#22C55E] hover:border-[#8B5CF6]/50 bg-slate-100/60 dark:bg-[#0E1520] transition-all hover:scale-105"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#8B5CF6]" />
              )}
            </button>

            {/* Download CV Button */}
            {resumeAvailable ? (
              <a
                href={resumeUrl}
                download="Sazzad_Islam_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#22C55E] rounded-xl shadow-md shadow-[#8B5CF6]/25 transition-all hover:shadow-[#22C55E]/20 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            ) : (
              <button
                onClick={handleResumeClick}
                title="Resume available upon request"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-[#8B5CF6]/40 hover:border-[#22C55E] hover:text-[#22C55E] bg-white/50 dark:bg-[#0E1520]/80 rounded-xl transition-all"
              >
                <Download className="w-4 h-4 text-[#8B5CF6]" />
                <span>CV (Request)</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#8B5CF6]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-[#0E1520]/95 backdrop-blur-xl border border-[#8B5CF6]/20 shadow-xl space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              {resumeAvailable ? (
                <a
                  href={resumeUrl}
                  download="Sazzad_Islam_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#22C55E] rounded-xl shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              ) : (
                <button
                  onClick={handleResumeClick}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-[#8B5CF6]/40 rounded-xl"
                >
                  <Download className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Request CV</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Resume Fallback Modal Notice */}
        {showResumeNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0E1520] border border-[#8B5CF6]/30 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setShowResumeNotice(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/15 flex items-center justify-center text-[#8B5CF6] mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Resume Available Upon Request
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                As a beginner frontend developer, I keep my latest CV updated with recent projects and skills. Feel free to request my resume directly via email!
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:sazzad96741236@gmail.com?subject=Resume%20Request%20-%20Sazzad%20Islam"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#22C55E] hover:opacity-95 transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Sazzad</span>
                </a>
                <button
                  onClick={() => setShowResumeNotice(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
