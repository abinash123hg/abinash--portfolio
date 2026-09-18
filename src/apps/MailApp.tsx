import React, { useState } from 'react';
import { Mail, Send, ChevronRight, CheckCircle2, User, Star, ArrowLeft } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useOSStore } from '../store/useOSStore';

interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  time: string;
  preview: string;
  body: string;
  unread?: boolean;
}

const EMAILS: EmailItem[] = [
  {
    id: 'mail-1',
    sender: 'AI Recruiting Team',
    senderEmail: 'careers@anthropic.com',
    subject: 'FastMCP and Autonomous Agent Portfolio Review',
    time: '10:42 AM',
    preview: 'We evaluated your FastMCP tool-calling server and local Ollama pipeline...',
    body: `Hi Abinash,\n\nWe reviewed your recent work on FastMCP tool-calling agents and your hybrid RAG implementation (DocuRAG). Your focus on sub-580ms latency budgets and Reciprocal Rank Fusion re-ranking aligns directly with our engineering standards.\n\nWe would love to connect for 2027 engineering roles.\n\nBest,\nAutonomous Systems Recruiting Team`
  },
  {
    id: 'mail-2',
    sender: 'Centurion University CUTM',
    senderEmail: 'academics@cutm.ac.in',
    subject: 'Academic Record & Merit Status Confirmation',
    time: 'Yesterday',
    preview: 'Current cumulative CGPA verified at 8.32 / 10.0 for B.Tech AI & ML...',
    body: `Dear Abinash Swain,\n\nThis confirms your academic standing in the B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning) cohort at Centurion University of Technology and Management, Bhubaneswar. Your current cumulative GPA is 8.32 / 10.0.\n\nOffice of Academic Affairs`
  },
  {
    id: 'mail-3',
    sender: 'TutorialsPoint Academy',
    senderEmail: 'team@tutorialspoint.com',
    subject: 'Smart Inventory RAG & Fine-Tuning Checkpoint',
    time: 'Sep 10',
    preview: 'The demand forecasting model and semantic vector search updates are live...',
    body: `Hi Abinash,\n\nExcellent work on the inventory log retrieval pipeline. The supervised fine-tuning on open-source LLMs and token embeddings threshold tuning reduced search latency significantly across warehouse logs.\n\nTutorialsPoint Engineering Lead`
  }
];

export const MailApp: React.FC = () => {
  const { theme } = useOSStore();
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeMsg, setComposeMsg] = useState({ to: PORTFOLIO_DATA.personal.email, subject: '', body: '' });
  const [sent, setSent] = useState(false);
  const isDark = theme === 'dark';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsComposing(false);
      setComposeMsg({ to: PORTFOLIO_DATA.personal.email, subject: '', body: '' });
    }, 2500);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between overflow-hidden pb-16">
      <AppHeader
        title={isComposing ? 'New Message' : selectedEmail ? 'Message' : 'Inbox'}
        subtitle={isComposing ? 'Direct Email' : selectedEmail ? selectedEmail.sender : 'Candidate Inquiries'}
        onBack={isComposing ? () => setIsComposing(false) : selectedEmail ? () => setSelectedEmail(null) : undefined}
        backLabel={isComposing || selectedEmail ? 'Inbox' : 'Home'}
        rightAction={
          !isComposing && !selectedEmail && (
            <button
              onClick={() => setIsComposing(true)}
              className="p-1.5 rounded-full hover:bg-white/10 text-blue-400"
              title="Compose"
            >
              <Mail className="w-4 h-4" />
            </button>
          )
        }
      />

      {isComposing ? (
        /* Compose Screen */
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
          {sent ? (
            <div className="p-5 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center space-y-2 my-auto">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
              <h3 className="font-bold text-sm">Message Transmitted!</h3>
              <p className="text-xs text-zinc-400">Sent to {PORTFOLIO_DATA.personal.email}</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-3 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-zinc-400 w-12">To:</span>
                <input
                  type="email"
                  disabled
                  value={composeMsg.to}
                  className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                />
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-zinc-400 w-12">Subject:</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2027 AI/ML Interview Invitation"
                  value={composeMsg.subject}
                  onChange={(e) => setComposeMsg({ ...composeMsg, subject: e.target.value })}
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-zinc-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <textarea
                  required
                  rows={8}
                  placeholder="Write your email here..."
                  value={composeMsg.body}
                  onChange={(e) => setComposeMsg({ ...composeMsg, body: e.target.value })}
                  className="w-full bg-transparent text-white focus:outline-none placeholder-zinc-500 resize-none text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </button>
            </form>
          )}
        </div>
      ) : selectedEmail ? (
        /* Email Detail View */
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white leading-snug">{selectedEmail.subject}</h2>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 border-b border-white/10 pb-3">
              <div>
                <span className="font-semibold text-zinc-200 block">{selectedEmail.sender}</span>
                <span className="text-[10px] text-blue-400">{selectedEmail.senderEmail}</span>
              </div>
              <span className="text-[10px] font-mono">{selectedEmail.time}</span>
            </div>
          </div>

          <div
            className={`p-4 rounded-3xl border whitespace-pre-wrap text-xs leading-relaxed ${
              isDark ? 'bg-zinc-900/80 border-white/10 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800'
            }`}
          >
            {selectedEmail.body}
          </div>

          <button
            onClick={() => {
              setComposeMsg({
                to: selectedEmail.senderEmail,
                subject: `Re: ${selectedEmail.subject}`,
                body: `\n\n---\n${selectedEmail.body}`
              });
              setSelectedEmail(null);
              setIsComposing(true);
            }}
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-blue-400 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Reply to Thread</span>
          </button>
        </div>
      ) : (
        /* Email List Screen */
        <div className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-2">
          {EMAILS.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-3.5 rounded-2xl border shadow-sm cursor-pointer transition-all hover:border-blue-500/40 ${
                isDark ? 'bg-zinc-900/70 border-white/10 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 truncate">{email.sender}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{email.time}</span>
              </div>
              <h4 className="text-xs font-semibold text-white mt-1 truncate">{email.subject}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1 leading-relaxed">
                {email.preview}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
