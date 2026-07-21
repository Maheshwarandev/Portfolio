import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';

// Main Rollable Portfolio (Single Page Scrollable View)
const MainRollablePortfolio = lazy(() => import('./pages/MainRollablePortfolio'));

// Deep-Dive Project Architecture Case Study Page
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

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
            {/* 1. Main Single-Page Rollable Portfolio */}
            <Route path="/" element={<MainRollablePortfolio />} />

            {/* 2. Deep-Dive Project Case Study & Architecture Page */}
            <Route path="/projects/:id" element={<ProjectDetail />} />

            {/* Catch-all route redirecting back to rollable main portfolio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </WorkspaceLayout>
    </Router>
  );
}

export default App;
