import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Code2, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target,
  SearchCode,
  FileCode2,
  FileDown
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { PdfCanvasPreview } from '../components/PdfCanvasPreview';

export function About() {
  const [activeFile, setActiveFile] = useState('summary.md');

  // Spec Cards for About Me Grid
  const specCards = [
    {
      id: "architecture",
      title: "Full-Stack System Focus",
      icon: Zap,
      color: "text-indigo-600 dark:text-indigo-400 border-indigo-500/10",
      content: `I specialize in end-to-end full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) and relational databases like MySQL. I design RESTful APIs, modular frontend interfaces, and role-based authentication schemes.`
    },
    {
      id: "problem",
      title: "Problem Solving",
      icon: SearchCode,
      color: "text-emerald-600 dark:text-emerald-400 border-emerald-500/10",
      content: `When debugging, I trace execution chains systematically. I analyze relational table schemas, monitor REST endpoint headers, design robust MVC controller routes, and test APIs using Postman.`
    },
    {
      id: "goals",
      title: "Engineering Goals",
      icon: Target,
      color: "text-purple-600 dark:text-purple-400 border-purple-500/10",
      content: `My goal is to build scalable, maintainable software products that achieve low API latencies. I want to build robust backend pipelines and modular frontend states that streamline real-world operations.`
    },
    {
      id: "education",
      title: "Education Specs",
      icon: GraduationCap,
      color: "text-blue-600 dark:text-blue-400 border-blue-500/10",
      content: `B.E. Computer Science and Engineering — Dhanalakshmi Srinivasan Engineering College (2022 - 2026). Achieved CGPA: 7.5. Trained in MERN Stack development at Besant Technologies, Velachery, Chennai.`
    },
    {
      id: "credentials",
      title: "Core Credentials",
      icon: Award,
      color: "text-rose-600 dark:text-rose-400 border-rose-500/10",
      content: `Besant Technologies MERN Stack Training, SystemTron Python Internship, Great Learning (Cyber Security, AI & ChatGPT), Power BI Workshop, UiPath Automation, and IBM Full-Stack JS Developer (In Progress).`
    }
  ];

  // Terminal Files data for Interactive Explorer
  const terminalFiles = {
    'summary.md': `# MAHESHWARAN S
## MERN Stack Developer
+91 85248 58324 | maheshwaran852485@gmail.com
Chennai, Tamil Nadu

Motivated fresher MERN Stack Developer with hands-on experience building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Proficient in JavaScript (ES6+), MySQL, RESTful API development, Git, and GitHub. Passionate about creating scalable, responsive web applications and eager to contribute to a dynamic development team.`,

    'experience.json': `[
  {
    "role": "MERN Stack Developer Trainee",
    "timeline": "Feb 2026 – Present",
    "provider": "Besant Technologies",
    "location": "Velachery, Chennai",
    "bullets": [
      "Building full-stack applications using the MERN Stack with frontend–backend integration.",
      "Developing RESTful APIs, database schemas, and responsive React.js user interfaces.",
      "Collaborating on real-world projects, applying MVC architecture and component-based design.",
      "Practising version control and API testing using Git, GitHub, and Postman."
    ]
  }
]`,

    'education.json': `{
  "degree": "B.E. – Computer Science and Engineering",
  "institution": "Dhanalakshmi Srinivasan Engineering College (A)",
  "location": "Chennai",
  "period": "2022 – 2026",
  "evaluation": {
    "metric": "CGPA",
    "score": 7.5
  }
}`,

    'certifications.yaml': `certificates:
  - name: "IBM Full-Stack JavaScript Developer Professional Certificate"
    status: "In Progress"
  - name: "MERN Stack Development Training"
    provider: "Besant Technologies"
  - name: "Completion of Internship in Python"
    provider: "System Tron"
    doc: "/Python_Internship_Certificate.pdf"
  - name: "Introduction to Cyber Security"
    provider: "Great Learning Academy"
    doc: "/Introduction_to_Cyber_Security.pdf"
  - name: "Introduction to Artificial Intelligence"
    provider: "Great Learning Academy"
    doc: "/Introduction_to_Artificial_Intelligence.pdf"
  - name: "ChatGPT for Beginners"
    provider: "Great Learning Academy"
    doc: "/ChatGPT_for_Beginners.pdf"
  - name: "What Is Generative AI?"
    provider: "LinkedIn Learning"
    doc: "/What_is_Generative_AI.pdf"
  - name: "PL-300: Microsoft Power BI"
    provider: "OfficeMaster"
    doc: "/PowerBI_Workshop_Certificate.pdf"
  - name: "UiPath Automation Fundamentals"
    provider: "UiPath Academy"
    doc: "/UiPath_Automation_Fundamentals.pdf"
`
  };

  // Clean certificates list with renamed filenames (without personal names)
  const certificatesList = [
    {
      name: "Completion of Internship in Python",
      provider: "System Tron",
      date: "2025",
      document: "/Python_Internship_Certificate.pdf",
      image: "/certificates/Python_Internship_Certificate.png"
    },
    {
      name: "Introduction to Cyber Security",
      provider: "Great Learning Academy",
      date: "2024",
      verifyUrl: "https://www.mygreatlearning.com/certificate/XTXCFGZF",
      document: "/Introduction_to_Cyber_Security.pdf",
      image: "/certificates/Introduction_to_Cyber_Security.jpg"
    },
    {
      name: "Introduction to Artificial Intelligence",
      provider: "Great Learning Academy",
      date: "2024",
      verifyUrl: "https://www.mygreatlearning.com/certificate/KNIEHZIB",
      document: "/Introduction_to_Artificial_Intelligence.pdf",
      image: "/certificates/Introduction_to_Artificial_Intelligence.jpg"
    },
    {
      name: "ChatGPT for Beginners",
      provider: "Great Learning Academy",
      date: "2024",
      verifyUrl: "https://www.mygreatlearning.com/certificate/CXCFHOLI",
      document: "/ChatGPT_for_Beginners.pdf",
      image: "/certificates/ChatGPT_for_Beginners.jpg"
    },
    {
      name: "What Is Generative AI?",
      provider: "LinkedIn Learning",
      date: "2024",
      document: "/What_is_Generative_AI.pdf",
      image: null
    },
    {
      name: "PowerBI Workshop",
      provider: "OfficeMaster",
      date: "2025",
      document: "/PowerBI_Workshop_Certificate.pdf",
      image: null
    },
    {
      name: "UiPath Automation Fundamentals",
      provider: "UiPath Academy",
      date: "Oct 21, 2024",
      document: "/UiPath_Automation_Fundamentals.pdf",
      image: "/certificates/UiPath_Automation_Fundamentals.png"
    },
    {
      name: "IBM Full-Stack JavaScript Developer",
      provider: "IBM (coursera)",
      date: "In Progress",
      document: null,
      image: null
    },
    {
      name: "MERN Stack Development Training",
      provider: "Besant Technologies",
      date: "2026",
      document: null,
      image: null
    }
  ];

  const getLanguage = (fileName) => {
    if (fileName.endsWith('.json')) return 'json';
    if (fileName.endsWith('.yaml')) return 'yaml';
    return 'markdown';
  };

  return (
    <div className="space-y-12 pb-12">
      
      {/* ========================================================
          SECTION 1: ABOUT ME & OPERATOR SPECS
          ======================================================== */}
      <div className="space-y-8">
        
        {/* Title & Header */}
        <div className="border-b border-[var(--border-color)]/60 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              About Operator
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
              Cognitive specs, developer philosophy, education background, and interactive terminal documents.
            </p>
          </div>

          {/* PDF Resume Download Button */}
          <a 
            href={personalInfo.resume}
            download="Maheshwaran-S.pdf"
            className="self-start md:self-auto flex items-center space-x-2 px-4 py-2 border border-[var(--border-color)] bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-lg text-xs font-mono font-bold hover:bg-zinc-900 dark:hover:bg-zinc-100 transition shadow-sm cursor-pointer"
          >
            <FileDown size={14} />
            <span>Download Resume PDF</span>
          </a>
        </div>

        {/* About Me Grid: Spec Cards & Interactive Terminal Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Side: Spec Cards (Span 2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {specCards.map((card) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.id}
                  className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-3 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-1.5 rounded-lg border ${card.color} bg-zinc-50 dark:bg-zinc-900`}>
                      <Icon size={16} />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                    {card.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Side: Interactive Specs Terminal (Span 3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            
            <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col flex-1 min-h-[480px]">
              
              {/* Terminal Top Bar */}
              <div className="bg-[#16161a] px-4 py-3 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                  <span className="text-[10px] text-zinc-500 font-mono pl-2">operator_specs.sh - active</span>
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-600">
                  <Terminal size={11} />
                  <span>BASH</span>
                </div>
              </div>

              {/* Terminal Workspace */}
              <div className="flex flex-1 flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
                
                {/* Virtual Sidebar: File Selector */}
                <div className="w-full md:w-48 bg-[#0f0f12] p-3 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar space-x-2 md:space-x-0 md:space-y-1">
                  <div className="hidden md:block px-2 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Workspace Files
                  </div>
                  {Object.keys(terminalFiles).map(fileName => {
                    const isActive = activeFile === fileName;
                    return (
                      <button
                        key={fileName}
                        onClick={() => setActiveFile(fileName)}
                        className={`flex items-center space-x-2 w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-mono transition cursor-pointer shrink-0 ${
                          isActive 
                            ? 'bg-zinc-800 text-white font-semibold' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <FileCode2 size={13} className={isActive ? "text-indigo-400" : "text-zinc-600"} />
                        <span>{fileName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Code Display Console */}
                <div className="flex-1 bg-[#070708] p-5 font-mono text-xs overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col justify-between relative min-h-[300px]">
                  
                  <div className="absolute top-4 right-4 text-[9px] bg-zinc-800/50 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800 font-bold uppercase tracking-wide">
                    {getLanguage(activeFile)}
                  </div>

                  <div className="leading-relaxed whitespace-pre-wrap select-text text-zinc-300 pr-12">
                    {activeFile === 'summary.md' && (
                      <div className="space-y-2">
                        <div>
                          <span className="text-indigo-400 font-bold text-sm block">MAHESHWARAN S</span>
                          <span className="text-zinc-400 text-xs font-semibold block">MERN Stack Developer & Software Engineer</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 space-y-0.5">
                          <p>Phone: <span className="text-zinc-200">+91 85248 58324</span></p>
                          <p>Email: <a href="mailto:maheshwaran852485@gmail.com" className="text-emerald-400 hover:underline">maheshwaran852485@gmail.com</a></p>
                          <p>Location: <span className="text-zinc-200">Chennai, Tamil Nadu</span> &bull; <a href="https://github.com/Maheshwarandev" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">github.com/Maheshwarandev</a></p>
                        </div>
                        <div className="pt-2 border-t border-zinc-800 text-zinc-300 text-xs leading-relaxed">
                          {terminalFiles['summary.md'].split('\n\n')[1]}
                        </div>
                      </div>
                    )}

                    {activeFile === 'experience.json' && (
                      <span className="text-emerald-400">{terminalFiles['experience.json']}</span>
                    )}

                    {activeFile === 'education.json' && (
                      <span className="text-sky-400">{terminalFiles['education.json']}</span>
                    )}

                    {activeFile === 'certifications.yaml' && (
                      <div>
                        <span className="text-zinc-500"># Click values to audit credentials</span><br />
                        <span className="text-amber-500">certificates:</span>
                        <div className="pl-4 mt-2 space-y-3">
                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"Completion of Internship in Python"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"System Tron"</span><br />
                            <span className="text-zinc-500">  doc: </span><a href="/Python_Internship_Certificate.pdf" target="_blank" className="text-indigo-400 hover:underline">"/Python_Internship_Certificate.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"Introduction to Cyber Security"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"Great Learning Academy"</span><br />
                            <span className="text-zinc-500">  verify: </span><a href="https://www.mygreatlearning.com/certificate/XTXCFGZF" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">"https://www.mygreatlearning.com/certificate/XTXCFGZF"</a><br />
                            <span className="text-zinc-500">  doc: </span><a href="/Introduction_to_Cyber_Security.pdf" target="_blank" className="text-indigo-400 hover:underline">"/Introduction_to_Cyber_Security.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"Introduction to Artificial Intelligence"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"Great Learning Academy"</span><br />
                            <span className="text-zinc-500">  verify: </span><a href="https://www.mygreatlearning.com/certificate/KNIEHZIB" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">"https://www.mygreatlearning.com/certificate/KNIEHZIB"</a><br />
                            <span className="text-zinc-500">  doc: </span><a href="/Introduction_to_Artificial_Intelligence.pdf" target="_blank" className="text-indigo-400 hover:underline">"/Introduction_to_Artificial_Intelligence.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"ChatGPT for Beginners"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"Great Learning Academy"</span><br />
                            <span className="text-zinc-500">  verify: </span><a href="https://www.mygreatlearning.com/certificate/CXCFHOLI" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">"https://www.mygreatlearning.com/certificate/CXCFHOLI"</a><br />
                            <span className="text-zinc-500">  doc: </span><a href="/ChatGPT_for_Beginners.pdf" target="_blank" className="text-indigo-400 hover:underline">"/ChatGPT_for_Beginners.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"What Is Generative AI?"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"LinkedIn Learning"</span><br />
                            <span className="text-zinc-500">  doc: </span><a href="/What_is_Generative_AI.pdf" target="_blank" className="text-indigo-400 hover:underline">"/What_is_Generative_AI.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"PowerBI Workshop"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"OfficeMaster"</span><br />
                            <span className="text-zinc-500">  doc: </span><a href="/PowerBI_Workshop_Certificate.pdf" target="_blank" className="text-indigo-400 hover:underline">"/PowerBI_Workshop_Certificate.pdf"</a>
                          </div>

                          <div>
                            <span className="text-zinc-500">- name: </span><span className="text-zinc-200">"UiPath Automation Fundamentals"</span><br />
                            <span className="text-zinc-500">  provider: </span><span className="text-zinc-300">"UiPath Academy"</span><br />
                            <span className="text-zinc-500">  doc: </span><a href="/UiPath_Automation_Fundamentals.pdf" target="_blank" className="text-indigo-400 hover:underline">"/UiPath_Automation_Fundamentals.pdf"</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer status bar inside console */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>UTF-8</span>
                      <span>•</span>
                      <span>Lines: {terminalFiles[activeFile] ? terminalFiles[activeFile].split('\n').length : 1}</span>
                    </div>
                    <span>READ-ONLY NODE</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Quick instructions info */}
            <div className="bg-zinc-100/50 dark:bg-zinc-900/30 border border-[var(--border-color)]/60 rounded-xl p-4 text-[11px] text-[var(--text-secondary)] font-mono flex items-start space-x-2">
              <ChevronRight size={13} className="mt-0.5 text-indigo-500 flex-shrink-0" />
              <p className="leading-relaxed">
                This terminal serves as an interactive document explorer. Recruiters can browse different files using the virtual sidebar tree to audit summary credentials, education structures, and cert arrays without leaving the workspace. Scroll down below to view verified certificate previews.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 2: CERTIFIED CREDENTIALS & CERTIFICATES GRID
          ======================================================== */}
      <div className="space-y-6 border-t border-[var(--border-color)]/60 pt-10">
        
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400">
            • CERTIFICATES & CREDENTIALS
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            Courses & Verified Certificates
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Certifications, workshops, and verified credentials earned along the way
          </p>
        </div>

        {/* Grid of Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {certificatesList.map((cert, index) => (
            <div 
              key={index}
              className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-4 hover:border-indigo-500/50 transition-all duration-300 group shadow-sm"
            >
              {/* Document preview block */}
              <div className="aspect-[1.41/1] w-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative select-none">
                {cert.document || cert.image ? (
                  <div className="w-full h-full overflow-hidden relative group">
                    <PdfCanvasPreview 
                      pdfUrl={cert.document}
                      previewImage={cert.image}
                      title={cert.name}
                    />
                    {/* Hover Overlay */}
                    {cert.document && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <a 
                          href={cert.document}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-zinc-950 text-white text-xs font-mono font-bold px-4 py-2 rounded-lg border border-zinc-700 flex items-center space-x-1.5 shadow-md hover:scale-105 transition-transform"
                        >
                          <ExternalLink size={12} />
                          <span>View Full Screen PDF</span>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback for certificates without files */
                  <div className="w-full h-full bg-zinc-950 text-zinc-400 font-mono text-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <ShieldCheck size={32} className="text-amber-500/80 animate-pulse" />
                    <div>
                      <span className="block font-bold text-zinc-200">{cert.name}</span>
                      <span className="block text-[10px] text-zinc-500 uppercase mt-0.5">{cert.provider}</span>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                      {cert.date}
                    </span>
                  </div>
                )}
              </div>

              {/* Text details below card */}
              <div>
                <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-indigo-500 dark:group-hover:text-cyan-400 transition-colors">
                  {cert.document ? (
                    <a href={cert.document} target="_blank" rel="noreferrer" className="hover:underline">
                      {cert.name}
                    </a>
                  ) : (
                    <span>{cert.name}</span>
                  )}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono mt-1 flex items-center space-x-1">
                  <span>{cert.provider}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
export default About;
