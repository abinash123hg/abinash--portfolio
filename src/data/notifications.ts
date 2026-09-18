import { AppId } from '../types';

export interface OSNotification {
  id: string;
  appId: AppId;
  appName: string;
  iconName: string;
  gradient: string;
  title: string;
  body: string;
  time: string;
  deepLink?: string;
  unread?: boolean;
}

export const SEED_NOTIFICATIONS: OSNotification[] = [
  {
    id: 'notif-1',
    appId: 'recruiter',
    appName: 'Recruiter',
    iconName: 'Briefcase',
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    title: 'Candidate Inquiries Active',
    body: 'Abinash Swain is actively considering 2027 AI/ML Engineering & RAG roles.',
    time: '2m ago',
    unread: true
  },
  {
    id: 'notif-2',
    appId: 'chatbot',
    appName: 'Chatbot',
    iconName: 'MessageSquareText',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    title: 'AI Twin Available',
    body: 'Ask me anything about DocuRAG, FastMCP server pipelines, or CUTM research.',
    time: '14m ago',
    unread: true
  },
  {
    id: 'notif-3',
    appId: 'mail',
    appName: 'Mail',
    iconName: 'Mail',
    gradient: 'from-blue-500 via-sky-500 to-indigo-600',
    title: 'Anthropic Autonomous Systems Team',
    body: 'Evaluated your FastMCP tool-calling benchmark and hybrid BM25 + dense retrieval.',
    time: '1h ago',
    unread: false
  },
  {
    id: 'notif-4',
    appId: 'calendar',
    appName: 'Calendar',
    iconName: 'Calendar',
    gradient: 'from-rose-500 via-pink-600 to-red-600',
    title: 'Upcoming Milestone',
    body: 'Agentic AI Architecture Review at 3:30 PM.',
    time: '2h ago',
    unread: false
  },
  {
    id: 'notif-5',
    appId: 'projects',
    appName: 'Projects',
    iconName: 'Boxes',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    title: 'DocuRAG Benchmarked',
    body: 'Context precision verified at 94.2% with Reciprocal Rank Fusion re-ranking.',
    time: 'Yesterday',
    unread: false
  }
];
