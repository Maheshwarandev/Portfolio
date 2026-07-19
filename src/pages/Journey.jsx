import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { journeyTimeline } from '../data/portfolioData';

export function Journey() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'academic' | 'experience'

  // Helper to choose node icon based on type
  const resolveTimelineIcon = (type) => {
    switch (type) {
      case 'academic':
        return <GraduationCap size={16} className="text-indigo-600 dark:text-indigo-400" />;
      case 'experience':
        return <Briefcase size={16} className="text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Code2 size={16} className="text-blue-600 dark:text-blue-400" />;
    }
  };

  // Helper to return status badge text and styling
  const resolveStatusBadge = (id, period) => {
    if (id === 'sqltraining') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Today (2026)</span>
        </span>
      );
    }
    if (id === 'inventorysystem') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20">
          <Clock size={10} />
          <span>In Progress</span>
        </span>
      );
    }
    if (id === 'college') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold border border-indigo-500/20">
          <GraduationCap size={10} />
          <span>Degree (CGPA 7.5)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[var(--text-secondary)] text-[10px] font-mono font-semibold border border-[var(--border-color)]">
        <CheckCircle2 size={10} className="text-emerald-500" />
        <span>Completed</span>
      </span>
    );
  };

  // Filtered timeline data
  const filteredTimeline = useMemo(() => {
    if (activeFilter === 'all') return journeyTimeline;
    return journeyTimeline.filter(item => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-8 pb-8">
      
      {/* Page Title */}
      <div className="border-b border-[var(--border-color)]/60 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Engineering & Learning Journey
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            A chronological timeline of academic achievements, formal training programs, and practical full-stack software development milestones.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-[var(--border-color)] self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            All ({journeyTimeline.length})
          </button>
          <button
            onClick={() => setActiveFilter('academic')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeFilter === 'academic'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            🎓 Education & Training
          </button>
          <button
            onClick={() => setActiveFilter('experience')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeFilter === 'experience'
                ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            🚀 Projects & Work
          </button>
        </div>
      </div>

      {/* TOP SUMMARY HIGHLIGHT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-[var(--bg-surface)] border border-emerald-500/20 rounded-xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
            Current Focus
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            SQL & Database Design
          </p>
          <span className="text-[9px] text-[var(--text-secondary)] block">Started Today (2026)</span>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block">
            Stack Training
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            MERN Stack (Besant Tech)
          </p>
          <span className="text-[9px] text-[var(--text-secondary)] block">Completed 2026</span>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
            Degree (B.E. CSE)
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            CGPA: 7.5 / 10.0
          </p>
          <span className="text-[9px] text-[var(--text-secondary)] block">DSEC (2022 - 2026)</span>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider block">
            Python Internship
          </span>
          <p className="text-xs font-bold text-[var(--text-primary)] truncate">
            SystemTron Remote
          </p>
          <span className="text-[9px] text-[var(--text-secondary)] block">4-Week Certificate (2025)</span>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 border-l-2 border-indigo-500/20 dark:border-indigo-500/30 py-4 space-y-8">
        
        <AnimatePresence mode="wait">
          {filteredTimeline.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group"
            >
              {/* Timeline Dot Node */}
              <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 h-8 w-8 rounded-full bg-[var(--bg-app)] border-2 border-indigo-500/40 dark:border-indigo-400/40 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500 group-hover:shadow-md transition-all duration-300">
                {resolveTimelineIcon(node.type)}
              </div>

              {/* Timeline Card Box */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300 space-y-3">
                
                {/* Header metadata row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                      {node.subtitle}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] leading-tight">
                      {node.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    {resolveStatusBadge(node.id, node.period)}
                    <span className="text-xs font-mono text-[var(--text-secondary)] bg-zinc-50 dark:bg-zinc-900 border px-2.5 py-0.5 rounded-full font-bold">
                      {node.period}
                    </span>
                  </div>
                </div>

                {/* Description Body */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {node.description}
                </p>

                {/* Tech Skills Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[var(--border-color)]/50">
                  {node.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 text-[var(--text-primary)] font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

      </div>
      
    </div>
  );
}
export default Journey;
