"use client";

import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolio';

type LineType = 'output' | 'command' | 'error';
type TerminalLine = { type: LineType; text: string; path?: string };

const Terminal = () => {
  const { theme, switchTheme } = useTheme();
  const [input, setInput] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<string>('~');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to My Portfolio Terminal' },
    { type: 'output', text: "Type 'help' for available commands" },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  const themes = ['dark', 'matrix', 'ubuntu', 'dracula', 'nord', 'monokai'] as const;

  const isThemeName = (value: string): value is typeof themes[number] =>
    (themes as readonly string[]).includes(value);

  // Project directories structure
  const projectDirectories: Record<string, { name: string; projects: any[] }> = {
    'web-development': {
      name: 'Web Development Projects',
      projects: portfolioData.projects
    }
  };

  // Sync cursor position with input ref
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Autocomplete function
  const handleAutocomplete = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const parts = trimmedInput.split(' ');
    const commandPart = parts[0].toLowerCase();

    // If typing a command (no space yet)
    if (parts.length === 1) {
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(commandPart));

      if (matches.length === 1) {
        setInput(matches[0] + ' ');
        setCursorPosition(matches[0].length + 1);
      } else if (matches.length > 1) {
        // Show suggestions
        setHistory(prev => [
          ...prev,
          { type: 'output', text: `Suggestions: ${matches.join(', ')}` }
        ]);
      }
      return;
    }

    // Autocomplete for specific commands with arguments
    if (commandPart === 'cd' && parts.length === 2) {
      const dirPart = parts[1].toLowerCase();
      const availableDirs = currentPath === '~'
        ? ['web-development', '..']
        : ['..', '~'];

      const matches = availableDirs.filter(dir => dir.startsWith(dirPart));

      if (matches.length === 1) {
        setInput(`cd ${matches[0]}`);
        setCursorPosition(`cd ${matches[0]}`.length);
      } else if (matches.length > 1) {
        setHistory(prev => [
          ...prev,
          { type: 'output', text: `Suggestions: ${matches.join(', ')}` }
        ]);
      }
    } else if (commandPart === 'theme' && parts.length === 2) {
      const themePart = parts[1].toLowerCase();
      const matches = themes.filter(t => t.startsWith(themePart));

      if (matches.length === 1) {
        setInput(`theme ${matches[0]}`);
        setCursorPosition(`theme ${matches[0]}`.length);
      } else if (matches.length > 1) {
        setHistory(prev => [
          ...prev,
          { type: 'output', text: `Suggestions: ${matches.join(', ')}` }
        ]);
      }
    }
  };

  const commands: Record<string, (args: string[]) => string[]> = {
    help: () => [
      'Available commands:',
      '  about      - Learn about me',
      '  skills     - View my technical skills',
      '  projects   - See my projects',
      '  cd <dir>   - Change directory (web-development)',
      '  ls         - List current directory contents',
      '  pwd        - Show current path',
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
      '  ║                      Hi! I\'m Subodh                       ║',
      '  ║               AI/ML & Full Stack Developer                ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  Passionate about building intelligent systems and crafting beautiful user experiences.',
      '',
      '  I love turning ideas into reality through code.',
      '',
      '  Currently focused on:',
      '     • Web Development (React, Next.js, TypeScript)',
      '     • AI/ML (Python, TensorFlow, PyTorch, LangChain, LangGraph)',
      '     • Backend Development (Node.js, Express, FastAPI)',
      '     • Database (MongoDB, PostgreSQL, Redis)',
      '     • DevOps (Docker, Kubernetes, AWS, Vercel)',
      '     • Version Control (Git, GitHub)',
      '     • UI/UX Design (Figma, Adobe XD, Sketch)',
      '     • Project Management (Jira)',
      '     • Communication (English, Hindi)',
      '     • Problem Solving (Debugging, Troubleshooting)',
      '     • Learning (Continuous Learning)',
      '',
    ],
    skills: () => [
      '',
      '  ╔═══════════════════════════════════════════════════════════╗',
      '  ║                    TECHNICAL SKILLS                       ║',
      '  ╚═══════════════════════════════════════════════════════════╝',
      '',
      '  FRONTEND',
      '  ├── React.js / Next.js          ████████████████    90%',
      '  ├── TypeScript / JavaScript     ████████████████    90%',
      '  ├── HTML5 / CSS3                █████████████████   95%',
      '  └── Tailwind CSS                ████████████████    90%',
      '',
      '  BACKEND',
      '  ├── Node.js / Express           ███████████████     85%',
      '  ├── Python / FastAPI            ████████████████    90%',
      '  ├── RESTful APIs                ████████████████    90%',
      '  └── GraphQL                     ██████████████      80%',
      '',
      '  DATABASE',
      '  ├── MongoDB                     ███████████████     85%',
      '  ├── PostgreSQL                  ██████████████      80%',
      '  └── Redis                       █████████████       75%',
      '',
      '  AI / ML',
      '  ├── Python                      ████████████████    90%',
      '  ├── TensorFlow / Keras          ███████████████     85%',
      '  ├── PyTorch                     ██████████████      80%',
      '  ├── LangChain / LangGraph       ███████████████     85%',
      '  └── Scikit-learn                ████████████████    90%',
      '',
      '  TOOLS & DEVOPS',
      '  ├── Git / GitHub                █████████████████   95%',
      '  ├── Docker                      ██████████████      80%',
      '  ├── Kubernetes                  █████████████       75%',
      '  ├── AWS / Vercel                ███████████████     85%',
      '  ├── Linux / Bash                ██████████████      80%',
      '  └── Grafana                     ████████████████    90%',
      '',
      '  PROJECT MANAGEMENT',
      '  └── Jira                        ████████████████    90%',
      '',
    ],
    projects: () => {
      // If inside a project directory, show ls instead
      if (currentPath !== '~') {
        return commands.ls([]);
      }

      return [
        '',
        '  ╔═══════════════════════════════════════════════════════════╗',
        '  ║                   PROJECT DIRECTORIES                     ║',
        '  ╚═══════════════════════════════════════════════════════════╝',
        '',
        '  📁 Available directories:',
        '',
        '     web-development/     - All Web Projects',
        '',
        '  💡 Use "cd <directory>" to explore projects',
        '  💡 Example: cd web-development',
        '',
      ];
    },
    pwd: () => [currentPath],
    ls: () => {
      if (currentPath === '~') {
        return [
          '',
          '  📁 web-development/',
          '',
        ];
      }

      const dir = currentPath.replace('~/projects/', '');
      const dirData = projectDirectories[dir];

      if (!dirData) return ['Directory not found'];

      if (dirData.projects.length === 0) {
        return ['', '  (empty directory)', ''];
      }

      const output = ['', `  ${dirData.name}:`, ''];
      dirData.projects.forEach((project, index) => {
        output.push(`  ${index + 1}. ${project.name} - ${project.description}`);
      });
      output.push('');
      output.push('  💡 Projects listed above');
      output.push('');

      return output;
    },
    cd: (args: string[]) => {
      if (!args[0]) {
        setCurrentPath('~');
        return ['Changed to home directory'];
      }

      const dir = args[0].toLowerCase();

      if (dir === '..' || dir === '~') {
        setCurrentPath('~');
        return ['Changed to home directory'];
      }

      if (projectDirectories[dir]) {
        setCurrentPath(`~/projects/${dir}`);
        const dirData = projectDirectories[dir];
        const output = ['', `  📁 ${dirData.name}`, ''];

        if (dirData.projects.length === 0) {
          output.push('  (no projects yet)');
        } else {
          dirData.projects.forEach((project, index) => {
            output.push(`  ${index + 1}. ${project.name}`);
            output.push(`     ${project.description}`);
            if (project.github) output.push(`     🔗 ${project.github}`);
            if (project.live) output.push(`     🌐 ${project.live}`);
            output.push(`     🛠️  ${project.tech}`);
            if (project.features) {
              output.push('     ⭐ Features:');
              project.features.forEach((f: string) => output.push(`        • ${f}`));
            }
            output.push('');
          });
        }

        output.push('  💡 Use "cd .." to go back');
        output.push('');

        return output;
      }

      return [`Directory not found: ${dir}`, 'Available: web-development'];
    },
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
      '  │      subodh00new@gmail.com                              │',
      '  │                                                         │',
      '  │   📞 PHONE                                              │',
      '  │      +91-9759200217                                     │',
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
      '  ├── 🚀 Projects: 5+ Completed',
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

    // Add command to display with current path
    setHistory(prev => [...prev, { type: 'command', text: trimmedCmd, path: currentPath }]);

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
      setCursorPosition(0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const newInput = commandHistory[newIndex];
        setInput(newInput);
        setCursorPosition(newInput.length);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
          setCursorPosition(0);
        } else {
          setHistoryIndex(newIndex);
          const newInput = commandHistory[newIndex];
          setInput(newInput);
          setCursorPosition(newInput.length);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCursorPosition(prev => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCursorPosition(prev => Math.min(input.length, prev + 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCursorPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCursorPosition(input.length);
    }
  };

  const lineColors = {
    command: 'text-[var(--text-primary)]',
    output: 'text-[var(--text-secondary)]',
    error: 'text-[var(--error)]',
  };

  // Function to render text with clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline hover:text-[var(--text-primary)] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
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
        <div className="text-[var(--text-muted)] text-sm">Subodh@portfolio:{currentPath}</div>
      </div>

      {/* Body */}
      <div
        ref={terminalBodyRef}
        className="p-5 h-[calc(100%-50px)] overflow-y-auto text-[var(--text-primary)] text-base leading-relaxed scrollbar-thin scrollbar-track-[var(--bg-primary)] scrollbar-thumb-[var(--text-muted)]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className={`mb-1 whitespace-pre-wrap break-words ${lineColors[line.type]}`}>
            {line.type === 'command' && (
              <span className="text-[var(--accent)] font-bold">Subodh@portfolio:{line.path || '~'}$ </span>
            )}
            <span>{renderTextWithLinks(line.text)}</span>
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center">
          <span className="text-[var(--accent)] font-bold">Subodh@portfolio:{currentPath}$ </span>
          <div className="relative inline-flex items-center">
            <span className="text-[var(--accent)] whitespace-pre">
              {input.slice(0, cursorPosition)}
            </span>
            <span className="text-[var(--accent)] animate-blink">█</span>
            <span className="text-[var(--accent)] whitespace-pre">
              {input.slice(cursorPosition)}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setCursorPosition(e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.selectionStart !== null) {
                  setCursorPosition(target.selectionStart);
                }
              }}
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
