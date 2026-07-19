import { useState, useEffect } from 'react';
import { githubActivity } from '../data/portfolioData';

// Cache configuration: 15 minutes TTL
const CACHE_KEY = 'github_operator_cache_v2';
const CACHE_TIMESTAMP_KEY = 'github_operator_cache_timestamp_v2';
const CACHE_TTL = 15 * 60 * 1000; 

export function useGitHub(username = 'Maheshwarandev') {
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState(null);
  
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [totalCommitsCount, setTotalCommitsCount] = useState(284);
  const [topLanguage, setTopLanguage] = useState('JavaScript');

  // Helper to format ISO dates into relative strings
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

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // 1. Check Local Cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && (now - parseInt(cachedTime, 10) < CACHE_TTL)) {
          const parsed = JSON.parse(cachedData);
          setProfile(parsed.profile);
          setRepos(parsed.repos);
          setCommits(parsed.commits);
          setLanguages(parsed.languages);
          setTotalStars(parsed.totalStars);
          setTotalForks(parsed.totalForks || 0);
          setTotalCommitsCount(parsed.totalCommitsCount || 284);
          setTopLanguage(parsed.topLanguage || 'JavaScript');
          setIsFallback(parsed.isFallback || false);
          setLoading(false);
          return;
        }

        // 2. Fetch Live Data from GitHub REST API
        setLoading(true);
        
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
          fetch(`https://api.github.com/users/${username}/events?per_page=100`)
        ]);

        if (profileRes.status === 403 || reposRes.status === 403 || eventsRes.status === 403) {
          throw new Error('Rate limit exceeded (403)');
        }
        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('Failed to retrieve server data');
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];

        // 3. Parse Repositories Data
        const sortedRepos = Array.isArray(reposData) ? reposData.slice(0, 10) : [];
        const starsSum = Array.isArray(reposData) ? reposData.reduce((acc, curr) => acc + (curr.stargazers_count || 0), 0) : 0;
        const forksSum = Array.isArray(reposData) ? reposData.reduce((acc, curr) => acc + (curr.forks_count || 0), 0) : 0;

        // 4. Calculate Language Breakdown
        const langCounts = {};
        let totalValids = 0;
        if (Array.isArray(reposData)) {
          reposData.forEach(r => {
            if (r.language) {
              langCounts[r.language] = (langCounts[r.language] || 0) + 1;
              totalValids += 1;
            }
          });
        }

        const parsedLangs = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalValids) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage);

        const primaryLang = parsedLangs.length > 0 ? parsedLangs[0].name : 'JavaScript';

        // 5. Parse Commits from events log (PushEvent)
        const parsedCommits = [];
        let pushEventsCommitCount = 0;

        if (Array.isArray(eventsData)) {
          eventsData.forEach(event => {
            if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
              const repoName = event.repo ? event.repo.name.split('/').pop() : 'repository';
              const branchName = event.payload.ref ? event.payload.ref.replace('refs/heads/', '') : 'main';
              
              pushEventsCommitCount += event.payload.commits.length;

              event.payload.commits.forEach(c => {
                parsedCommits.push({
                  id: c.sha ? c.sha.substring(0, 7) : 'commit',
                  repo: repoName,
                  message: c.message || 'Updated repository code',
                  date: formatRelativeDate(event.created_at),
                  branch: branchName
                });
              });
            }
          });
        }

        const finalCommits = parsedCommits.length > 0 ? parsedCommits.slice(0, 6) : githubActivity.commits;
        const totalCommitsCalculated = pushEventsCommitCount > 0 ? (250 + pushEventsCommitCount) : 284;

        // Update Component State
        setProfile(profileData);
        setRepos(sortedRepos.length > 0 ? sortedRepos : githubActivity.repositories);
        setCommits(finalCommits);
        setLanguages(parsedLangs.length > 0 ? parsedLangs : [
          { name: 'JavaScript', percentage: 70 },
          { name: 'HTML', percentage: 18 },
          { name: 'CSS', percentage: 12 }
        ]);
        setTotalStars(starsSum);
        setTotalForks(forksSum);
        setTotalCommitsCount(totalCommitsCalculated);
        setTopLanguage(primaryLang);
        setIsFallback(false);

        // Cache Payload
        const cachePayload = {
          profile: profileData,
          repos: sortedRepos.length > 0 ? sortedRepos : githubActivity.repositories,
          commits: finalCommits,
          languages: parsedLangs.length > 0 ? parsedLangs : [
            { name: 'JavaScript', percentage: 70 },
            { name: 'HTML', percentage: 18 },
            { name: 'CSS', percentage: 12 }
          ],
          totalStars: starsSum,
          totalForks: forksSum,
          totalCommitsCount: totalCommitsCalculated,
          topLanguage: primaryLang,
          isFallback: false
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());

      } catch (err) {
        console.warn('GitHub API Fetch failed. Applying fallback dataset:', err.message);
        
        const fallbackProfile = {
          avatar_url: 'https://github.com/Maheshwarandev.png',
          name: 'MAHESHWARAN S',
          login: 'Maheshwarandev',
          bio: 'MERN Stack Developer | React & Node.js Developer | Open to Opportunities',
          followers: 18,
          following: 24,
          public_repos: 5
        };

        const fallbackLangs = [
          { name: 'JavaScript', percentage: 70 },
          { name: 'HTML', percentage: 18 },
          { name: 'CSS', percentage: 12 }
        ];

        setProfile(fallbackProfile);
        setRepos(githubActivity.repositories);
        setCommits(githubActivity.commits);
        setLanguages(fallbackLangs);
        setTotalStars(12);
        setTotalForks(4);
        setTotalCommitsCount(284);
        setTopLanguage('JavaScript');
        setIsFallback(true);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [username]);

  return { 
    loading, 
    error, 
    isFallback, 
    profile, 
    repos, 
    commits, 
    languages, 
    totalStars, 
    totalForks, 
    totalCommitsCount, 
    topLanguage 
  };
}
