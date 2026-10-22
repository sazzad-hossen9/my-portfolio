'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Profile, Social } from '@/types/portfolio';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '@/components/SocialIcons';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

interface ContactProps {
  profile: Profile;
  socials: Social[];
}

export default function Contact({ profile, socials }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyPhoneToClipboard = () => {
    if (profile.phone) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message should be at least 5 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      formData.subject.trim() || `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

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
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#8B5CF6]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

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
            <MessageSquare className="w-4 h-4" />
            <span>Let&apos;s Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get In <span className="text-[#8B5CF6]">Touch</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Have a question, frontend project opportunity, or just want to connect? My inbox is always open!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/70 dark:bg-[#0E1520]/80 border border-slate-200/80 dark:border-[#8B5CF6]/20 backdrop-blur-xl shadow-lg shadow-[#8B5CF6]/5 space-y-6">
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Feel free to reach out directly via email, phone, or connect through my social profiles.
              </p>

              {/* Email Card with One-click Copy */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080D12] border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm transition-colors hover:border-[#8B5CF6]/40"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs uppercase font-semibold text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-slate-800 dark:text-slate-200 text-sm hover:text-[#8B5CF6] transition-colors truncate block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={copyEmailToClipboard}
                  title="Copy email to clipboard"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#22C55E] text-slate-600 dark:text-slate-300 hover:text-[#22C55E] bg-white dark:bg-[#0E1520] transition-colors shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#22C55E]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </motion.div>

              {/* Phone Card with Click-to-call & One-click Copy */}
              {profile.phone && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080D12] border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm transition-colors hover:border-[#22C55E]/40"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs uppercase font-semibold text-slate-400 block">
                        Phone / WhatsApp
                      </span>
                      <a
                        href={`tel:${profile.phone}`}
                        className="font-medium text-slate-800 dark:text-slate-200 text-sm hover:text-[#22C55E] transition-colors truncate block"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={copyPhoneToClipboard}
                    title="Copy phone number to clipboard"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#22C55E] text-slate-600 dark:text-slate-300 hover:text-[#22C55E] bg-white dark:bg-[#0E1520] transition-colors shrink-0"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-[#22C55E]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </motion.div>
              )}

              {/* Location Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#080D12] border border-slate-200/70 dark:border-slate-800 flex items-center gap-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-400 block">
                    Location
                  </span>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                    {profile.location || 'Bangladesh'}
                  </p>
                </div>
              </motion.div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-3">
                  Social Links
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {socials.map((social) => (
                    <motion.a
                      key={social.id}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#8B5CF6]/20 bg-slate-50 dark:bg-[#080D12] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#22C55E] hover:border-[#22C55E]/50 transition-colors shadow-sm"
                    >
                      {getSocialIcon(social.icon)}
                      <span>{social.platform}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-[#0E1520]/80 border border-slate-200/80 dark:border-[#8B5CF6]/20 backdrop-blur-xl shadow-lg shadow-[#8B5CF6]/5">
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                Fill in the details below to compose an email directly to Sazzad Islam.
              </p>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-start gap-3 text-[#22C55E]"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Email Client Prepared</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Your mail client was triggered with your pre-filled message. If it didn&apos;t open automatically, you can directly email{' '}
                      <span className="font-semibold text-[#8B5CF6]">{profile.email}</span>.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080D12] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors text-sm ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-800 focus:border-[#8B5CF6]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080D12] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors text-sm ${
                        errors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-800 focus:border-[#8B5CF6]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Frontend Opportunity"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080D12] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Hi Sazzad, I would like to talk about..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#080D12] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors text-sm resize-none ${
                      errors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:border-[#8B5CF6]'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#22C55E] shadow-lg shadow-[#8B5CF6]/25 hover:shadow-[#22C55E]/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </motion.button>
              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
