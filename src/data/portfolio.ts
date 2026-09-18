import { Project, Experience, Education, Certification, SkillCategory, NoteItem, CalendarEvent } from '../types';

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Abinash Swain',
    role: 'AI/ML Developer',
    title: 'AI/ML Developer (RAG & Neural Networks)',
    targetRole: 'LLM Engineer – RAG, AI Assistants & Knowledge Systems',
    headline: 'AI/ML Developer building RAG systems, neural-network models, and practical predictive pipelines',
    bio: 'B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at Centurion University of Technology and Management. I build end-to-end machine learning pipelines, neural-network classifiers, RAG systems, and actionable data products.',
    positioning: 'Specializing in production RAG pipelines, autonomous tool-calling copilots, and AI/ML automation systems with a focus on MLOps and grounded analysis.',
    location: 'Bhubaneswar, Odisha, India',
    locationShort: 'Bhubaneswar, India — Remote-Friendly',
    status: 'Open to Full-Time Roles & High-Impact Opportunities',
    statusBadge: 'Open to Work (2027 / Immediate)',
    college: 'Centurion University of Technology and Management (CUTM)',
    degree: 'B.Tech CSE — AI & ML',
    cgpa: '8.32 / 10.0',
    email: 'swainabinash839@gmail.com',
    phone: '+91-7077475818',
    github: 'https://github.com/abinash123hg',
    linkedin: 'https://www.linkedin.com/in/abinash-swain-a941a3330',
    resumeFileName: 'Abinash-Swain-Resume.pdf',
    primaryAreas: [
      'Production RAG Systems',
      'AI Assistants & Copilots',
      'ML Ranking & Search',
      'AI/ML Engineering',
      'MCP & Tool Calling',
      'Full-Stack AI Applications'
    ]
  },

  projects: [
    {
      id: 'mlops-agent-mcp',
      title: 'MLOps & Autonomous Data Agent with MCP',
      category: 'AI / Machine Learning',
      tagline: 'Autonomous AI/ML engine with Model Context Protocol (MCP) server integration for automated pipeline lifecycle',
      description: 'AI/ML platform with an MCP server for VS Code, Cursor, and Claude Desktop. Automates dataset profiling, preprocessing, model training, evaluation, and RAG-based analysis.',
      technologies: [
        'Python',
        'Pandas',
        'NumPy',
        'Scikit-learn',
        'ChromaDB',
        'RAG',
        'Ollama',
        'FastMCP',
        'Streamlit',
        'Matplotlib',
        'Jinja2'
      ],
      metrics: [
        { label: 'Protocols', value: 'FastMCP' },
        { label: 'Integrations', value: 'VS Code / Claude' },
        { label: 'Local LLM', value: 'Ollama' },
        { label: 'Vector Store', value: 'ChromaDB' }
      ],
      architecture: [
        'Client IDE / Claude Desktop / Cursor',
        'FastMCP Protocol Bridge',
        'Automated Profiling & EDA Engine',
        'Model Training (RF, Gradient Boosting, MLP)',
        'RAG Knowledge Store (ChromaDB)',
        'HTML Report & Streamlit Dashboard Generator'
      ],
      highlights: [
        'Automated dataset profiling and preprocessing',
        'ML model training and evaluation with Hyperparameter tuning',
        'Random Forest, Gradient Boosting, and MLP models',
        'ChromaDB vector search with RAG integration',
        'Local LLM inference using Ollama without third-party data leakage',
        'Automated confusion matrices, HTML reports & Streamlit dashboard generation'
      ],
      challenges: 'Managing asynchronous tool invocations via Model Context Protocol while executing intensive scikit-learn model training and local Ollama quantized inference.',
      results: 'Decreased manual exploratory data analysis and baseline model iteration cycles from hours to under 3 minutes.',
      evaluation: 'Benchmarked across standard UCI and Kaggle classification tabular sets with automated cross-validation and confusion matrix diagnostics.',
      githubUrl: 'https://github.com/abinash123hg/agentic-mlops-mcp-engine.git',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true
    },
    {
      id: 'docurag-engine',
      title: 'DocuRAG — Multimodal Document RAG & Knowledge Engine',
      category: 'LLM & RAG Systems',
      tagline: 'Enterprise document intelligence platform using hybrid search and cross-encoder re-ranking for grounded retrieval',
      description: 'Enterprise document intelligence platform using hybrid search and cross-encoder re-ranking for grounded retrieval over complex technical documents.',
      technologies: [
        'Python',
        'FastAPI',
        'LlamaIndex',
        'Qdrant',
        'ChromaDB',
        'Sentence Transformers',
        'BM25',
        'FlashRank',
        'React'
      ],
      metrics: [
        { label: 'Context Precision', value: '94.2%' },
        { label: 'Retrieval NDCG@5', value: '0.912' },
        { label: 'Hallucination Reduction', value: '42%' },
        { label: 'End-to-End Latency', value: '<580ms' }
      ],
      architecture: [
        'Document Parser',
        'Parent/Child Chunking',
        'BM25 + Dense Retrieval',
        'Reciprocal Rank Fusion (RRF)',
        'Cross-Encoder Re-ranking (FlashRank)',
        'Grounded Answer'
      ],
      highlights: [
        'Dual-stream sparse (BM25) and dense (Sentence Transformers) vector index',
        'Reciprocal Rank Fusion (RRF) for balanced multi-stage candidate gathering',
        'Cross-encoder re-ranking with FlashRank for low-latency top-K scoring',
        'Parent/child chunking preserves broad narrative context while searching fine-grained passages',
        'Ragas groundedness evaluation framework with hallucination safeguards'
      ],
      challenges: 'Overcoming semantic drift in tables, header structures, and mathematical formula chunks inside complex enterprise PDF manuals.',
      results: 'Reached 94.2% context precision and cut hallucination rates by 42% over standard naïve chunking.',
      evaluation: 'Evaluated using LlamaIndex Ragas test suites for faithfulness, answer relevancy, and context recall.',
      githubUrl: 'https://github.com/abinash123hg/docurag-engine',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true
    },
    {
      id: 'team-copilot',
      title: 'TeamCopilot — Autonomous Engineering & Support Copilot',
      category: 'AI Assistants & Agents',
      tagline: 'Agentic RAG copilot connecting internal knowledge with live engineering tools for automated incident triage',
      description: 'Agentic RAG copilot connecting internal knowledge with live engineering tools for automated incident triage.',
      technologies: [
        'Python',
        'LangGraph',
        'FastAPI',
        'PostgreSQL',
        'pgvector',
        'Redis',
        'Tool Calling',
        'Next.js',
        'Docker'
      ],
      metrics: [
        { label: 'MTTA Reduction', value: '68%' },
        { label: 'Tool Calling Accuracy', value: '96.8%' },
        { label: 'Autonomous Resolution', value: '74.5%' },
        { label: 'Framework', value: 'LangGraph' }
      ],
      architecture: [
        'User Input / Alert Trigger',
        'Agent State Machine (LangGraph)',
        'Tool Selection & Validation',
        'Retrieval / Live API Tools (pgvector/Redis)',
        'Automated Verification Step',
        'Human Escalation Branch',
        'Synthesized Response / Resolution'
      ],
      highlights: [
        'Stateful LangGraph cyclical agent graph with conditional rollback boundaries',
        'Structured tool-calling with JSON schema enforcement and verification steps',
        'pgvector semantic memory alongside Redis low-latency conversation cache',
        'Autonomous incident triage with safety rails and human-in-the-loop escalation'
      ],
      challenges: 'Preventing runaway loops and hallucinated argument schemas in complex multi-turn incident triages.',
      results: 'Accelerated Mean Time to Acknowledge (MTTA) by 68% with 74.5% automated end-to-end resolution of tier-1 issues.',
      evaluation: 'Tested against simulated GitHub issue and deployment incident traces with strict tool schema assert validations.',
      githubUrl: 'https://github.com/abinash123hg/team-copilot-agent',
      liveDemoUrl: 'https://ais-dev-clxhguavorwiqmygvyflld-888038745886.asia-east1.run.app',
      featured: true
    },
    {
      id: 'neuralrank-explain',
      title: 'NeuralRank & Explain',
      category: 'ML Ranking & Search',
      tagline: 'Two-stage search ranking system combining dense candidate retrieval, LambdaMART re-ranking, and LLM-generated explanations',
      description: 'Two-stage search ranking system combining dense candidate retrieval, LambdaMART re-ranking, and LLM-generated explanations.',
      technologies: [
        'Python',
        'PyTorch',
        'Scikit-learn',
        'XGBoost',
        'LightGBM',
        'Faiss',
        'Hugging Face Transformers',
        'FastAPI',
        'Streamlit'
      ],
      metrics: [
        { label: 'NDCG@10', value: '0.892' },
        { label: 'CTR Improvement', value: '+19.4%' },
        { label: 'P95 Latency', value: '<65ms' },
        { label: 'Catalog Scale', value: '100,000+ items' }
      ],
      architecture: [
        '100K+ Item Catalog Vector Store (Faiss)',
        'Stage 1: Dense Semantic Candidate Retrieval (Top 200)',
        'Stage 2: Learning-to-Rank Feature Scoring (LambdaMART/LightGBM)',
        'Stage 3: LLM Explanation Engine for Top Ranked Recommendations',
        'Real-time Streamlit & FastAPI Serving'
      ],
      highlights: [
        'Two-stage production-grade ranking architecture handling 100,000+ items',
        'Sub-65ms P95 latency via vectorized Faiss ANN search',
        'Pairwise and listwise LambdaMART optimization over user interaction logs',
        'Natural-language explanations detailing why each item was recommended'
      ],
      challenges: 'Balancing the sub-100ms real-time latency budget while running two ranking stages and dynamic explanation generation.',
      results: 'Delivered +19.4% click-through rate lift with 0.892 NDCG@10 on benchmark test sets.',
      evaluation: 'Evaluated with offline NDCG, MAP, and MRR ranking metrics on multi-class clickstream logs.',
      githubUrl: 'https://github.com/abinash123hg/neuralrank-explain',
      featured: false
    }
  ] as Project[],

  experience: [
    {
      id: 'tutorialspoint',
      company: 'TutorialsPoint Academy',
      role: 'AI/ML Developer (RAG, Fine-Tuning & Deep Learning)',
      location: 'Remote',
      period: 'June 2026 – Present',
      responsibilities: [
        'Develop AI-powered Smart Inventory Management System using deep learning and semantic intelligence',
        'Execute supervised fine-tuning on open-source LLMs for warehouse terminology and operations tracking',
        'Design RAG framework with vector search over corporate inventory logs',
        'Engineer neural networks for product demand forecasting and safety-stock workflows',
        'Tune token embeddings and similarity thresholds',
        'Build data orchestration pipelines for model evaluation and deployment'
      ],
      skills: [
        'Python',
        'RAG',
        'Fine-Tuning',
        'Deep Learning',
        'Vector Databases',
        'Embeddings',
        'Demand Forecasting'
      ]
    },
    {
      id: 'internpe',
      company: 'InternPe',
      role: 'Data Analyst Intern',
      location: 'Bhubaneswar',
      period: 'August 2026 – Present',
      responsibilities: [
        'Build end-to-end data preprocessing and exploratory data analysis workflows',
        'Develop machine-learning classification systems',
        'Build IPL match prediction workflow',
        'Develop used-car price regression',
        'Develop diabetes risk prediction models',
        'Use Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Google Colab'
      ],
      skills: [
        'Python',
        'Neural Networks',
        'Scikit-learn',
        'Pandas',
        'NumPy',
        'EDA',
        'Predictive Modeling'
      ]
    }
  ] as Experience[],

  education: [
    {
      id: 'btech',
      institution: 'Centurion University of Technology and Management (CUTM)',
      degree: 'B.Tech in Computer Science & Engineering',
      specialization: 'Artificial Intelligence & Machine Learning',
      location: 'Bhubaneswar, Odisha, India',
      period: 'August 2024 – Present',
      cgpa: '8.32 / 10.0',
      focus: 'RAG Architectures, Deep Learning, Natural Language Processing, Autonomous Agents, Data Structures'
    },
    {
      id: 'higher-secondary',
      institution: 'Royal Higher Secondary Education, Bhubaneswar',
      degree: 'Higher Secondary School Certificate (+2 Science)',
      period: 'August 2022 – February 2024',
      focus: 'Mathematics and Computer Science'
    },
    {
      id: 'matriculation',
      institution: 'Maa Pandarshila High School, Narendrapur',
      degree: 'Matriculation',
      location: 'Kendrapara, Odisha',
      period: 'Completed'
    }
  ] as Education[],

  certifications: [
    {
      id: 'oracle-agentic-ai',
      title: 'Oracle Certified Associate — Agentic AI',
      issuer: 'Oracle',
      date: '17 August 2026',
      credentialId: '1Z0-1135-25',
      skills: ['Agentic Workflows', 'Oracle Cloud Infrastructure', 'Autonomous Agents', 'LLM Planning'],
      accentColor: 'from-red-600 to-amber-600',
      badgeLabel: 'Oracle Certified',
      imageSrc: '/assets/certifications/oracle_page-0001.jpg',
      description: 'Official credential verifying expertise in Autonomous Agent design, OCI generative AI services, structured tool calling, and enterprise agentic planning.'
    },
    {
      id: 'adobe-ai-essentials',
      title: 'Adobe AI Essentials for Marketers',
      issuer: 'Adobe',
      date: '1 September 2026',
      credentialId: 'ADOBE-AI-ESS-9281',
      skills: ['Generative AI', 'Prompt Engineering', 'Creative Intelligence', 'Workflow Integration'],
      accentColor: 'from-rose-500 to-red-600',
      badgeLabel: 'Adobe Credential',
      imageSrc: '/assets/certifications/Adobe.jpg',
      description: 'Certification validating generative intelligence workflows, multi-modal prompt engineering, creative pipeline automation, and AI ethics.'
    },
    {
      id: 'tata-genai-data',
      title: 'GenAI Powered Data Analytics Job Simulation',
      issuer: 'Tata / Forage',
      date: 'July 2026',
      credentialId: 'FORAGE-TATA-GENAI-883',
      skills: ['GenAI Data Analysis', 'Executive Reporting', 'Pattern Discovery', 'Predictive Insights'],
      accentColor: 'from-blue-600 to-cyan-600',
      badgeLabel: 'Tata Simulation',
      imageSrc: '/assets/certifications/GenAI Powered Data Analytics Job Simulation_page-0001.jpg',
      description: 'Job simulation focused on applying generative AI to business analytics, automated reporting, anomaly detection, and decision support.'
    },
    {
      id: 'deloitte-data-analytics',
      title: 'Deloitte Data Analytics Job Simulation',
      issuer: 'Deloitte',
      date: '14 August 2026',
      credentialId: 'DELOITTE-DA-SIM-2026',
      skills: ['Business Intelligence', 'Data Strategy', 'Statistical Modeling', 'Tableau/Analytics'],
      accentColor: 'from-emerald-600 to-teal-600',
      badgeLabel: 'Deloitte Verified',
      imageSrc: '/assets/certifications/deloitte_page-0001.jpg',
      description: 'Simulation exploring enterprise data architecture, business intelligence dashboards, client advisory, and statistical risk modeling.'
    },
    {
      id: 'tutorialspoint-inventory',
      title: 'AI-Powered Smart Inventory Management System using Python',
      issuer: 'TutorialsPoint Academy / Skill India / NSDC',
      date: 'June 2026',
      credentialId: 'TUT-NSDC-SMARTINV-99',
      skills: ['Deep Learning', 'Inventory Forecasting', 'Fine-Tuning', 'Python ML'],
      accentColor: 'from-orange-500 to-amber-500',
      badgeLabel: 'Skill India / NSDC',
      imageSrc: '/assets/certifications/internship_tutorialspoint_page-0001.jpg',
      description: 'Hands-on industrial training on building deep learning neural networks for inventory replenishment and demand forecasting.'
    },
    {
      id: 'internpe-data-analyst',
      title: 'Data Analyst Internship Certificate',
      issuer: 'InternPe',
      date: '15 July 2026',
      credentialId: 'INTERNPE-DA-7729',
      skills: ['Exploratory Data Analysis', 'Scikit-learn', 'Regression & Classification', 'NumPy/Pandas'],
      accentColor: 'from-indigo-600 to-purple-600',
      badgeLabel: 'Internship Certified',
      imageSrc: '/assets/certifications/internpay.png',
      description: 'Completed a hands-on internship in data analytics, tabular modeling, feature engineering, and predictive classification systems.'
    },
    {
      id: 'anthropic-claude-mcp',
      title: 'Core Claude Platforms, APIs, and AI Agent Automation',
      issuer: 'Anthropic',
      date: 'May 2026',
      credentialId: 'ANTHROPIC-CLAUDE-MCP-01',
      skills: ['Claude APIs', 'Model Context Protocol (MCP)', 'Tool Calling', 'System Prompting'],
      accentColor: 'from-amber-600 to-orange-700',
      badgeLabel: 'Anthropic Partner',
      description: 'Comprehensive evaluation in tool use schemas, Claude 3.5 Sonnet prompt design, and FastMCP stdio server architecture.'
    },
    {
      id: 'tcs-ion-communication',
      title: 'Communication and Interview Skills',
      issuer: 'TCS iON',
      date: 'March 2026',
      credentialId: 'TCS-ION-COMM-5142',
      skills: ['Professional Communication', 'Technical Articulation', 'Interview Strategy', 'Collaboration'],
      accentColor: 'from-sky-600 to-blue-700',
      badgeLabel: 'TCS iON Certified',
      description: 'Professional communication, technical articulation, cross-functional collaboration, and structured interviewing methodology.'
    }
  ] as Certification[],

  skillsCategorized: [
    {
      category: 'LLM & RAG Systems',
      skills: [
        { name: 'RAG Architecture', level: 5, highlight: true },
        { name: 'RAG & Vector Search', level: 5, highlight: true },
        { name: 'LlamaIndex', level: 5, highlight: true },
        { name: 'LangChain', level: 4 },
        { name: 'Qdrant', level: 4 },
        { name: 'ChromaDB', level: 5, highlight: true },
        { name: 'Faiss', level: 4 },
        { name: 'Hybrid Search (Dense + Sparse)', level: 5, highlight: true },
        { name: 'BM25', level: 4 },
        { name: 'Cross-Encoder Re-Ranking', level: 5, highlight: true },
        { name: 'Ragas Evaluation', level: 4 }
      ]
    },
    {
      category: 'AI Agents & Tool Calling',
      skills: [
        { name: 'LangGraph', level: 5, highlight: true },
        { name: 'Function Calling', level: 5, highlight: true },
        { name: 'Tool Schemas (JSON/OpenAPI)', level: 5 },
        { name: 'Gemini SDK', level: 4 },
        { name: 'Prompt Engineering', level: 5 },
        { name: 'Grounding & Citations', level: 5, highlight: true },
        { name: 'Human-in-the-Loop Safeguards', level: 4 },
        { name: 'Anthropic APIs', level: 5 },
        { name: 'MCP (Model Context Protocol)', level: 5, highlight: true },
        { name: 'Amazon Bedrock', level: 4 },
        { name: 'Vertex AI', level: 4 }
      ]
    },
    {
      category: 'Machine Learning',
      skills: [
        { name: 'Python', level: 5, highlight: true },
        { name: 'Java', level: 4 },
        { name: 'SQL', level: 4 },
        { name: 'Scikit-learn', level: 5, highlight: true },
        { name: 'PyTorch', level: 4, highlight: true },
        { name: 'Neural Networks', level: 5 },
        { name: 'Deep Learning', level: 4 },
        { name: 'XGBoost', level: 5 },
        { name: 'LambdaMART', level: 4 },
        { name: 'Pandas & NumPy', level: 5, highlight: true },
        { name: 'Data Analysis & EDA', level: 5 },
        { name: 'Model Evaluation (NDCG, Precision, ROC)', level: 5 }
      ]
    },
    {
      category: 'Full-Stack AI',
      skills: [
        { name: 'React', level: 4 },
        { name: 'TypeScript', level: 4 },
        { name: 'Tailwind CSS', level: 5 },
        { name: 'FastAPI', level: 5, highlight: true },
        { name: 'REST APIs', level: 5 },
        { name: 'Express.js', level: 4 },
        { name: 'SSE Streaming', level: 4 },
        { name: 'VS Code & Cursor', level: 5 },
        { name: 'Google Colab', level: 5 }
      ]
    }
  ] as SkillCategory[],

  notes: [
    {
      id: 'note-1',
      title: '2027 AI/ML Engineering Objectives',
      date: 'Yesterday',
      category: 'Career Notes',
      content: 'Targeting high-impact roles in LLM Engineering, RAG Systems, and AI Agent Copilots. Core focus: moving past toy prototypes to production-grade latency budgets, deterministic schema validation, and evaluation harness with Ragas and NDCG tracking.'
    },
    {
      id: 'note-2',
      title: 'RAG Pipeline Architecture Blueprint',
      date: 'Sep 12, 2026',
      category: 'Technical Stack',
      content: '1. Ingestion: Parent/Child hierarchical chunking.\n2. Retrieval: Dual-stream sparse BM25 + dense sentence transformers.\n3. Fusion: Reciprocal Rank Fusion (RRF).\n4. Reranking: FlashRank cross-encoder to top 5 passages.\n5. Generation: Grounded response with citation source verification.'
    },
    {
      id: 'note-3',
      title: 'FastMCP Implementation Notes',
      date: 'Sep 04, 2026',
      category: 'AI/ML Focus',
      content: 'Model Context Protocol allows IDEs (Cursor/VS Code) to execute Python tools natively. For MLOps agent: exposed dataset profiling, automated scikit-learn cross-validation, and ChromaDB vector search as standard JSON-RPC tools.'
    },
    {
      id: 'note-4',
      title: 'Ranking & LambdaMART Optimization',
      date: 'Aug 28, 2026',
      category: 'Technical Stack',
      content: 'LambdaMART bridges pure semantic ANN search with tabular business metrics. Dense retrieval produces top 200 candidates; gradient-boosted trees re-rank using user features, yielding +19.4% CTR lift under 65ms.'
    }
  ] as NoteItem[],

  calendarEvents: [
    {
      id: 'cal-1',
      title: 'Oracle Certified Associate — Agentic AI',
      date: '2026-08-17',
      time: '10:00 AM',
      type: 'certification',
      description: 'Achieved OCA Agentic AI credential for enterprise autonomous workflows.'
    },
    {
      id: 'cal-2',
      title: 'InternPe Data Analyst Internship Milestone',
      date: '2026-07-15',
      time: '09:00 AM',
      type: 'internship',
      description: 'Commenced predictive modeling and regression analysis internship.'
    },
    {
      id: 'cal-3',
      title: 'Deloitte Data Analytics Credential',
      date: '2026-08-14',
      time: '02:30 PM',
      type: 'certification',
      description: 'Completed corporate business intelligence and analytics simulation.'
    },
    {
      id: 'cal-4',
      title: 'Adobe AI Essentials for Marketers Certification',
      date: '2026-09-01',
      time: '11:00 AM',
      type: 'certification',
      description: 'Completed generative intelligence workflow and prompt design credential.'
    }
  ] as CalendarEvent[],

  favoriteShows: [
    {
      title: 'Breaking Bad',
      genre: 'Crime / Drama',
      rating: '9.5/10',
      color: 'from-emerald-800 to-zinc-950',
      quote: 'I am the one who knocks.',
      posterSrc: '/assets/favorites/breakingbad.jpg',
      synopsis: 'A chemistry teacher diagnosed with terminal cancer turns to manufacturing methamphetamine with a former student to secure his family’s financial future.'
    },
    {
      title: 'The Boys',
      genre: 'Action / Sci-Fi',
      rating: '8.7/10',
      color: 'from-rose-800 to-zinc-950',
      quote: 'Never meet your heroes.',
      posterSrc: '/assets/favorites/The Boys.jpg',
      synopsis: 'A group of vigilantes sets out to take down corrupt superheroes who abuse their superpowers instead of using them for good.'
    },
    {
      title: 'Money Heist',
      genre: 'Thriller / Heist',
      rating: '8.2/10',
      color: 'from-red-800 to-zinc-950',
      quote: 'Bella Ciao.',
      posterSrc: '/assets/favorites/Money Heist.jpg',
      synopsis: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.'
    },
    {
      title: 'Dark',
      genre: 'Sci-Fi / Mystery',
      rating: '8.7/10',
      color: 'from-amber-900 to-zinc-950',
      quote: 'The question isn’t where, but when.',
      posterSrc: '/assets/favorites/Dark.jpg',
      synopsis: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.'
    },
    {
      title: 'Vikings',
      genre: 'Historical / Adventure',
      rating: '8.5/10',
      color: 'from-sky-900 to-zinc-950',
      quote: 'Power is always dangerous.',
      posterSrc: '/assets/favorites/vikings.jpg',
      synopsis: 'Ragnar Lothbrok, a legendary Norse hero, rises from a simple farmer to the commander of Viking tribes and King of Denmark.'
    }
  ],

  musicTracks: [
    {
      id: 'track-1',
      title: 'Rhythm Funk',
      artist: 'AlexGuz',
      album: 'Studio Funk Grooves',
      duration: '2:40',
      audioUrl: '/assets/music/alexguz-rhythm-funk-511536.mp3',
      coverColor: 'from-purple-600 via-indigo-600 to-blue-700',
      genre: 'Funk / Focus Groove'
    },
    {
      id: 'track-2',
      title: 'Tokyo Funk Commercial Promo',
      artist: 'FASSounds',
      album: 'Tokyo Neon Nights',
      duration: '1:35',
      audioUrl: '/assets/music/fassounds-tokyo-funk-commercial-promo-funk-423844.mp3',
      coverColor: 'from-amber-600 via-orange-600 to-rose-700',
      genre: 'Commercial Funk / Upbeat'
    }
  ],

  photos: [
    {
      id: 'photo-profile',
      title: 'Abinash Swain — Headshot',
      category: 'Portrait',
      description: 'Official developer profile photograph for AI/ML engineering portfolios and applications.',
      url: '/assets/images/abinash-profile-384.webp',
      date: 'Aug 2026',
      location: 'Odisha, India'
    },
    {
      id: 'photo-1',
      title: 'CUTM Campus Architecture',
      category: 'Campus',
      description: 'Centurion University of Technology and Management academic environment.',
      url: '/assets/photos/123760.jpg',
      date: '2026',
      location: 'CUTM Campus'
    },
    {
      id: 'photo-2',
      title: 'Engineering Hall & Research Wing',
      category: 'Academic',
      description: 'Department of Computer Science & Engineering computing laboratories.',
      url: '/assets/photos/1566397.jpg',
      date: '2026',
      location: 'Bhubaneswar'
    },
    {
      id: 'photo-3',
      title: 'AI Lab Workspace',
      category: 'Development',
      description: 'Hardware lab equipped for distributed neural network and LLM inference.',
      url: '/assets/photos/250542.jpg',
      date: '2026',
      location: 'AI Center'
    },
    {
      id: 'photo-4',
      title: 'Technical Symposium & Meetup',
      category: 'Events',
      description: 'Interactive session exploring agentic LLMs, FastMCP, and real-time retrieval.',
      url: '/assets/photos/26640376.jpg',
      date: '2026',
      location: 'Symposium Hall'
    },
    {
      id: 'photo-5',
      title: 'Creative Studio Snapshot',
      category: 'Creativity',
      description: 'Exploring interface ergonomics and mobile UI rendering.',
      url: '/assets/photos/295657.jpg',
      date: '2026',
      location: 'Design Studio'
    },
    {
      id: 'photo-6',
      title: 'High-Performance Computing Cluster',
      category: 'Infrastructure',
      description: 'Server rack infrastructure supporting model training and embedding indexing.',
      url: '/assets/photos/38598.jpg',
      date: '2026',
      location: 'Data Center'
    },
    {
      id: 'photo-7',
      title: 'Sunset Study Session',
      category: 'Lifestyle',
      description: 'Focus session reviewing transformer papers and flash attention mechanisms.',
      url: '/assets/photos/4512060.jpg',
      date: '2026',
      location: 'Campus Quad'
    },
    {
      id: 'photo-8',
      title: 'Developer Workstation & Setup',
      category: 'Workspace',
      description: 'Dual-monitor Linux workstation configured for PyTorch and FastMCP debugging.',
      url: '/assets/photos/4512081.jpg',
      date: '2026',
      location: 'Workspace'
    },
    {
      id: 'photo-9',
      title: 'Evening Hackathon Reflection',
      category: 'Hackathons',
      description: 'Night coding sprint developing autonomous agent tool execution trees.',
      url: '/assets/photos/7310.jpg',
      date: '2026',
      location: 'Hackathon Arena'
    },
    {
      id: 'photo-cat',
      title: 'Lab Mascot — Focus Cat',
      category: 'Pets & Fun',
      description: 'Faithful coding companion keeping morale high during late-night fine-tuning runs.',
      url: '/assets/images/cute_white_cat.jpg',
      date: '2026',
      location: 'Home Lab'
    }
  ],

  videos: [
    {
      id: 'vid-1',
      title: 'DocuRAG: Hybrid Search & Re-ranking Demonstration',
      filename: '149947-797491657_medium.mp4',
      url: '/assets/video/149947-797491657_medium.mp4',
      duration: '0:14',
      category: 'RAG Pipeline',
      description: 'Live pipeline trace demonstrating BM25 + dense sentence embeddings fused via Reciprocal Rank Fusion, with FlashRank cross-encoder sub-600ms scoring.',
      posterBg: 'from-blue-900 via-indigo-950 to-black'
    },
    {
      id: 'vid-2',
      title: 'FastMCP Autonomous Agent Tool Execution in Action',
      filename: '172475-847499816_medium.mp4',
      url: '/assets/video/172475-847499816_medium.mp4',
      duration: '0:18',
      category: 'AI Agents',
      description: 'Claude Desktop client orchestrating automated EDA dataset profiling, Scikit-learn model fitting, and ChromaDB vector search via FastMCP stdio.',
      posterBg: 'from-purple-900 via-violet-950 to-black'
    },
    {
      id: 'vid-3',
      title: 'NeuralRank: Sub-65ms Search Ranking Performance',
      filename: '178501-860033423_medium.mp4',
      url: '/assets/video/178501-860033423_medium.mp4',
      duration: '0:22',
      category: 'Machine Learning',
      description: 'Benchmarking Faiss candidate retrieval against LambdaMART gradient boosted decision trees across 100,000 product records.',
      posterBg: 'from-emerald-900 via-teal-950 to-black'
    },
    {
      id: 'vid-4',
      title: 'TeamCopilot Autonomous Multi-Turn Incident Resolution',
      filename: '34301-400974283_medium.mp4',
      url: '/assets/video/34301-400974283_medium.mp4',
      duration: '0:16',
      category: 'LangGraph Systems',
      description: 'Autonomous incident response system invoking tool calls across simulated Kubernetes telemetry, Redis checkpoints, and vector logs.',
      posterBg: 'from-amber-900 via-orange-950 to-black'
    },
    {
      id: 'vid-5',
      title: 'Fine-Tuning & Quantized Model Inference Benchmark',
      filename: '48569-454825064_medium.mp4',
      url: '/assets/video/48569-454825064_medium.mp4',
      duration: '0:25',
      category: 'Deep Learning',
      description: 'Measuring token generation throughput, GPU VRAM allocation, and perplexity across 4-bit AWQ vs LoRA fine-tuned checkpoints.',
      posterBg: 'from-cyan-900 via-sky-950 to-black'
    }
  ],

  galleryMedia: [
    {
      id: 'arch-rag',
      title: 'DocuRAG Dual-Stream Hybrid Pipeline',
      category: 'Architecture',
      caption: 'BM25 + Dense Sentence Transformers with FlashRank Re-ranking',
      badge: 'LLM Systems'
    },
    {
      id: 'arch-mcp',
      title: 'Agentic MLOps FastMCP Server Execution',
      category: 'Agent System',
      caption: 'Claude Desktop client invoking local automated training tools',
      badge: 'MCP Protocol'
    },
    {
      id: 'arch-rank',
      title: 'NeuralRank Two-Stage Architecture',
      category: 'Machine Learning',
      caption: 'Faiss ANN semantic retrieval + LambdaMART decision forest',
      badge: 'ML Ranking'
    },
    {
      id: 'cert-oracle',
      title: 'Oracle Certified Associate Badge',
      category: 'Certifications',
      caption: 'Enterprise Agentic AI and Autonomous Agent Planning',
      badge: 'Oracle Verified'
    }
  ]
};
