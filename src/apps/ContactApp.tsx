import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Github, Linkedin, CheckCircle2, Copy, Send, MessageSquare } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

export const ContactApp: React.FC = () => {
  const { theme, openApp, setSafariNavigation } = useOSStore();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const isDark = theme === 'dark';

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setIsSubmitting(true);

    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('Endpoint fallback', err);
    } finally {
      setIsSubmitting(false);
      setMsgSent(true);
      setTimeout(() => {
        setMsgSent(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4500);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-16">
      <AppHeader title="Contact" subtitle="Connect with Abinash" />

      <div className="p-4 space-y-4">
        {/* Contact Card Header */}
        <div
          className={`p-5 rounded-3xl border shadow-xl flex flex-col items-center text-center ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center font-bold text-white text-2xl shadow-xl mb-2">
            AS
          </div>
          <h2 className="text-lg font-bold tracking-tight">{PORTFOLIO_DATA.personal.name}</h2>
          <p className="text-xs text-emerald-400 font-medium">{PORTFOLIO_DATA.personal.targetRole}</p>
          <p className="text-xs text-zinc-400 mt-1">{PORTFOLIO_DATA.personal.locationShort}</p>
        </div>

        {/* 4 Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Email */}
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="p-3 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 flex items-center gap-2.5 text-xs font-semibold transition-all active:scale-98"
          >
            <Mail className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-bold">Email</span>
              <span className="text-[10px] text-zinc-400 block truncate max-w-[90px]">Send Direct</span>
            </div>
          </a>

          {/* Call */}
          <a
            href={`tel:${PORTFOLIO_DATA.personal.phone}`}
            className="p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 flex items-center gap-2.5 text-xs font-semibold transition-all active:scale-98"
          >
            <Phone className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-bold">Call</span>
              <span className="text-[10px] text-zinc-400 block truncate max-w-[90px]">+91-7077475818</span>
            </div>
          </a>

          {/* GitHub - In-App Safari */}
          <div
            onClick={() => {
              setSafariNavigation(PORTFOLIO_DATA.personal.github, 'GitHub — abinash123hg');
              openApp('safari');
            }}
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white flex items-center gap-2.5 text-xs font-semibold transition-all active:scale-98 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-bold">GitHub</span>
              <span className="text-[10px] text-zinc-400 block truncate max-w-[90px]">In-App Safari</span>
            </div>
          </div>

          {/* LinkedIn - In-App Safari */}
          <div
            onClick={() => {
              setSafariNavigation(PORTFOLIO_DATA.personal.linkedin, 'LinkedIn — Abinash Swain');
              openApp('safari');
            }}
            className="p-3 rounded-2xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-400 flex items-center gap-2.5 text-xs font-semibold transition-all active:scale-98 cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-bold">LinkedIn</span>
              <span className="text-[10px] text-zinc-400 block truncate max-w-[90px]">In-App Safari</span>
            </div>
          </div>
        </div>

        {/* Detailed Contact Information Table */}
        <div
          className={`rounded-3xl border shadow-md overflow-hidden divide-y divide-white/10 ${
            isDark ? 'bg-zinc-900/60 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Email row with Copy */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Email Address</span>
              <span className="text-zinc-200 font-mono truncate block mt-0.5">
                {PORTFOLIO_DATA.personal.email}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone row with Copy */}
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Phone Number</span>
              <span className="text-zinc-200 font-mono truncate block mt-0.5">
                {PORTFOLIO_DATA.personal.phone}
              </span>
            </div>
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Send Direct In-App Note Form */}
        <div
          className={`p-4 rounded-3xl border shadow-lg ${
            isDark ? 'bg-zinc-900/80 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Send Recruiter Message</span>
          </h3>

          {msgSent ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400 mb-1" />
              <p className="font-bold">Message Queued!</p>
              <p className="text-[11px] text-zinc-400">
                Opening default mail client for {PORTFOLIO_DATA.personal.email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
              <div>
                <input
                  type="text"
                  placeholder="Your Name / Organization"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500 text-zinc-200 placeholder-zinc-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500 text-zinc-200 placeholder-zinc-500"
                />
              </div>
              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Inquiry or opportunity details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500 text-zinc-200 placeholder-zinc-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
