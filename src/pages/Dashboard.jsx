import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  MapPin, 
  Sparkles, 
  GitCommit, 
  BookOpen, 
  FileText, 
  Mail, 
  Zap, 
  Code2,
  FileDown,
  ExternalLink,
  Laptop,
  Globe
} from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';
import { personalInfo, projectsData, githubActivity } from '../data/portfolioData';
import { useGitHub } from '../hooks/useGitHub';

export function Dashboard() {
  const githubData = useGitHub('Maheshwarandev');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const activeFeaturedProject = projectsData[featuredIndex] || projectsData[0];
  const recentCommits = githubData.commits && githubData.commits.length > 0 ? githubData.commits.slice(0, 3) : githubActivity.commits.slice(0, 3);
  const featuredProjects = projectsData; // Show all 4 projects

  // Only show the top critical skills on mobile dashboard
  const mobileSkills = ["React", "Node.js", "Express", "MongoDB", "MySQL", "JavaScript", "Tailwind CSS", "Git"];

  return (
    <div className="space-y-6">
      
      {/* ========================================================
          1. MOBILE LAYOUT (320px - 768px)
          ======================================================== */}
      <div className="block md:hidden space-y-6">
        
        {/* ABOVE-THE-FOLD HERO NODE */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-indigo-500" />
          
          {/* Avatar and availability pulse */}
          <div className="relative">
            {personalInfo.avatar ? (
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.name} 
                className="h-24 w-24 rounded-full object-cover object-top border-2 border-[var(--border-color)] shadow-md"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-heading text-2xl font-bold shadow-md">
                MW
              </div>
            )}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-surface)] animate-pulse" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">
              {personalInfo.name}
            </h2>
            <p className="text-xs font-mono text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
              {personalInfo.title}
            </p>
            <div className="flex flex-col items-center gap-1.5 mt-1">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN TO WORK</span>
              </span>
              <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)] font-mono">
                <div className="flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>{personalInfo.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <Globe size={12} />
                  <a href="https://maheshwaran.dev" target="_blank" rel="noreferrer" className="hover:underline">
                    maheshwaran.dev
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
            {personalInfo.focus}
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="w-full space-y-2 pt-2">
            <a 
              href={personalInfo.resume}
              download
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black text-xs font-mono font-bold shadow transition cursor-pointer"
            >
              <FileDown size={14} />
              <span>Download Resume</span>
            </a>

            <div className="grid grid-cols-3 gap-2">
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1 py-2 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono text-[var(--text-primary)] font-semibold transition cursor-pointer"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1 py-2 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono text-[var(--text-primary)] font-semibold transition cursor-pointer"
              >
                <Linkedin size={12} />
                <span>LinkedIn</span>
              </a>
              <Link 
                to="/contact"
                className="flex items-center justify-center space-x-1 py-2 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono text-[var(--text-primary)] font-semibold transition cursor-pointer"
              >
                <Mail size={12} />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>

        {/* COMPACT SKILLS NODES */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Core Competencies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {mobileSkills.map(skill => (
              <span 
                key={skill} 
                className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-[var(--text-primary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* TOP 3 FEATURED PROJECTS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Featured Workspaces
            </h3>
            <Link to="/projects" className="text-[10px] font-mono text-indigo-500 hover:underline">
              View all &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {featuredProjects.map(project => (
              <div 
                key={project.id} 
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-3 group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-heading font-extrabold text-[var(--text-primary)]">
                      {project.name}
                    </h4>
                    <p className="text-[10px] text-[var(--text-secondary)] font-mono">{project.tagline}</p>
                  </div>
                  <span className="text-[9px] font-mono border px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 shrink-0">
                    Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[9px] font-mono px-1.5 py-0.2 bg-zinc-100 dark:bg-zinc-800 rounded text-[var(--text-secondary)]">
                      {tech}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  className="w-full flex items-center justify-center space-x-1.5 py-1.5 border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 rounded-lg text-[10px] font-mono text-[var(--text-primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  <span>View Details Report</span>
                  <ArrowUpRight size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* GITHUB COMPACT SUMMARY */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center space-x-1.5">
              <Github size={12} />
              <span>GitHub Diagnostics</span>
            </h3>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg p-3 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[var(--text-secondary)] block uppercase">Public Repos</span>
              <span className="text-sm font-heading font-extrabold text-[var(--text-primary)]">{githubActivity.stats.repositories}</span>
            </div>
            <div>
              <span className="text-[9px] text-[var(--text-secondary)] block uppercase">Total Commits</span>
              <span className="text-sm font-heading font-extrabold text-[var(--text-primary)]">{githubActivity.stats.totalCommits}+</span>
            </div>
          </div>

          <Link 
            to="/github"
            className="w-full flex items-center justify-center space-x-1 py-1.5 border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 rounded-lg text-[10px] font-mono text-[var(--text-primary)] transition cursor-pointer"
          >
            <span>View GitHub Activity</span>
            <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* COMPACT CONTACT NODES */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Communication Channels
          </h3>
          <div className="space-y-2 text-xs font-mono">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-[var(--border-color)]/70 bg-zinc-50 dark:bg-zinc-900 text-[var(--text-primary)]"
            >
              <Mail size={14} className="text-indigo-500" />
              <span className="truncate">{personalInfo.email}</span>
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
          2. TABLET LAYOUT (768px - 1024px)
          ======================================================== */}
      <div className="hidden md:grid lg:hidden grid-cols-5 gap-6">
        
        {/* LEFT COLUMN: Profile info & stats (Span 2 cols) */}
        <div className="col-span-2 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-indigo-500" />
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {personalInfo.avatar ? (
                  <img 
                    src={personalInfo.avatar} 
                    alt={personalInfo.name} 
                    className="h-20 w-20 rounded-xl object-cover object-top border border-[var(--border-color)] shadow-md shrink-0"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-heading text-xl font-bold shrink-0">
                    MW
                  </div>
                )}
                <div className="space-y-1">
                  <h2 className="text-lg font-heading font-extrabold text-[var(--text-primary)]">
                    {personalInfo.name}
                  </h2>
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center space-x-1.5 self-start px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold font-mono">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <span>OPEN TO WORK</span>
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">
                      <Globe size={11} />
                      <a href="https://maheshwaran.dev" target="_blank" rel="noreferrer" className="hover:underline">
                        maheshwaran.dev
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--border-color)]/60">
              <a 
                href={personalInfo.resume}
                download
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black text-xs font-mono font-bold transition cursor-pointer"
              >
                <FileDown size={13} />
                <span>Download Resume</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-1.5 border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono text-[var(--text-primary)] font-semibold transition"
                >
                  <Github size={12} />
                  <span>GitHub</span>
                </a>
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-1.5 border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[10px] font-mono text-[var(--text-primary)] font-semibold transition"
                >
                  <Linkedin size={12} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {mobileSkills.map(skill => (
                <span 
                  key={skill} 
                  className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-[var(--text-primary)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Featured Projects, GitHub, Contact (Span 3 cols) */}
        <div className="col-span-3 space-y-6">
          
          {/* Top 3 projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] pl-1">
              Top Featured Projects
            </h3>
            <div className="space-y-3">
              {featuredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-heading font-extrabold text-[var(--text-primary)]">
                        {project.name}
                      </h4>
                      <p className="text-[10px] text-[var(--text-secondary)] font-mono">{project.tagline}</p>
                    </div>
                    <Link 
                      to={`/projects/${project.id}`}
                      className="text-[10px] font-mono border border-[var(--border-color)] rounded px-2.5 py-1 bg-zinc-50 dark:bg-zinc-900 text-[var(--text-primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1 border-t border-[var(--border-color)]/30 pt-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[9px] font-mono px-1.5 py-0.2 bg-zinc-100 dark:bg-zinc-800 rounded text-[var(--text-secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Summary */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-heading font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                <Github size={14} />
                <span>GitHub Node diagnostics</span>
              </h3>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                Repos: {githubActivity.stats.repositories} &bull; Streak: 64 days
              </p>
            </div>
            <Link 
              to="/github"
              className="text-[10px] font-mono border border-[var(--border-color)] px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-[var(--text-primary)] cursor-pointer"
            >
              Explore &rarr;
            </Link>
          </div>

          {/* Contact Node */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Secure Transmission
              </h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-mono">{personalInfo.email}</p>
            </div>
            <Link 
              to="/contact"
              className="text-[10px] font-mono border border-[var(--border-color)] px-3 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black cursor-pointer"
            >
              Contact Operator
            </Link>
          </div>

        </div>

      </div>

      {/* ========================================================
          3. DESKTOP LAYOUT (1024px+)
          ======================================================== */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        
        {/* WIDGET 1: Developer Profile Overview (Span 2 cols) */}
        <div className="col-span-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between h-full">
            
            {/* Left Info Area */}
            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      SYSTEM OPERATOR
                    </span>
                    <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>OPEN TO WORK</span>
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold mt-1 text-[var(--text-primary)]">
                    {personalInfo.name}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)] font-mono mt-1">
                    <div className="flex items-center space-x-1">
                      <MapPin size={12} />
                      <span>{personalInfo.location}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                      <Globe size={12} />
                      <a href="https://github.com/Maheshwarandev" target="_blank" rel="noreferrer" className="hover:underline">
                        github.com/Maheshwarandev
                      </a>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  {personalInfo.bio}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 border-t border-[var(--border-color)]/60 pt-6 mt-6">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Commits</span>
                  <div className="text-lg font-heading font-bold text-[var(--text-primary)]">{githubData.totalCommitsCount}+</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Repositories</span>
                  <div className="text-lg font-heading font-bold text-[var(--text-primary)]">{githubData.profile ? githubData.profile.public_repos : 5}</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Active Streak</span>
                  <div className="text-lg font-heading font-bold text-[var(--text-primary)]">64 Days</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Main Stack</span>
                  <div className="text-lg font-heading font-bold text-[var(--text-primary)]">{githubData.topLanguage || 'JavaScript'}</div>
                </div>
              </div>
            </div>

            {/* Right Photo Area */}
            <div className="shrink-0 relative self-center md:self-stretch flex items-center">
              {personalInfo.avatar ? (
                <img 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name} 
                  className="h-52 w-48 rounded-2xl object-cover object-top border-2 border-[var(--border-color)] shadow-md hover:border-indigo-500/50 transition-colors duration-300"
                />
              ) : (
                <div className="h-52 w-48 rounded-2xl bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center font-heading text-3xl font-bold shadow-md select-none shrink-0">
                  MW
                </div>
              )}
            </div>

          </div>
        </div>

        {/* WIDGET 2: Focus / Current Learning */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Zap size={18} />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">Current Focus</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {personalInfo.focus}
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/60 rounded-lg p-3.5 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-[var(--text-primary)] font-semibold">
                <BookOpen size={12} />
                <span>Currently learning</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                SQL & Database Design, REST API optimization, and relational table modeling.
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)]/60 pt-4 mt-6 flex gap-2 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">#SQL</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">#DatabaseDesign</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">#NodeJS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">#REST_APIs</span>
          </div>
        </div>

        {/* WIDGET 3: Interactive Featured Projects Selector (Span 2 cols) */}
        <div className="col-span-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                FEATURED WORKSPACE / PRODUCTS
              </span>
              <Link 
                to="/projects" 
                className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>View All 4 Projects &rarr;</span>
              </Link>
            </div>

            {/* Interactive Project Switcher Tabs */}
            <div className="flex space-x-1.5 overflow-x-auto no-scrollbar border-b border-[var(--border-color)]/60 pb-2">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer whitespace-nowrap ${
                    featuredIndex === idx 
                      ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  0{idx + 1}. {project.name.split(' ')[0]} {project.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-heading font-extrabold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors duration-200">
                {activeFeaturedProject.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-mono">{activeFeaturedProject.tagline}</p>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {activeFeaturedProject.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeFeaturedProject.techStack.map(tech => (
                <span key={tech} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 text-[var(--text-primary)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-color)]/60 pt-4 mt-6 flex items-center justify-between">
            <a 
              href={activeFeaturedProject.github} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center space-x-1.5 transition cursor-pointer hover:underline"
            >
              <Github size={14} />
              <span>Source Repository</span>
              <ExternalLink size={11} />
            </a>
            
            <Link 
              to={`/projects/${activeFeaturedProject.id}`}
              className="text-xs font-heading font-bold text-[var(--text-primary)] hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center space-x-1 border border-[var(--border-color)] rounded-md px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <span>View Product Architecture</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* WIDGET 4: Actions & Quick Controls */}
        <div className="bg-[var(--bg-surface)] border border-indigo-500/30 dark:border-indigo-500/25 rounded-xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-indigo-500" />
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse mr-1.5 inline-block" />
              <span>Control Panel</span>
            </span>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Launch workspace requests, access verification documents, or establish communication lines.
            </p>
          </div>

          <div className="space-y-2 mt-6">
            <a 
              href={personalInfo.resume}
              download
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100 text-xs font-mono font-bold transition cursor-pointer shadow-sm"
            >
              <span className="flex items-center space-x-2">
                <FileText size={14} />
                <span>Download Resume</span>
              </span>
              <span className="text-[9px] text-white dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-200 px-1.5 py-0.5 rounded font-bold uppercase">PDF</span>
            </a>
            
            <Link 
              to="/contact"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <Mail size={14} className="opacity-80" />
                <span>Contact Operator</span>
              </span>
              <ArrowUpRight size={12} className="opacity-60" />
            </Link>

            <a 
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <Github size={14} className="opacity-80" />
                <span>Source Control (GitHub)</span>
              </span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>
          </div>
        </div>

        {/* WIDGET 5: Commit Log Activity (Span 3 columns) */}
        <div className="col-span-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[var(--text-primary)]">
              <Laptop size={16} className="text-zinc-600 dark:text-zinc-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">Live Activity Feed</span>
            </div>
            <Link to="/github" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition flex items-center space-x-1">
              <span>View full log</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="border border-[var(--border-color)]/60 rounded-xl overflow-hidden divide-y divide-[var(--border-color)]/60 bg-zinc-50/40 dark:bg-zinc-900/10 font-mono text-xs">
            {recentCommits.map(commit => (
              <div key={commit.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <div className="flex items-start space-x-3">
                  <GitCommit size={15} className="mt-0.5 text-zinc-500 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[var(--text-primary)] font-medium leading-relaxed">
                      {commit.message}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-[var(--text-secondary)]">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">{commit.repo}</span>
                      <span>&bull;</span>
                      <span>{commit.branch}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 text-[10px] text-[var(--text-secondary)] mt-1 sm:mt-0">
                  <span className="px-2 py-0.5 rounded border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                    {commit.id}
                  </span>
                  <span>{commit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
export default Dashboard;
