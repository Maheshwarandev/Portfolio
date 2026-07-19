import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';

// Lazy Load pages for optimized performance & code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Journey = lazy(() => import('./pages/Journey'));
const GitHubActivity = lazy(() => import('./pages/GitHubActivity'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading Fallback spinner
const LoadingNode = () => (
  <div className="flex items-center justify-center min-h-[400px] font-mono text-xs text-[var(--text-secondary)]">
    <div className="space-y-3 text-center">
      <div className="w-6 h-6 border-2 border-zinc-400 dark:border-zinc-600 border-t-transparent rounded-full animate-spin mx-auto" />
      <div>Establishing workspace node link...</div>
    </div>
  </div>
);

export function App() {
  return (
    <Router>
      <WorkspaceLayout>
        <Suspense fallback={<LoadingNode />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/github" element={<GitHubActivity />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Catch-all route redirecting back to home dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </WorkspaceLayout>
    </Router>
  );
}

export default App;
