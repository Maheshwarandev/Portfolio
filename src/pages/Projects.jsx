import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowRight,
  Database,
  Network,
  Cpu,
  Eye,
  X,
  CheckCircle2,
  Layers,
  Code2,
  Server
} from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { projectsData } from '../data/portfolioData';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'MERN & MongoDB', 'Node & MySQL', 'Security & AI'];

  // Filter project cards dynamically
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    if (activeFilter === 'MERN & MongoDB') {
      return projectsData.filter(p => p.techStack.includes('MongoDB'));
    }
    if (activeFilter === 'Node & MySQL') {
      return projectsData.filter(p => p.techStack.includes('MySQL'));
    }
    if (activeFilter === 'Security & AI') {
      return projectsData.filter(p => p.id === 'cyberforensic');
    }
    return projectsData;
  }, [activeFilter]);

  return (
    <div className="space-y-6 pb-8">
      
      {/* Page Title & Filter Header */}
      <div className="border-b border-[var(--border-color)]/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Software Products
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            An ecosystem of full-stack developer applications, SaaS management utilities, and security audit systems.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-[var(--border-color)] self-start md:self-auto font-mono text-xs overflow-x-auto no-scrollbar max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap ${
                activeFilter === cat 
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm flex flex-col group hover:shadow-md hover:border-indigo-500/40 transition-all duration-300"
          >
            {/* Visual Header - SaaS Mock Chrome Window */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-[var(--border-color)]/70 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[10px] font-mono text-[var(--text-secondary)] font-medium">
                {project.id}.dev.sh
              </span>
              <div className="w-10" />
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-heading font-extrabold text-[var(--text-primary)]">
                      {project.name}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono border border-emerald-500/30 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                    Production Build
                  </span>
                </div>

                {/* Description visible on ALL devices */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-[var(--border-color)]/70 text-[var(--text-primary)] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Architecture Stats */}
              <div className="grid grid-cols-3 gap-2 border-y border-[var(--border-color)]/60 py-3 text-xs font-mono text-[var(--text-secondary)]">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider block opacity-70">Architecture</span>
                  <span className="font-semibold text-[var(--text-primary)] block truncate">REST API</span>
                </div>
                <div className="space-y-0.5 pl-2 border-l border-[var(--border-color)]/60">
                  <span className="text-[9px] uppercase tracking-wider block opacity-70">Database</span>
                  <span className="font-semibold text-[var(--text-primary)] block truncate">
                    {project.techStack.includes('MySQL') ? 'MySQL DB' : 'MongoDB'}
                  </span>
                </div>
                <div className="space-y-0.5 pl-2 border-l border-[var(--border-color)]/60">
                  <span className="text-[9px] uppercase tracking-wider block opacity-70">Auth & Roles</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 block truncate">JWT / Admin</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                <div className="flex items-center space-x-3">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1.5 transition"
                  >
                    <Github size={14} />
                    <span>Source</span>
                  </a>

                  {/* Quick Preview Modal Trigger Button */}
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1 transition cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Quick Preview</span>
                  </button>

                  {/* Live Demo link placed on the RIGHT SIDE of Quick Preview */}
                  {project.live && project.live !== '#' && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 hover:bg-emerald-500/20 transition flex items-center space-x-1"
                    >
                      <ExternalLink size={12} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  className="text-xs font-heading font-bold text-[var(--text-primary)] hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center space-x-1 border border-[var(--border-color)] rounded-lg px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QUICK PREVIEW POPUP MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-[var(--border-color)] bg-zinc-100 dark:bg-zinc-800 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  SYSTEM ARCHITECTURE PREVIEW
                </span>
                <h2 className="font-heading text-2xl font-extrabold text-[var(--text-primary)]">
                  {selectedProject.name}
                </h2>
                <p className="text-xs font-mono text-[var(--text-secondary)]">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Overview */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 rounded-xl p-4 space-y-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                <span className="font-mono font-bold text-[var(--text-primary)] uppercase text-[10px] block">
                  Product Overview
                </span>
                <p>{selectedProject.description}</p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <span className="font-mono font-bold text-[var(--text-primary)] uppercase text-[10px] block">
                  Key Implemented Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 bg-zinc-50/50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-[var(--border-color)]/50">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Breakdown */}
              <div className="space-y-2">
                <span className="font-mono font-bold text-[var(--text-primary)] uppercase text-[10px] block">
                  Technology Stack Nodes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-color)]">
                <div className="flex items-center space-x-2">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-xs font-mono border border-[var(--border-color)] rounded-xl px-4 py-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold hover:opacity-90 transition cursor-pointer"
                  >
                    <Github size={15} />
                    <span>View Repository Code</span>
                  </a>

                  {selectedProject.live && selectedProject.live !== '#' && (
                    <a 
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2 text-xs font-mono rounded-xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow cursor-pointer"
                    >
                      <ExternalLink size={15} />
                      <span>Open Live Application</span>
                    </a>
                  )}
                </div>

                <Link 
                  to={`/projects/${selectedProject.id}`}
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center space-x-1.5 text-xs font-heading font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <span>Full Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default Projects;
