# 🚀 MAHESHWARAN S — Developer Workspace & Portfolio

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)
![Deployment](https://img.shields.io/badge/Vercel-Live_Deployment-000000?logo=vercel&logoColor=white)

🌐 **Live Deployed Portfolio**: [https://portfolio-steel-kappa-b53wus0hc9.vercel.app/](https://portfolio-steel-kappa-b53wus0hc9.vercel.app/)

A high-performance, developer-first web application and portfolio workspace built for **Maheshwaran S** (MERN Stack Developer & Full Stack Software Engineer). Designed with modern dark mode aesthetics, glassmorphism, dynamic GitHub REST API integration, interactive terminal explorer, and vector PDF certificate previews.

---

## 🌟 Key Features

- ⚡ **Interactive Developer Dashboard**: Real-time system diagnostics, featured project switcher, live GitHub commit stream, and *Open to Work* badge.
- 🎓 **Unified About Operator Page**: Integrated cognitive specs cards, interactive terminal resume (`summary.md`, `experience.json`), and verified certificates grid rendered via PDF.js Canvas.
- 🚀 **Software Products Gallery**: 4 full-stack projects featured with interactive **Quick Preview Modals**, system architecture specs, REST API routes, and database schemas.
- 📈 **Chronological Engineering Journey**: Interactive timeline featuring filter tabs (`All`, `Education & Training`, `Projects & Work`) and live status indicators (`🟢 Active Today`).
- 🛠️ **Technology Inventory**: Categorized grid of languages, frameworks, databases, and DevOps utilities validated in production.
- 🌐 **Live GitHub API Integration**: Dynamically calculates `public_repos`, `totalStars`, `totalCommitsCount`, `topLanguage`, and push activity directly from GitHub API.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Framer Motion, Lucide Icons, Tailwind CSS v4 |
| **Backend** | Node.js, Express.js, REST API Architecture |
| **Databases** | MySQL (Relational DB / JOINs), MongoDB (NoSQL) |
| **PDF Engine** | PDF.js (`pdfjs-dist`) + HTML5 Vector Canvas Rendering |
| **Tooling & API** | GitHub REST API v3, Git, Postman, Vite Manual Chunk Splitting |

---

## 📂 Project Architecture

```
portfolio/
├── public/                     # Static assets, certificate images & resume PDF
│   ├── certificates/           # Vector & high-res certificate previews
│   ├── Maheshwaran_S_Resume.pdf# Original resume document
│   └── favicon.svg             # Cyber terminal monogram emblem
├── src/
│   ├── components/             # Reusable UI components & PDF canvas viewer
│   │   ├── PdfCanvasPreview.jsx
│   │   └── SocialIcons.jsx
│   ├── data/                   # Data sources for projects, certs, journey
│   │   └── portfolioData.js
│   ├── hooks/                  # Custom hooks (Live GitHub API REST fetcher)
│   │   └── useGitHub.js
│   ├── layouts/                # Sticky dual-header & responsive layout
│   │   └── WorkspaceLayout.jsx
│   ├── pages/                  # Application view nodes
│   │   ├── Dashboard.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── TechStack.jsx
│   │   ├── Journey.jsx
│   │   ├── GitHubActivity.jsx
│   │   └── Contact.jsx
│   ├── App.jsx                 # Lazy-loaded router configuration
│   └── index.css               # Global CSS variables & Design Tokens
└── vite.config.js              # Optimized manual chunk build config
```

---

## ⚙️ Local Development Setup

Follow these steps to run the portfolio locally on your computer:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Maheshwarandev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev -- --host
   ```

4. Open your browser and navigate to:
   - **Local**: `http://localhost:5173/`

---

## 📬 Contact & Connect

- **Name**: MAHESHWARAN S
- **Email**: [maheshwaran852485@gmail.com](mailto:maheshwaran852485@gmail.com)
- **Phone**: +91 85248 58324
- **GitHub**: [github.com/Maheshwarandev](https://github.com/Maheshwarandev)
- **Location**: Chennai, Tamil Nadu, India

---

*Designed & Developed by **Maheshwaran S** • Built with React & Node.js*
