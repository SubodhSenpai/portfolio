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
  // Keys are used as the category headings in both the visual and terminal portfolios
  skills: {
    "LLM & Agents": [
      { name: "Multi-Agent Systems", level: 95 },
      { name: "RAG Pipelines", level: 95 },
      { name: "Agent Evals & Guardrails", level: 95 },
      { name: "Tool / Function Calling", level: 92 },
      { name: "Prompt Engineering", level: 92 },
      { name: "LLM APIs (OpenAI / Gemini)", level: 90 },
    ],
    "AI / ML": [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 90 },
      { name: "Model Evaluation & Tuning", level: 90 },
      { name: "Feature Engineering", level: 88 },
      { name: "Deep Learning", level: 85 },
    ],
    "AI / ML Tools": [
      { name: "LangGraph", level: 95 },
      { name: "LangChain", level: 92 },
      { name: "Scikit-learn", level: 90 },
      { name: "XGBoost", level: 90 },
      { name: "Pandas / NumPy", level: 88 },
      { name: "ChromaDB (Vector DB)", level: 88 },
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow / Keras", level: 85 },
    ],
    "Frontend": [
      { name: "React.js / Next.js", level: 80 },
      { name: "TypeScript / JavaScript", level: 80 },
      { name: "HTML5 / CSS3", level: 80 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Shadcn UI / Framer Motion", level: 70 },
    ],
    "Backend": [
      { name: "Python / FastAPI", level: 85 },
      { name: "RESTful APIs", level: 80 },
      { name: "Node.js / Express", level: 75 },
      { name: "WebSockets / SSE Streaming", level: 75 },
      { name: "GraphQL", level: 65 },
    ],
    "Database": [
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 75 },
      { name: "SQLite", level: 75 },
      { name: "Redis", level: 65 },
    ],
    "Tools & DevOps": [
      { name: "Git / GitHub", level: 85 },
      { name: "AWS / Vercel", level: 75 },
      { name: "Grafana", level: 75 },
      { name: "GitHub Actions / pytest", level: 75 },
      { name: "Jira", level: 75 },
      { name: "Docker", level: 70 },
      { name: "Linux / Bash", level: 70 },
      { name: "Kubernetes", level: 60 },
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
