export const portfolioData = {
  personal: {
    name: "Subodh",
    role: "AI/ML & Full Stack Developer",
    description: "Passionate about building intelligent systems and crafting beautiful user experiences. I love turning ideas into reality through code.",
    location: "Remote",
    email: "subodh00new@gmail.com",
    phone: "+91-9759200217",
    links: {
      linkedin: "https://www.linkedin.com/in/subodh-sooby/",
      github: "https://github.com/SubodhSenpai",
    },
    quickStats: [
      { label: "Education", value: "B.Tech in Computer Science" },
      { label: "Experience", value: "2+ Years" },
      { label: "Projects", value: "5+ Completed" },
    ]
  },
  skills: {
    frontend: [
      { name: "React.js / Next.js", level: 90 },
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Shadcn UI / Framer Motion", level: 85 },
    ],
    backend: [
      { name: "Node.js / Express", level: 85 },
      { name: "Python / FastAPI", level: 90 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 80 },
      { name: "WebSockets / SSE Streaming", level: 85 },
    ],
    database: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
      { name: "SQLite", level: 85 },
      { name: "ChromaDB (Vector DB)", level: 85 },
    ],
    aiml: [
      { name: "Python", level: 90 },
      { name: "TensorFlow / Keras", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "LangChain / LangGraph", level: 85 },
      { name: "Scikit-learn", level: 90 },
      { name: "XGBoost", level: 85 },
      { name: "Multi-Agent Systems / RAG", level: 90 },
      { name: "LLM & Agent Evaluation", level: 85 },
    ],
    tools: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 75 },
      { name: "AWS / Vercel", level: 85 },
      { name: "Linux / Bash", level: 80 },
      { name: "Grafana", level: 90 },
      { name: "GitHub Actions / pytest", level: 80 },
      { name: "Jira", level: 90 },
    ]
  },
  experience: [
    {
      role: "Software Engineer (DRDO)",
      company: "Clarice Systems",
      location: "On-Site",
      period: "June 2024 – 2026",
      achievements: [
        "Built XGBoost threat-detection models for 1Gbps binary stream classification",
        "Built the operator console for a five-agent system showing each agent's state, tool calls and findings",
        "Cut a slow query path from 12s to under 3s by reworking queries and indexes",
        "Optimized Python desktop applications",
        "Presented technical demos to DRDO teams in Delhi",
        "Tech: Python, ReactJS, NodeJS, MongoDB, .Net, XGBoost"
      ]
    },
    {
      role: "Data Engineer Intern",
      company: "Ati Motors",
      location: "On-Site",
      period: "Jan 2024 – June 2024",
      achievements: [
        "Built 'Robo Observatory' for real-time robot fleet monitoring",
        "Optimized database queries by 20% via indexing strategies",
        "Developed Multimodal RAG service with Jira/Slack integrations",
        "Analyzed robot failures and battery wear to raise early warnings",
        "Tech: Python, LLMs, Langchain, Grafana, Postgres, React"
      ]
    }
  ],
  aiProjects: [
    {
      name: "RegShield",
      description: "Regression Tests for AI Agent Behaviour",
      github: "https://github.com/SubodhSenpai/RegShield",
      live: "https://regshield-lyart.vercel.app",
      tech: "Python, LangChain, LangGraph, smolagents, pytest, GitHub Actions",
      features: [
        "Fails CI when an agent's tool calls, arguments or call order regress",
        "Deterministic trace checks run offline in milliseconds, no LLM needed",
        "Checks approvals, multi-agent handoffs, routing & parallel calls",
        "Plugs into LangChain, LangGraph & smolagents; published on PyPI",
      ]
    },
    {
      name: "DataLens",
      description: "AI-Powered Data Q&A over CSV & Excel Files",
      github: "https://github.com/SubodhSenpai/Datalens",
      live: "https://datalens-six-rouge.vercel.app/",
      tech: "Next.js, TypeScript, Tailwind CSS, Recharts, Gemini / OpenRouter, Vercel Blob",
      features: [
        "Ask plain-English questions across multiple uploaded files",
        "LLM plans the query, a deterministic engine computes the answer",
        "Infers table relationships and cleans messy data ('9.5 lakh', -999 codes, °F/°C)",
        "Every answer comes with a chart and full trace; 33/33 single-file accuracy",
      ]
    },
    {
      name: "ResearchAgent",
      description: "LangGraph Multi-Agent AI Research Assistant",
      github: "https://github.com/SubodhSenpai/ResearchAgent",
      live: "https://research-agent-eight-rho.vercel.app",
      tech: "Python, LangGraph, LangChain, FastAPI (SSE), Next.js, PageIndex, SQLite, Tavily",
      features: [
        "Supervisor, researcher, validator, analyst, critic & writer agents",
        "Critic loop sends work back until quality score clears 0.75 (max 5 rounds)",
        "Vectorless document retrieval with PageIndex plus live web search",
        "SQLite evidence graph links every claim to its source & flags contradictions",
      ]
    }
  ],
  projects: [
    {
      name: "Trendora",
      description: "Fashion Discovery Landing Page",
      github: "https://github.com/SubodhSenpai/trendora",
      live: "https://trendora-lime.vercel.app/",
      tech: "Next.js, TypeScript, Tailwind CSS, Lucide React",
      features: [
        "Fully responsive design (mobile, tablet, desktop)",
        "TikTok-style vertical swipe feed for outfit discovery",
        "Modern gradient designs & glassmorphism effects",
        "Interactive demo sections with hover effects",
      ]
    },
    {
      name: "Admin Dashboard",
      description: "Full-Stack Inventory Management System",
      github: "https://github.com/SubodhSenpai/admin",
      live: "https://admin-six-umber.vercel.app/",
      tech: "Next.js, TypeScript, Shadcn UI, Tailwind CSS, React Hook Form + Zod, DummyJSON API",
      features: [
        "Complete CRUD operations for 190+ products",
        "Advanced data tables with filtering, sorting, and pagination",
        "Persistent Dark/Light theme mode with seamless toggle",
        "Responsive sidebar navigation & real-time search",
      ]
    },
    {
      name: "Interactive Dual-Mode Portfolio",
      description: "Next-Gen Personal Website with Physics Engine",
      github: "https://github.com/SubodhSenpai/portfolio",
      live: "https://portfolio-one-wheat-38.vercel.app/",
      tech: "Next.js, TypeScript, Tailwind CSS, Framer Motion, Matter.js",
      features: [
        "Dual-Interface System: Visual Portfolio vs. Functional Terminal",
        "Physics-Driven 'Cursor Bubble' & Particle Field (Matter.js)",
        "Fully Interactive Command-Line Interface (CLI) for Devs",
        "High-performance animations with Framer Motion & Canvas",
      ]
    }
  ]
};
