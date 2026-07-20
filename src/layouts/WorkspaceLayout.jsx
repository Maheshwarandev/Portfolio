import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Briefcase, 
  Cpu, 
  Milestone, 
  Mail, 
  Sun, 
  Moon, 
  Search, 
  Command,
  Clock,
  Wifi,
  User,
  Home,
  FileDown
} from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { useTheme } from '../hooks/useTheme';
import { personalInfo } from '../data/portfolioData';

export function WorkspaceLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [latency, setLatency] = useState(14);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update simulated latency
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next > 8 && next < 30 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handle Command+K / Ctrl+K keydown for command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutGrid },
    { path: '/about', label: 'About Operator', icon: User },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/tech-stack', label: 'Tech Stack', icon: Cpu },
    { path: '/journey', label: 'Journey', icon: Milestone },
    { path: '/github', label: 'GitHub Activity', icon: Github },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  // Mobile Bottom Navigation Bar Items
  const mobileNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/projects', label: 'Projects', icon: Briefcase },
    { path: '/about', label: 'About', icon: User },
    { path: '/github', label: 'GitHub', icon: Github },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] relative flex flex-col overflow-x-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300 pb-16 md:pb-0">
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50 dark:opacity-20 z-0" />
      
      {/* Dynamic gradient background glows (very subtle) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0 dark:bg-indigo-900/10" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none z-0 dark:bg-emerald-950/5" />

      {/* MOBILE COMPACT TOP HEADER */}
      <div className="md:hidden sticky top-0 z-30 w-full backdrop-blur-md bg-[var(--bg-app)]/85 border-b border-[var(--border-color)] h-14 flex items-center justify-between px-4">
        <Link to="/" className="font-heading font-extrabold text-[var(--text-primary)] text-sm tracking-tight flex items-center space-x-2">
          <img src="/favicon.svg" alt="MW Logo" className="w-5 h-5 rounded-md shadow-sm" />
          <span>maheshwaran.dev</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 font-mono text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{latency}ms</span>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-[var(--border-color)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={12} className="text-yellow-400" /> : <Moon size={12} />}
          </button>
        </div>
      </div>

      {/* DESKTOP STICKY DOUBLE HEADER */}
      <header className="hidden md:block sticky top-0 z-30 w-full backdrop-blur-md bg-[var(--bg-app)]/85 border-b border-[var(--border-color)]">
        
        {/* BAR 1: Status & branding info */}
        <div className="w-full px-4 md:px-8 lg:px-16 h-12 flex items-center justify-between text-xs text-[var(--text-secondary)] border-b border-[var(--border-color)]/60">
          
          {/* Left alignment group */}
          <div className="flex items-center space-x-6">
            {/* Logo / Title */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="font-heading font-extrabold text-[var(--text-primary)] text-sm tracking-tight flex items-center space-x-2">
                <img src="/favicon.svg" alt="MW Logo" className="w-5 h-5 rounded-md shadow-sm" />
                <span>maheshwaran.dev</span>
              </Link>
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">
                v1.2.0-stable
              </span>
            </div>

            {/* Search trigger resembling Cmd+K */}
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center justify-between w-60 px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-zinc-400 dark:hover:border-zinc-500 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 transition cursor-pointer shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Search size={13} className="text-[var(--text-secondary)]" />
                <span className="text-xs">Search workspace...</span>
              </div>
              <div className="flex items-center space-x-0.5 text-[9px] font-mono bg-zinc-200/60 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-300/40 dark:border-zinc-700/60 opacity-90 shrink-0">
                <Command size={9} />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* System Environment States */}
          <div className="flex items-center space-x-6 font-mono text-[11px]">
            {/* Live Indicator */}
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-soft" />
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready</span>
            </div>
            
            {/* Latency */}
            <div className="hidden sm:flex items-center space-x-1.5">
              <Wifi size={12} />
              <span>{latency}ms ping</span>
            </div>

            {/* Time */}
            <div className="hidden sm:flex items-center space-x-1.5 border-l border-[var(--border-color)] pl-4">
              <Clock size={12} />
              <span>{time}</span>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-1 rounded-md border border-[var(--border-color)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={13} className="text-yellow-400" /> : <Moon size={13} />}
            </button>
          </div>
        </div>

        {/* BAR 2: App tabs navigation */}
        <div className="w-full px-4 md:px-8 lg:px-16 h-14 flex items-center justify-between">
          <nav className="flex space-x-1 md:space-x-2 overflow-x-auto no-scrollbar w-full py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-[var(--text-primary)] font-semibold' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon size={14} className="opacity-80" />
                  <span>{item.label}</span>
                  
                  {/* Slider Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg -z-10 border border-zinc-200/50 dark:border-zinc-700/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* COMMAND PALETTE DIALOG MOCK */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl shadow-2xl overflow-hidden z-10"
            >
              <div className="flex items-center space-x-2 px-4 py-3 border-b border-[var(--border-color)]">
                <Search size={16} className="text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  placeholder="Type a page name, project, or tech stack..." 
                  className="w-full bg-transparent border-0 text-sm focus:outline-none focus:ring-0 placeholder:text-[var(--text-secondary)]"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.target.value.toLowerCase().trim();
                      if (val === 'dashboard' || val === 'home') window.location.href = '/';
                      else if (val === 'about') window.location.href = '/about';
                      else if (val === 'projects') window.location.href = '/projects';
                      else if (val === 'tech stack' || val === 'skills') window.location.href = '/tech-stack';
                      else if (val === 'journey' || val === 'timeline') window.location.href = '/journey';
                      else if (val === 'github') window.location.href = '/github';
                      else if (val === 'contact') window.location.href = '/contact';
                      setCommandPaletteOpen(false);
                    }
                  }}
                />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border font-mono">ESC</span>
              </div>
              <div className="p-2 text-xs text-[var(--text-secondary)]">
                <div className="px-3 py-1 font-mono uppercase text-[9px] tracking-wider font-semibold">Quick Pages</div>
                <div className="grid grid-cols-2 gap-1 p-1">
                  {navItems.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setCommandPaletteOpen(false)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[var(--text-primary)]"
                    >
                      <item.icon size={14} className="opacity-80" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-full px-4 md:px-8 lg:px-16 py-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER - Hidden on Mobile */}
      <footer className="hidden md:block w-full border-t border-[var(--border-color)]/60 bg-[var(--bg-app)]/50 py-6 text-xs text-[var(--text-secondary)] font-mono">
        <div className="w-full px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition">GitHub</a>
            <span>&bull;</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] transition">LinkedIn</a>
            <span>&bull;</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </footer>


      {/* STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--bg-surface)]/90 backdrop-blur-md border-t border-[var(--border-color)] z-40 flex items-center justify-around px-2 pb-safe shadow-lg">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center space-y-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition w-16 h-full"
              >
                <Icon size={18} className="opacity-80" />
                <span className="text-[9px] font-medium font-heading">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 relative w-16 h-full ${
                isActive ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon size={18} className="opacity-80" />
              <span className="text-[9px] font-medium font-heading">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
export default WorkspaceLayout;
