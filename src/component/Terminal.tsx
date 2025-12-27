"use client";

import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

type LineType = 'output' | 'command' | 'error';
type TerminalLine = { type: LineType; text: string };

const Terminal = () => {
  const { theme, switchTheme } = useTheme();
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to My Portfolio Terminal' },
    { type: 'output', text: "Type 'help' for available commands" },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const themes = ['dark', 'matrix', 'ubuntu', 'dracula', 'nord', 'monokai'] as const;

  const isThemeName = (value: string): value is typeof themes[number] =>
    (themes as readonly string[]).includes(value);

  const commands: Record<string, (args: string[]) => string[]> = {
    help: () => [
      'Available commands:',
      '  about      - Learn about me',
      '  skills     - View my technical skills',
      '  projects   - See my projects',
      '  experience - View work experience',
      '  contact    - Get contact information',
      '  resume     - Download resume',
      '  themes     - List available themes',
      '  theme <name> - Switch to a theme',
      '  clear      - Clear terminal',
      '  history    - Show command history',
    ],
    themes: () => [
      'Available themes:',
      ...themes.map(t => `  ${t}`),
      '',
      "Use 'theme <name>' to switch themes",
    ],
    theme: (args: string[]) => {
      if (!args[0]) return ['Usage: theme <name>'];
      const themeName = args[0].toLowerCase();
      if (isThemeName(themeName)) {
        switchTheme(themeName);
        return [`Theme switched to: ${themeName}`];
      }
      return [`Theme '${themeName}' not found. Type 'themes' to see available themes.`];
    },
    clear: () => {
      setHistory([]);
      return [];
    },
    history: () => commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`),
    about: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                                                           ║',
      '  ║   Hi! I\'m Subodh 👋                                       ║',
      '  ║                                                           ║',
      '  ║   Full Stack Developer & AI/ML Enthusiast                 ║',
      '  ║                                                           ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  🚀 Passionate about building intelligent systems and',
      '     crafting beautiful user experiences.',
      '',
      '  💻 I love turning ideas into reality through code.',
      '',
      '  🎯 Currently focused on:',
      '     • Web Development (React, Next.js, TypeScript)',
      '     • AI/ML (Python, TensorFlow, PyTorch)',
      '     • Backend Development (Node.js, Express)',
      '',
      '  📍 Based in India',
      '',
      '  Type "skills" to see my technical skills',
      '  Type "projects" to view my work',
      '  Type "contact" to get in touch',
      '',
    ],
    skills: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                    TECHNICAL SKILLS                       ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  ⚡ FRONTEND',
      '  ├── React.js / Next.js          ████████████████░░  90%',
      '  ├── TypeScript / JavaScript     ████████████████░░  90%',
      '  ├── HTML5 / CSS3                █████████████████░  95%',
      '  └── Tailwind CSS                ████████████████░░  90%',
      '',
      '  🔧 BACKEND',
      '  ├── Node.js / Express           ███████████████░░░  85%',
      '  ├── Python / FastAPI            ████████████████░░  90%',
      '  ├── RESTful APIs                ████████████████░░  90%',
      '  └── GraphQL                     ██████████████░░░░  80%',
      '',
      '  🗄️ DATABASE',
      '  ├── MongoDB                     ███████████████░░░  85%',
      '  ├── PostgreSQL                  ██████████████░░░░  80%',
      '  └── Redis                       █████████████░░░░░  75%',
      '',
      '  🤖 AI / ML',
      '  ├── TensorFlow / Keras          ███████████████░░░  85%',
      '  ├── PyTorch                     ██████████████░░░░  80%',
      '  ├── Scikit-learn                ████████████████░░  90%',
      '  └── OpenAI / LangChain          ███████████████░░░  85%',
      '',
      '  🛠️ TOOLS & DEVOPS',
      '  ├── Git / GitHub                █████████████████░  95%',
      '  ├── Docker                      ██████████████░░░░  80%',
      '  ├── AWS / Vercel                ███████████████░░░  85%',
      '  └── Linux / Bash                ████████████████░░  90%',
      '',
    ],
    projects: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                      MY PROJECTS                          ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  📁 PROJECT 1: AI-Powered Chat Application',
      '  ├── 🔗 github.com/subodh/ai-chat-app',
      '  ├── 📝 Real-time chat with AI integration using OpenAI API',
      '  ├── 🛠️ Tech: Next.js, TypeScript, Socket.io, OpenAI',
      '  └── ⭐ Features: Real-time messaging, AI responses, Auth',
      '',
      '  ─────────────────────────────────────────────────────────────',
      '',
      '  📁 PROJECT 2: E-Commerce Platform',
      '  ├── 🔗 github.com/subodh/ecommerce-platform',
      '  ├── 📝 Full-stack e-commerce with payment integration',
      '  ├── 🛠️ Tech: React, Node.js, MongoDB, Stripe',
      '  └── ⭐ Features: Cart, Payments, Admin Dashboard',
      '',
      '  ─────────────────────────────────────────────────────────────',
      '',
      '  📁 PROJECT 3: ML Image Classifier',
      '  ├── 🔗 github.com/subodh/image-classifier',
      '  ├── 📝 Deep learning model for image classification',
      '  ├── 🛠️ Tech: Python, TensorFlow, FastAPI, Docker',
      '  └── ⭐ Features: 95% accuracy, REST API, GPU support',
      '',
      '  ─────────────────────────────────────────────────────────────',
      '',
      '  📁 PROJECT 4: Task Management Dashboard',
      '  ├── 🔗 github.com/subodh/task-dashboard',
      '  ├── 📝 Kanban-style task management application',
      '  ├── 🛠️ Tech: Next.js, Prisma, PostgreSQL, Tailwind',
      '  └── ⭐ Features: Drag-n-drop, Teams, Real-time sync',
      '',
      '  💡 Type "contact" to discuss project collaborations!',
      '',
    ],
    experience: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                    WORK EXPERIENCE                        ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  🏢 FULL STACK DEVELOPER',
      '  ├── 📍 Company Name | Remote',
      '  ├── 📅 Jan 2023 - Present',
      '  ├── ✨ Led development of microservices architecture',
      '  ├── ✨ Built real-time features using WebSocket',
      '  ├── ✨ Improved API response time by 40%',
      '  └── 🛠️ React, Node.js, PostgreSQL, AWS',
      '',
      '  ─────────────────────────────────────────────────────────────',
      '',
      '  🏢 SOFTWARE ENGINEER INTERN',
      '  ├── 📍 Tech Startup | Hybrid',
      '  ├── 📅 Jun 2022 - Dec 2022',
      '  ├── ✨ Developed ML models for data analysis',
      '  ├── ✨ Created REST APIs for mobile applications',
      '  ├── ✨ Collaborated in agile development team',
      '  └── 🛠️ Python, FastAPI, TensorFlow, Docker',
      '',
      '  ─────────────────────────────────────────────────────────────',
      '',
      '  🏢 FREELANCE DEVELOPER',
      '  ├── 📍 Self-Employed | Remote',
      '  ├── 📅 2021 - 2022',
      '  ├── ✨ Built 10+ web applications for clients',
      '  ├── ✨ Delivered projects on time and budget',
      '  ├── ✨ Maintained 5-star client rating',
      '  └── 🛠️ React, Next.js, MongoDB, Firebase',
      '',
      '  📄 Type "resume" to download my full resume!',
      '',
    ],
    contact: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                    GET IN TOUCH                           ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  📬 I\'d love to hear from you! Reach out via:',
      '',
      '  ┌─────────────────────────────────────────────────────────┐',
      '  │                                                         │',
      '  │   📧 EMAIL                                              │',
      '  │      subodh@example.com                                 │',
      '  │                                                         │',
      '  │   💼 LINKEDIN                                           │',
      '  │      linkedin.com/in/subodh                             │',
      '  │                                                         │',
      '  │   🐙 GITHUB                                             │',
      '  │      github.com/subodh                                  │',
      '  │                                                         │',
      '  │   🐦 TWITTER                                            │',
      '  │      twitter.com/subodh                                 │',
      '  │                                                         │',
      '  │   🌐 PORTFOLIO                                          │',
      '  │      subodh.dev                                         │',
      '  │                                                         │',
      '  └─────────────────────────────────────────────────────────┘',
      '',
      '  💬 Open for:',
      '     • Full-time opportunities',
      '     • Freelance projects',
      '     • Open source collaborations',
      '     • Technical discussions',
      '',
      '  ⚡ Response time: Usually within 24 hours!',
      '',
    ],
    resume: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                       RESUME                              ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  📄 Download my resume:',
      '',
      '  ┌─────────────────────────────────────────────────────────┐',
      '  │                                                         │',
      '  │   📥 PDF VERSION                                        │',
      '  │      → drive.google.com/subodh-resume.pdf               │',
      '  │                                                         │',
      '  │   📋 ONLINE VERSION                                     │',
      '  │      → subodh.dev/resume                                │',
      '  │                                                         │',
      '  └─────────────────────────────────────────────────────────┘',
      '',
      '  📊 Quick Stats:',
      '  ├── 🎓 Education: B.Tech in Computer Science',
      '  ├── 💼 Experience: 2+ Years',
      '  ├── 🚀 Projects: 15+ Completed',
      '  └── ⭐ Certifications: AWS, Google Cloud',
      '',
      '  📝 Resume Highlights:',
      '     • Full Stack Development expertise',
      '     • AI/ML project experience',
      '     • Strong problem-solving skills',
      '     • Excellent communication abilities',
      '',
      '  💡 Type "experience" for detailed work history!',
      '',
    ],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command to display
    setHistory(prev => [...prev, { type: 'command', text: trimmedCmd }]);

    // Parse command
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');

    // Execute command
    if (commands[command]) {
      const output = commands[command](args);
      if (output.length > 0) {
        setHistory(prev => [
          ...prev,
          ...output.map((text): TerminalLine => ({ type: 'output', text })),
        ]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', text: `Command not found: ${command}. Type 'help' for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Implement autocomplete here
    }
  };

  const lineColors = {
    command: 'text-[var(--text-primary)]',
    output: 'text-[var(--text-secondary)]',
    error: 'text-[var(--error)]',
  };

  return (
    <div 
      className="w-screen h-screen bg-[var(--bg-primary)] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] font-mono transition-all duration-300"
      data-theme={theme}
    >
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] p-2.5 flex items-center gap-2.5">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        </div>
        <div className="text-[var(--text-muted)] text-sm">Subodh@portfolio:~</div>
      </div>
      
      {/* Body */}
      <div 
        className="p-5 h-[calc(100%-50px)] overflow-y-auto text-[var(--text-primary)] text-base leading-relaxed scrollbar-thin scrollbar-track-[var(--bg-primary)] scrollbar-thumb-[var(--text-muted)]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className={`mb-1 whitespace-pre-wrap break-words ${lineColors[line.type]}`}>
            {line.type === 'command' && (
              <span className="text-[var(--accent)] font-bold">Subodh@portfolio:~$ </span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center">
          <span className="text-[var(--accent)] font-bold">Subodh@portfolio:~$ </span>
          <div className="relative inline-flex items-center">
            <span className="text-[var(--accent)] whitespace-pre">{input}</span><span className="text-[var(--accent)] animate-blink">|</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute left-0 top-0 w-full h-full bg-transparent border-none outline-none text-transparent font-inherit text-inherit caret-transparent"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
