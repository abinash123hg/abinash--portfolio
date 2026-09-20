import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, RefreshCw, MessageSquare, ArrowRight } from 'lucide-react';
import { AppHeader } from '../components/ui/AppHeader';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ChatMessage, AppId } from '../types';
import { useOSStore } from '../store/useOSStore';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'assistant',
    text: `Hi! I'm Abinash's AI Portfolio Assistant. I can answer questions about his production RAG pipelines, autonomous AI agents, MCP integration, neural networks, or background.`,
    timestamp: 'Just now',
    suggestedActions: [
      { label: 'View RAG Projects' },
      { label: 'What is his MCP Agent?' },
      { label: 'Education & CGPA' },
      { label: 'Contact Info' }
    ]
  }
];

export const ChatbotApp: React.FC = () => {
  const { openApp, selectProject, theme } = useOSStore();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // High-fidelity knowledge-grounded answering engine based on PORTFOLIO_DATA
  const generateGroundedResponse = (query: string): { text: string; action?: { label: string; appId?: AppId; projectId?: string } } => {
    const q = query.toLowerCase();

    // 1. Who is Abinash / Specialization
    if (q.includes('who is') || q.includes('about') || q.includes('specialize') || q.includes('bio') || q.includes('profile')) {
      return {
        text: `${PORTFOLIO_DATA.personal.name} is an ${PORTFOLIO_DATA.personal.title}. He specializes in ${PORTFOLIO_DATA.personal.positioning}. He is currently pursuing his B.Tech in CSE (AI & ML) at Centurion University of Technology and Management with a CGPA of ${PORTFOLIO_DATA.personal.cgpa}.`,
        action: { label: 'Open About App', appId: 'about' }
      };
    }

    // 2. RAG Projects
    if (q.includes('rag') || q.includes('retrieval') || q.includes('knowledge engine') || q.includes('docurag')) {
      const docu = PORTFOLIO_DATA.projects.find((p) => p.id === 'docurag-engine')!;
      return {
        text: `For RAG, check out "${docu.title}". It is an enterprise document intelligence engine featuring hybrid search (BM25 + Sentence Transformers dense retrieval), Reciprocal Rank Fusion (RRF), and FlashRank cross-encoder re-ranking. It achieves a 94.2% Context Precision, 0.912 Retrieval NDCG@5, 42% hallucination reduction, and <580ms latency.`,
        action: { label: 'Inspect DocuRAG', appId: 'projects', projectId: 'docurag-engine' }
      };
    }

    // 3. MCP / Model Context Protocol / MLOps Agent
    if (q.includes('mcp') || q.includes('mlops') || q.includes('agentic') || q.includes('claude desktop')) {
      const mcp = PORTFOLIO_DATA.projects.find((p) => p.id === 'mlops-agent-mcp')!;
      return {
        text: `Abinash built "${mcp.title}". It features an MCP server compatible with VS Code, Cursor, and Claude Desktop using FastMCP. It automates dataset profiling, EDA, model training (Random Forest, Gradient Boosting, MLP), and ChromaDB vector search with local Ollama inference without cloud data leakage.`,
        action: { label: 'View MLOps MCP Project', appId: 'projects', projectId: 'mlops-agent-mcp' }
      };
    }

    // 4. AI Agents / Copilot / LangGraph
    if (q.includes('agent') || q.includes('copilot') || q.includes('langgraph') || q.includes('teamcopilot')) {
      const copilot = PORTFOLIO_DATA.projects.find((p) => p.id === 'team-copilot')!;
      return {
        text: `For autonomous agents, look at "${copilot.title}". Built with LangGraph, FastAPI, pgvector, and Redis, it connects internal knowledge with live engineering tools for automated incident triage. It achieved a 68% MTTA reduction, 96.8% tool calling accuracy, and 74.5% autonomous resolution.`,
        action: { label: 'Explore TeamCopilot', appId: 'projects', projectId: 'team-copilot' }
      };
    }

    // 5. Ranking / NeuralRank / Search
    if (q.includes('rank') || q.includes('neuralrank') || q.includes('lambdamart') || q.includes('search')) {
      const rank = PORTFOLIO_DATA.projects.find((p) => p.id === 'neuralrank-explain')!;
      return {
        text: `Abinash engineered "${rank.title}" — a two-stage search ranking system combining dense Faiss candidate retrieval with LambdaMART LightGBM scoring and LLM explanations for a catalog of 100,000+ items with <65ms P95 latency and +19.4% CTR lift.`,
        action: { label: 'View NeuralRank', appId: 'projects', projectId: 'neuralrank-explain' }
      };
    }

    // 6. Education
    if (q.includes('education') || q.includes('cgpa') || q.includes('college') || q.includes('university') || q.includes('cutm')) {
      return {
        text: `Abinash is pursuing B.Tech in CSE specializing in AI & ML at Centurion University of Technology and Management (CUTM), Bhubaneswar (2024–Present) with an outstanding CGPA of ${PORTFOLIO_DATA.personal.cgpa} / 10.0. He previously completed +2 Science at Royal Higher Secondary Education, Bhubaneswar.`,
        action: { label: 'View Education App', appId: 'education' }
      };
    }

    // 7. Experience / Work history
    if (q.includes('work') || q.includes('experience') || q.includes('job') || q.includes('company') || q.includes('internship') || q.includes('tutorialspoint') || q.includes('internpe')) {
      return {
        text: `Abinash has two key experience roles:
1. TutorialsPoint Academy (June 2026–Present, Remote): AI/ML Developer developing AI Smart Inventory Management, supervised fine-tuning on open-source LLMs, RAG framework with vector search over inventory logs.
2. InternPe (August 2026–Present, Bhubaneswar): Data Analyst Intern building classification & regression models (IPL prediction, car price regression, diabetes risk).`,
        action: { label: 'View Experience App', appId: 'experience' }
      };
    }

    // 8. Certifications
    if (q.includes('cert') || q.includes('oracle') || q.includes('adobe') || q.includes('deloitte') || q.includes('anthropic') || q.includes('credentials')) {
      return {
        text: `Abinash holds 8 verified credentials, led by:
1. Oracle Certified Associate — Agentic AI (17 August 2026)
2. Adobe AI Essentials for Marketers (1 September 2026)
3. GenAI Powered Data Analytics — Tata / Forage
4. Deloitte Data Analytics Job Simulation
5. TutorialsPoint Smart Inventory ML (Skill India / NSDC)
6. InternPe Data Analyst Internship
7. Core Claude Platforms, APIs, and AI Agent Automation — Anthropic
8. Communication & Interview Skills — TCS iON`,
        action: { label: 'View 8 Certifications', appId: 'certifications' }
      };
    }

    // 9. Contact / Email / Phone / Links
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('github') || q.includes('linkedin')) {
      return {
        text: `You can reach Abinash directly:
• Email: ${PORTFOLIO_DATA.personal.email}
• Phone: ${PORTFOLIO_DATA.personal.phone}
• Location: ${PORTFOLIO_DATA.personal.locationShort}
• GitHub: ${PORTFOLIO_DATA.personal.github}
• LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`,
        action: { label: 'Open Contact App', appId: 'contact' }
      };
    }

    // 10. Resume
    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: `Abinash's resume is available directly as "${PORTFOLIO_DATA.personal.resumeFileName}" in the Resume App with full sections for Summary, Experience, Projects, Skills, and Education.`,
        action: { label: 'Open Resume App', appId: 'resume' }
      };
    }

    // 11. Technologies
    if (q.includes('tech') || q.includes('stack') || q.includes('tools') || q.includes('python')) {
      return {
        text: `Abinash's core stack includes:
• LLM/RAG: LlamaIndex, LangChain, Qdrant, ChromaDB, Faiss, BM25, Cross-Encoder (FlashRank), Ragas
• AI Agents: LangGraph, FastMCP, Function Calling, Prompt Engineering, Claude APIs, Gemini SDK
• ML: Python, PyTorch, Scikit-learn, XGBoost, LambdaMART, Pandas, NumPy
• Full-Stack: FastAPI, React, TypeScript, Tailwind CSS, REST APIs`,
        action: { label: 'View Skills Matrix', appId: 'skills' }
      };
    }

    // Default Fallback
    return {
      text: `Based on Abinash's verified portfolio dataset: Abinash Swain is an AI/ML Developer focusing on Production RAG systems, MCP Agents, and ML Ranking. That specific detail is not recorded in the portfolio data, but feel free to ask about his RAG projects, MCP engine, experience, certifications, or contact details!`,
      action: { label: 'View Candidate Brief', appId: 'recruiter' }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateGroundedResponse(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestedActions: response.action
          ? [
              {
                label: response.action.label,
                action: () => {
                  if (response.action?.projectId) selectProject(response.action.projectId);
                  if (response.action?.appId) openApp(response.action.appId);
                }
              }
            ]
          : undefined
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-between overflow-hidden">
      <AppHeader
        title="AI Twin Assistant"
        subtitle="Grounded in Verified Portfolio Data"
        rightAction={
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        }
      />

      {/* Messages List */}
      <div className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-1.5 max-w-[85%]">
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-[10px] shrink-0 mb-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-md'
                      : isDark
                      ? 'bg-zinc-800/90 text-zinc-100 rounded-bl-xs border border-white/10 shadow-md'
                      : 'bg-zinc-200 text-zinc-900 rounded-bl-xs shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              </div>

              {/* Action Chip Link if provided */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-7">
                  {msg.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (action.action) {
                          action.action();
                        } else {
                          handleSend(action.label);
                        }
                      }}
                      className="px-2.5 py-1 rounded-full bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 text-[10px] font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="px-3 py-2 rounded-2xl bg-zinc-800 border border-white/10 flex items-center gap-1 text-zinc-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-t border-white/5 bg-zinc-950/40">
        {[
          'Who is Abinash?',
          'What RAG projects has he built?',
          'Explain his MCP MLOps engine',
          'What certifications does he have?',
          'How can I contact him?'
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 text-[10px] whitespace-nowrap shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Bar (iMessage Style) */}
      <div className="p-3 pb-6 bg-zinc-950/90 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask anything about Abinash's AI/ML work..."
          className="flex-1 h-9 px-3 rounded-full bg-zinc-800 text-white placeholder-zinc-400 text-xs border border-white/10 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            input.trim()
              ? 'bg-blue-600 text-white shadow-md active:scale-95'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
