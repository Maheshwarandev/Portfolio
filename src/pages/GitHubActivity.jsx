import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  Star, 
  GitCommit, 
  Database, 
  Code2, 
  Activity,
  GitFork,
  Users,
  Search,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';
import { Github } from '../components/SocialIcons';

// SKELETON LOADING COMPONENTS
function ProfileSkeleton() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="flex space-x-4 pt-2">
        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
          <div className="h-2.5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

function ReposSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3.5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

const formatRelativeDate = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay === 1) return 'Yesterday';
    if (diffDay < 7) return `${diffDay}d ago`;
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Recent';
  }
};

export function GitHubActivity() {
  const { loading, error, isFallback, profile, repos, commits, languages, totalStars, totalCommitsCount, topLanguage } = useGitHub('Maheshwarandev');
  const [searchQuery, setSearchQuery] = useState('');

  // Local static contribution calendar data (for visual representation)
  const contributionGrid = useMemo(() => {
    const days = [];
    const seed = [0, 0, 1, 0, 2, 0, 3, 1, 0, 4, 1, 2, 0, 0, 3, 1, 0, 2, 1, 0, 0, 1, 2, 3, 0];
    for (let i = 0; i < 371; i++) {
      const level = seed[i % seed.length];
      let commitsCount = 0;
      if (level === 1) commitsCount = Math.floor(Math.random() * 2) + 1;
      else if (level === 2) commitsCount = Math.floor(Math.random() * 3) + 3;
      else if (level === 3) commitsCount = Math.floor(Math.random() * 4) + 6;
      else if (level === 4) commitsCount = Math.floor(Math.random() * 6) + 10;
      days.push({ id: i, level, commitsCount });
    }
    return days;
  }, []);

  // Filter repositories based on search queries live
  const filteredRepos = useMemo(() => {
    if (!repos) return [];
    return repos.filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [repos, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)]/60 pb-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Source Control & Activity
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Live developer activity diagnostics and codebase metrics fetched directly from GitHub's API.
          </p>
        </div>

        {/* API connection status badge */}
        {!loading && (
          <div className="self-start md:self-auto flex items-center space-x-2">
            {isFallback ? (
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-semibold">
                <AlertTriangle size={12} className="animate-pulse" />
                <span>Mode: Offline / Rate Limited</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
                <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
                <span>Mode: Live API Connected</span>
              </span>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-6">
          <ProfileSkeleton />
          <StatsSkeleton />
          <div className="h-32 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl animate-pulse" />
          <ReposSkeleton />
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* PROFILE SUMMARY WIDGET */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
            {/* Visual glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center space-x-5 relative z-10">
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="h-16 w-16 rounded-full border border-[var(--border-color)] shadow-inner"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                    {profile.name}
                  </h2>
                  <a 
                    href={`https://github.com/${profile.login}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[var(--text-secondary)] hover:text-indigo-500 flex items-center space-x-0.5 transition"
                  >
                    <span>@{profile.login}</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                  {profile.bio || "Full-stack developer focused on robust server architectures and interactive UI environments."}
                </p>
              </div>
            </div>

            {/* Followers card */}
            <div className="flex items-center space-x-6 border-t md:border-t-0 md:border-l border-[var(--border-color)]/70 pt-4 md:pt-0 md:pl-8 font-mono text-xs text-[var(--text-secondary)] relative z-10 shrink-0">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider block opacity-70">Followers</span>
                <span className="text-sm font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-1">
                  <Users size={14} className="opacity-75" />
                  <span>{profile.followers}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider block opacity-70">Following</span>
                <span className="text-sm font-heading font-extrabold text-[var(--text-primary)]">
                  {profile.following}
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC STATISTICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Live Repositories</span>
              <div className="text-xl font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-1.5">
                <Github size={16} className="text-zinc-500" />
                <span>{profile.public_repos}</span>
              </div>
            </div>
            
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Cumulative Stars</span>
              <div className="text-xl font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-1.5">
                <Star size={16} className="text-indigo-500" />
                <span>{totalStars}</span>
              </div>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Total Commits</span>
              <div className="text-xl font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-1.5">
                <GitCommit size={16} className="text-emerald-500 animate-pulse" />
                <span>{totalCommitsCount}+</span>
              </div>
            </div>

            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Primary Stack</span>
              <div className="text-xl font-heading font-extrabold text-[var(--text-primary)] flex items-center space-x-1.5">
                <Code2 size={16} className="text-blue-500" />
                <span>{topLanguage}</span>
              </div>
            </div>
          </div>

          {/* LANGUAGE BREAKDOWN CHART */}
          {languages.length > 0 && (
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] block">
                Primary Languages Share (Repositories)
              </span>

              {/* Colorful proportional segment bar */}
              <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-zinc-100 dark:bg-zinc-800">
                {languages.map((lang, idx) => {
                  // Generate segment colors
                  const colors = [
                    'bg-indigo-500', 
                    'bg-emerald-500', 
                    'bg-amber-500', 
                    'bg-blue-500', 
                    'bg-purple-500', 
                    'bg-red-500'
                  ];
                  const color = colors[idx % colors.length];

                  return (
                    <div 
                      key={lang.name}
                      style={{ width: `${lang.percentage}%` }}
                      className={`${color} h-full transition-all duration-300`}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  );
                })}
              </div>

              {/* Grid labels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 font-mono text-[10px] pt-1">
                {languages.map((lang, idx) => {
                  const bgColors = [
                    'bg-indigo-500', 
                    'bg-emerald-500', 
                    'bg-amber-500', 
                    'bg-blue-500', 
                    'bg-purple-500', 
                    'bg-red-500'
                  ];
                  const bgColor = bgColors[idx % bgColors.length];

                  return (
                    <div key={lang.name} className="flex items-center space-x-2">
                      <span className={`h-2.5 w-2.5 rounded-sm shrink-0 ${bgColor}`} />
                      <span className="text-[var(--text-primary)] font-semibold">{lang.name}</span>
                      <span className="text-[var(--text-secondary)]">{lang.percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONTRIBUTION CALENDAR */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Developer Log System (Contribution Grid)
              </span>
              <div className="flex items-center space-x-1 text-[9px] font-mono text-[var(--text-secondary)]">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 border" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar w-full border border-[var(--border-color)]/60 rounded-lg p-4 bg-zinc-50/40 dark:bg-zinc-900/10">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[720px] justify-between">
                {contributionGrid.map((day) => {
                  const getBgColor = (level) => {
                    switch (level) {
                      case 1: return 'bg-emerald-500/20 border-emerald-500/10';
                      case 2: return 'bg-emerald-500/40 border-emerald-500/20';
                      case 3: return 'bg-emerald-500/70 border-emerald-500/30';
                      case 4: return 'bg-emerald-500 border-emerald-500/40';
                      case 0:
                      default:
                        return 'bg-zinc-200/50 dark:bg-zinc-800/40 border-transparent';
                    }
                  };

                  return (
                    <div
                      key={day.id}
                      title={`${day.commitsCount} commits`}
                      className={`w-2.5 h-2.5 rounded-[1.5px] border transition-colors duration-150 cursor-crosshair hover:scale-[1.2] hover:shadow-sm ${getBgColor(day.level)}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID: REPOS & COMMITS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            
            {/* Left side: Repository lists with Search */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Code Repositories
                </h2>
                
                {/* Search Bar Input */}
                <div className="relative flex items-center max-w-xs">
                  <Search size={12} className="absolute left-3 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repositories..."
                    className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 text-[var(--text-primary)] focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition"
                  />
                </div>
              </div>

              <div className="space-y-4 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                  {filteredRepos.length > 0 ? (
                    filteredRepos.map(repo => (
                      <motion.div 
                        layout
                        key={repo.name} 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <a 
                              href={repo.html_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="font-heading font-bold text-[var(--text-primary)] hover:text-indigo-500 transition-colors flex items-center space-x-1.5"
                            >
                              <span>{repo.name}</span>
                              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {repo.description || "No public description specified. Click repository link to view readme logs."}
                            </p>
                          </div>
                          
                          {repo.language && (
                            <span className="text-[9px] font-mono border border-[var(--border-color)]/70 px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900 shrink-0">
                              {repo.language}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]/40">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Star size={11} className="opacity-80 text-yellow-500 fill-yellow-500/10" />
                              <span>{repo.stargazers_count}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <GitFork size={11} className="opacity-80" />
                              <span>{repo.forks_count}</span>
                            </span>
                          </div>
                          <span>Updated {formatRelativeDate(repo.updated_at)}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-8 text-center font-mono text-xs text-[var(--text-secondary)]">
                      No repositories match query "{searchQuery}"
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right side: Live Commits Feed & Following Network */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Live Audit Logs (Recent Commits)
                </h2>
                
                <div className="border border-[var(--border-color)] rounded-xl overflow-hidden divide-y divide-[var(--border-color)]/60 bg-[var(--bg-surface)] font-mono text-xs shadow-sm">
                  {commits.map((commit, index) => (
                    <div 
                      key={`${commit.id}-${index}`} 
                      className="p-4 flex items-start space-x-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors duration-150"
                    >
                      <GitCommit size={15} className="mt-0.5 text-zinc-500 flex-shrink-0" />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 text-[10px] text-[var(--text-secondary)]">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300 truncate">{commit.repo}</span>
                          <span>{commit.date}</span>
                        </div>
                        <p className="text-[var(--text-primary)] font-medium leading-relaxed truncate">
                          {commit.message}
                        </p>
                        <div className="flex items-center space-x-2 text-[9px] text-[var(--text-secondary)]">
                          <span className="px-1.5 py-0.5 rounded border bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-bold">{commit.id}</span>
                          <span>&bull;</span>
                          <span className="flex items-center space-x-1">
                            <GitBranch size={10} />
                            <span>{commit.branch}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Following & Developer Community Network */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4 font-mono">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
                    <Users size={14} className="text-indigo-500" />
                    <span>Followed Orgs & Developers</span>
                  </h3>
                  <span className="text-[10px] text-[var(--text-secondary)]">Following 24 &bull; Followers 18</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    { name: 'facebook/react', type: 'Framework', avatar: 'https://github.com/facebook.png' },
                    { name: 'expressjs', type: 'Backend Core', avatar: 'https://github.com/expressjs.png' },
                    { name: 'nodejs', type: 'Runtime', avatar: 'https://github.com/nodejs.png' },
                    { name: 'mongodb', type: 'Database Engine', avatar: 'https://github.com/mongodb.png' },
                    { name: 'tailwindlabs', type: 'UI Utilities', avatar: 'https://github.com/tailwindlabs.png' },
                    { name: 'vercel', type: 'Deployment', avatar: 'https://github.com/vercel.png' }
                  ].map((followed) => (
                    <a 
                      key={followed.name}
                      href={`https://github.com/${followed.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-[var(--border-color)]/60 hover:border-indigo-500/40 transition group"
                    >
                      <img src={followed.avatar} alt={followed.name} className="w-5 h-5 rounded-full" />
                      <div className="truncate">
                        <span className="block font-bold text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors truncate">
                          {followed.name}
                        </span>
                        <span className="block text-[9px] text-[var(--text-secondary)]">{followed.type}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
export default GitHubActivity;
