import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone,
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  Server
} from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';
import { personalInfo } from '../data/portfolioData';

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    purpose: 'Hiring',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [sendingState, setSendingState] = useState('idle'); // idle | validating | encrypting | transmitting | success

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Operator name is required';
    if (!form.email.trim()) {
      nextErrors.email = 'Secure reply path (email) is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Reply path format is invalid';
    }
    if (!form.message.trim()) nextErrors.message = 'Message payload cannot be empty';
    
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger simulation of secure transmission
    setSendingState('validating');
    
    setTimeout(() => {
      setSendingState('encrypting');
    }, 800);

    setTimeout(() => {
      setSendingState('transmitting');
    }, 1800);

    setTimeout(() => {
      setSendingState('success');
      // Reset form
      setForm({ name: '', email: '', purpose: 'Hiring', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="border-b border-[var(--border-color)]/60 pb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Contact Operator
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
          Establish a secure connection request. Messages are transmitted to the database and operator logs instantly.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Social nodes */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Operational Nodes
            </h3>
            
            <div className="space-y-2">
              {/* Email */}
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <Mail size={16} className="text-indigo-600 dark:text-indigo-400" />
                <div className="truncate">
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">Direct Link</span>
                  <span className="block truncate">{personalInfo.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a 
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">Voice Channel</span>
                  <span>{personalInfo.phone}</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">Professional Node</span>
                  <span>linkedin/maheshwarandev</span>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <Github size={16} className="text-zinc-700 dark:text-zinc-300" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">Version Control</span>
                  <span>github/Maheshwarandev</span>
                </div>
              </a>

              {/* Operator Specs */}
              <Link 
                to="/about"
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">System Credentials</span>
                  <span>Explore Operator Specs</span>
                </div>
              </Link>
            </div>
          </div>

          {/* System status details */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm text-xs font-mono text-[var(--text-secondary)] space-y-3.5">
            <div className="flex items-center space-x-2 text-[var(--text-primary)] font-bold">
              <Terminal size={14} />
              <span>Diagnostic Console</span>
            </div>
            <div className="space-y-1.5 text-[11px] leading-relaxed">
              <p>&gt; openssl genrsa -out private.pem 2048</p>
              <p>&gt; db.contacts.createIndex(&#123; email: 1 &#125;)</p>
              <p>&gt; status: listening on TLS 443</p>
              <p>&gt; location tracking: Chennai, IN</p>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Form */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Form Title Banner */}
            <div className="flex items-center space-x-2 border-b border-[var(--border-color)]/60 pb-4 mb-6">
              <Server size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Secure Transmission Client
              </span>
            </div>

            <AnimatePresence mode="wait">
              {sendingState === 'idle' ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        Sender Identity
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={form.name}
                        onChange={handleInput}
                        placeholder="e.g. John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-[var(--border-color)] focus:border-zinc-500'
                        }`}
                      />
                      {errors.name && (
                        <div className="text-[10px] text-red-500 font-mono flex items-center space-x-1">
                          <AlertCircle size={10} />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                        Secure Reply Path (Email)
                      </label>
                      <input 
                        type="text" 
                        name="email"
                        value={form.email}
                        onChange={handleInput}
                        placeholder="e.g. client@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-[var(--border-color)] focus:border-zinc-500'
                        }`}
                      />
                      {errors.email && (
                        <div className="text-[10px] text-red-500 font-mono flex items-center space-x-1">
                          <AlertCircle size={10} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Purpose Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Transmission Subject Node
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Hiring', 'Project Collab', 'Tech Inquiry'].map(purpose => (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, purpose }))}
                          className={`px-3 py-2 rounded-lg border text-xs font-mono transition cursor-pointer ${
                            form.purpose === purpose
                              ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-500 dark:border-zinc-500 text-[var(--text-primary)] font-bold shadow-sm'
                              : 'bg-zinc-50 dark:bg-zinc-900 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {purpose}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Payload */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Message Payload
                    </label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleInput}
                      placeholder="Write your connection query here..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                        errors.message 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-[var(--border-color)] focus:border-zinc-500'
                      }`}
                    />
                    {errors.message && (
                      <div className="text-[10px] text-red-500 font-mono flex items-center space-x-1">
                        <AlertCircle size={10} />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-black font-heading font-bold text-xs md:text-sm shadow-md hover:bg-zinc-900 dark:hover:bg-zinc-100 transition cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Transmit Message</span>
                  </button>

                </motion.form>
              ) : (
                <motion.div 
                  key="transmission-status"
                  className="min-h-[300px] flex flex-col items-center justify-center text-center p-6 font-mono"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Status Animation Nodes */}
                  <div className="space-y-4">
                    {sendingState === 'validating' && (
                      <div className="space-y-2">
                        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-indigo-600 dark:text-indigo-400">Verifying transmission payloads...</p>
                      </div>
                    )}
                    {sendingState === 'encrypting' && (
                      <div className="space-y-2">
                        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-blue-600 dark:text-blue-400">Encrypting packages via RSA-2048...</p>
                      </div>
                    )}
                    {sendingState === 'transmitting' && (
                      <div className="space-y-2">
                        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Broadcasting sockets packets...</p>
                      </div>
                    )}
                    {sendingState === 'success' && (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="space-y-4"
                      >
                        <CheckCircle2 size={42} className="text-emerald-500 mx-auto" />
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[var(--text-primary)]">Transmission Successful</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">HTTP/1.1 202 Accepted &bull; Sockets Confirmed</p>
                        </div>
                        <button
                          onClick={() => setSendingState('idle')}
                          className="mt-6 px-4 py-2 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-semibold bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                        >
                          Send New Transmission
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

    </div>
  );
}
export default Contact;
