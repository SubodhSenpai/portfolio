"use client";

import { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Terminal.css';

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
      'Hi! I\'m [Your Name]',
      'AI/ML Developer passionate about building intelligent systems',
      'Specialized in Python, TensorFlow, and backend development',
    ],
    // Add more commands here...
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

  return (
    <div className="terminal-container" data-theme={theme}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="button close"></span>
          <span className="button minimize"></span>
          <span className="button maximize"></span>
        </div>
        <div className="terminal-title">Subodh@portfolio:~</div>
      </div>
      
      <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
        {history.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.type === 'command' && <span className="prompt">Subodh@portfolio:~$ </span>}
            <span>{line.text}</span>
          </div>
        ))}
        
        <div className="terminal-input-line">
          <span className="prompt">visitor@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck={false}
          />
          <span className="cursor">|</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
