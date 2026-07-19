import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  FolderTree, 
  Database, 
  ShieldCheck, 
  Activity,
  Code2,
  FileCode,
  Network
} from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { projectsData } from '../data/portfolioData';

export function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-6">
        <Link 
          to="/projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to products directory</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1.5 transition"
          >
            <Github size={14} />
            <span>Repository</span>
          </a>
          <a 
            href={project.live} 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1.5 transition"
          >
            <ExternalLink size={14} />
            <span>Live Workspace</span>
          </a>
        </div>
      </div>

      {/* Hero Overview */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
            PRODUCT ARCHITECTURE REPORT
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
            {project.name}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] font-mono mt-0.5">{project.tagline}</p>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Grid: 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Sidebar (Folder Structure, Tech Summary) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tech Spec Card */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
              <Code2 size={14} className="opacity-80" />
              <span>Technology Spec Sheet</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 text-[var(--text-primary)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Folder Structure Card */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
              <FolderTree size={14} className="opacity-80" />
              <span>Workspace Directory</span>
            </h3>
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 rounded-lg p-4 font-mono text-[11px] text-[var(--text-secondary)] overflow-x-auto">
              <pre className="no-scrollbar leading-relaxed">{project.folderStructure.trim()}</pre>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Deep Dive Spec (Architecture, Database, API, Lessons) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Architecture Section */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-2">
              <Network size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>System & Network Flow</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono uppercase tracking-wider">
              Type: {project.architecture.type}
            </p>
            
            {/* Visual Node Diagram */}
            <div className="border border-[var(--border-color)]/70 rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4 space-y-3 font-mono text-xs">
              {project.architecture.diagram.map((node, i) => (
                <div key={i} className="flex items-center space-x-3 text-[var(--text-primary)] p-2 bg-white dark:bg-zinc-950 rounded border border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="h-5 w-5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded flex items-center justify-center font-bold font-sans text-[10px]">
                    0{i+1}
                  </div>
                  <span className="leading-normal">{node}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Key Features */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-2">
              <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span>Core Operational Capabilities</span>
            </h2>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. API Routing Map */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-2">
              <Activity size={18} className="text-blue-600 dark:text-blue-400" />
              <span>API Gateway Routing Map</span>
            </h2>
            <div className="border border-[var(--border-color)]/70 rounded-lg overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10 divide-y divide-[var(--border-color)]/60 font-mono text-xs">
              {project.apiEndpoints.map((endpoint, i) => (
                <div key={i} className="p-4 flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-1 md:w-2/5">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        endpoint.method === 'GET' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        endpoint.method === 'POST' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        endpoint.method === 'PUT' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-[var(--text-primary)] font-semibold">{endpoint.path}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] md:w-3/5 leading-relaxed">
                    {endpoint.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Database Schema Design */}
          {project.databaseDesign && (
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-2">
                <Database size={18} className="text-purple-600 dark:text-purple-400" />
                <span>Database Schemas & Models</span>
              </h2>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/70 rounded-lg p-4 font-mono text-[11px] text-[var(--text-secondary)] overflow-x-auto">
                <pre className="no-scrollbar leading-relaxed">{project.databaseDesign.trim()}</pre>
              </div>
            </div>
          )}

          {/* 5. Challenges, Solutions & Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-heading font-bold text-red-600 dark:text-red-400">
                Core Challenge
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-heading font-bold text-emerald-600 dark:text-emerald-400">
                Key Lesson Learned
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.lessons}
              </p>
            </div>

          </div>

          {/* Future Roadmap */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Future Optimization Node
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {project.improvements}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
export default ProjectDetail;
