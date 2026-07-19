import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  FileCode, 
  Layout, 
  Wind, 
  Layers, 
  Server, 
  Cpu, 
  Radio, 
  Database, 
  Table, 
  Zap, 
  GitBranch, 
  Container, 
  Compass,
  Code2
} from 'lucide-react';
import { techStackData } from '../data/portfolioData';

// Map icon strings to imported components to support bundle tree-shaking
const iconMap = {
  Atom,
  FileCode,
  Layout,
  Wind,
  Layers,
  Server,
  Cpu,
  Radio,
  Database,
  Table,
  Zap,
  GitBranch,
  Container,
  Compass
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredTech = activeCategory === 'All' 
    ? techStackData 
    : techStackData.filter(tech => tech.category === activeCategory);

  // Helper to dynamically resolve Lucide Icons
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Code2;
    return <IconComponent size={20} className="stroke-[1.8]" />;
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)]/60 pb-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Technology Stack
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            A comprehensive inventory of language nodes, state engines, cache adapters, and DevOps utilities validated in production scopes.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-lg border border-[var(--border-color)]/60 self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-mono rounded-md font-medium transition cursor-pointer whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border-color)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTech.map((tech, index) => (
          <motion.div
            key={tech.name}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden"
          >
            {/* Hover glow decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/[var(--glow-opacity)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
            
            <div className="space-y-3 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-350">
                  {renderIcon(tech.icon)}
                </div>
                
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  tech.proficiency === 'Expert' ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-600 dark:text-indigo-400' :
                  tech.proficiency === 'Proficient' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                  'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
                }`}>
                  {tech.proficiency}
                </span>
              </div>

              {/* Title & category */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                  {tech.name}
                </h3>
                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider block">
                  {tech.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {tech.description}
              </p>
            </div>

            {/* Project usage tags */}
            <div className="pt-3 border-t border-[var(--border-color)]/60 relative z-10 flex flex-wrap items-center gap-1">
              <span className="text-[9px] font-mono text-[var(--text-secondary)] mr-1">Projects:</span>
              {tech.projects.map(proj => (
                <span 
                  key={proj} 
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-[var(--text-primary)]"
                >
                  {proj}
                </span>
              ))}
            </div>

          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
export default TechStack;
