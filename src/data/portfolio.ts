export const portfolioData = {
  personal: {
    name: "Subodh",
    role: "AI/ML & Full Stack Developer",
    description: "Passionate about building intelligent systems and crafting beautiful user experiences. I love turning ideas into reality through code.",
    location: "Remote",
    email: "subodh00new@gmail.com",
    phone: "+91-9759200217",
    links: {
      linkedin: "https://linkedin.com/in/subodh",
      github: "https://github.com/subodh",
      twitter: "https://twitter.com/subodh",
      website: "https://subodh.dev",
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
    ],
    backend: [
      { name: "Node.js / Express", level: 85 },
      { name: "Python / FastAPI", level: 90 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 80 },
    ],
    database: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
    ],
    aiml: [
      { name: "Python", level: 90 },
      { name: "TensorFlow / Keras", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "LangChain / LangGraph", level: 85 },
      { name: "Scikit-learn", level: 90 },
    ],
    tools: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 75 },
      { name: "AWS / Vercel", level: 85 },
      { name: "Linux / Bash", level: 80 },
      { name: "Grafana", level: 90 },
    ]
  },
  experience: [
    {
      role: "Software Engineer",
      company: "ImpactQA (DRDO)",
      location: "On-Site",
      period: "June 2024 – Present",
      achievements: [
        "Developed AI/ML modules for 1Gbps binary stream classification",
        "Built interactive web interfaces for multi-individual systems",
        "Optimized Python desktop applications",
        "Presented technical demos to DRDO stakeholders",
        "Tech: Python, ReactJS, NodeJS, MongoDB, .Net, XGBoost"
      ]
    },
    {
      role: "Data Engineer Intern",
      company: "Ati Motors",
      location: "On-Site",
      period: "Jan 2024 – June 2024",
      achievements: [
        "Built 'Robo Observatory' for real-time robot monitoring",
        "Optimized database queries by 20% via indexing strategies",
        "Developed Multimodal RAG service with Jira/Slack integrations",
        "Researched battery decay prediction algorithms",
        "Tech: Python, LLMs, Langchain, Grafana, Postgres, React"
      ]
    }
  ],
  projects: [
    {
      name: "Trendora",
      description: "Fashion Discovery Landing Page",
      github: "https://github.com/SubodhSenpai/trendora",
      live: "https://trendora-lime.vercel.app/",
      tech: "Next.js, TypeScript, Tailwind CSS, Shadcn UI",
      features: [
        "Fully responsive design (mobile, tablet, desktop)",
        "Smooth animations & interactive UI components",
        "Modern gradient designs & glassmorphism effects",
        "Interactive demo sections with hover effects",
      ]
    },
    {
      name: "Admin Dashboard",
      description: "Full-Stack Inventory Management System",
      github: "https://github.com/SubodhSenpai/admin-dashboard", // Assuming generic or leaving placeholder if unknown. I'll use the live link mostly.
      live: "https://admin-six-umber.vercel.app/",
      tech: "Next.js, TypeScript, Shadcn UI, Tailwind CSS, Public API",
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
      github: "https://github.com/SubodhSenpai/portfolio-one", // Placeholder/Generic if unknown
      live: "https://portfolio-one-wheat-38.vercel.app/",
      tech: "Next.js, TypeScript, Tailwind CSS, Framer Motion, Canvas API",
      features: [
        "Dual-Interface System: Visual Portfolio vs. Functional Terminal",
        "Custom Physics Engine: Interactive 'Cursor Bubble' & Particle Field",
        "Fully Interactive Command-Line Interface (CLI) for Devs",
        "High-performance animations with Framer Motion & Canvas",
      ]
    }
  ]
};
