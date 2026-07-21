import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import About from './About';
import Projects from './Projects';
import TechStack from './TechStack';
import Journey from './Journey';
import GitHubActivity from './GitHubActivity';
import Contact from './Contact';

export function MainRollablePortfolio() {
  const location = useLocation();

  // Scroll to hash section if present in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. HERO / DASHBOARD SECTION */}
      <section id="dashboard" className="scroll-mt-28">
        <Dashboard />
      </section>

      {/* 2. PROJECTS SECTION (PLACED FIRST RIGHT AFTER DASHBOARD) */}
      <section id="projects" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <Projects />
      </section>

      {/* 3. ABOUT OPERATOR & CERTIFICATES SECTION */}
      <section id="about" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <About />
      </section>

      {/* 4. TECH STACK SECTION */}
      <section id="tech-stack" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <TechStack />
      </section>

      {/* 5. ENGINEERING JOURNEY SECTION */}
      <section id="journey" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <Journey />
      </section>

      {/* 6. GITHUB ACTIVITY SECTION */}
      <section id="github" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <GitHubActivity />
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="scroll-mt-28 border-t border-[var(--border-color)]/60 pt-16 md:pt-20">
        <Contact />
      </section>
    </div>
  );
}

export default MainRollablePortfolio;
