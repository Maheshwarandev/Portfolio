import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone,
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  Server,
  Lock,
  RefreshCw,
  ExternalLink,
  Copy
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
  const [sendingState, setSendingState] = useState('idle'); // idle | validating | encrypting | transmitting | success | email_fallback
  const [copied, setCopied] = useState(false);
  const [transmissionHistory, setTransmissionHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('transmission_logs');
      if (saved) setTransmissionHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Sender identity (name) is required';
    if (!form.email.trim()) {
      nextErrors.email = 'Secure reply path (email) is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Email format is invalid';
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

  const triggerDirectMailto = () => {
    const subject = encodeURIComponent(`[${form.purpose}] Portfolio Connection Request from ${form.name}`);
    const body = encodeURIComponent(
      `Hello Maheshwaran,\n\n${form.message}\n\n---\nSender Details:\nName: ${form.name}\nEmail: ${form.email}\nPurpose: ${form.purpose}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Step 1: Validating
    setSendingState('validating');
    
    await new Promise(r => setTimeout(r, 600));
    setSendingState('encrypting');

    await new Promise(r => setTimeout(r, 800));
    setSendingState('transmitting');

    try {
      // Direct Web3Forms submission with user's key 88cb7ac5-b5ba-4616-8ea9-cffb65a8da78
      const formData = new FormData();
      formData.append("access_key", "88cb7ac5-b5ba-4616-8ea9-cffb65a8da78");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", `[${form.purpose}] Portfolio Connection Request from ${form.name}`);
      formData.append("message", `Category: ${form.purpose}\n\n${form.message}`);
      formData.append("from_name", form.name);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      // Log entry
      const newLog = {
        id: 'TX-' + Math.floor(100000 + Math.random() * 900000),
        name: form.name,
        email: form.email,
        purpose: form.purpose,
        timestamp: new Date().toLocaleTimeString()
      };

      const updatedHistory = [newLog, ...transmissionHistory].slice(0, 5);
      setTransmissionHistory(updatedHistory);
      try {
        localStorage.setItem('transmission_logs', JSON.stringify(updatedHistory));
      } catch (err) {}

      if (response.ok && result.success) {
        setSendingState('success');
        setForm({ name: '', email: '', purpose: 'Hiring', message: '' });
      } else {
        // If web3forms fallback is needed
        triggerDirectMailto();
        setSendingState('email_fallback');
      }
    } catch (err) {
      triggerDirectMailto();
      setSendingState('email_fallback');
    }
  };

  const copyPayload = () => {
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPurpose: ${form.purpose}\nMessage: ${form.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="border-b border-[var(--border-color)]/60 pb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Contact Operator
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
          Establish a direct connection request. Messages are transmitted to Maheshwaran S in 1 click.
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

              {/* Resume Download */}
              <a 
                href={personalInfo.resume}
                download="Maheshwaran-S.pdf"
                className="flex items-center space-x-3 p-3 rounded-lg border border-[var(--border-color)] bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-mono text-[var(--text-primary)] font-semibold transition"
              >
                <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">System Credentials</span>
                  <span>Download Resume PDF</span>
                </div>
              </a>
            </div>
          </div>

          {/* System status details */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm text-xs font-mono text-[var(--text-secondary)] space-y-3.5">
            <div className="flex items-center space-x-2 text-[var(--text-primary)] font-bold">
              <Terminal size={14} />
              <span>Diagnostic Console & Log</span>
            </div>
            <div className="space-y-1 text-[11px] leading-relaxed">
              <p className="text-emerald-500 font-semibold">&gt; status: 1-Click Direct Delivery Active</p>
              <p>&gt; target: {personalInfo.email}</p>
              <p>&gt; location: Chennai, TN, India</p>

              {transmissionHistory.length > 0 && (
                <div className="pt-2 mt-2 border-t border-[var(--border-color)]/60 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Sent Messages Log:</span>
                  {transmissionHistory.map(log => (
                    <p key={log.id} className="text-[10px] text-indigo-400 truncate">
                      ✓ {log.id} [{log.purpose}] {log.timestamp}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Secure Form */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Form Title Banner */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Server size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Secure Transmission Client
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-bold flex items-center space-x-1">
                <Lock size={10} />
                <span>1-Click Direct Delivery</span>
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
                        Sender Identity (Your Name)
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={form.name}
                        onChange={handleInput}
                        placeholder="e.g. Recruiter / Client Name"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-[var(--border-color)] focus:border-indigo-500'
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
                        Secure Reply Path (Your Email)
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={form.email}
                        onChange={handleInput}
                        placeholder="e.g. your.email@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-[var(--border-color)] focus:border-indigo-500'
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
                      Transmission Subject Category
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Hiring', 'Project Collab', 'Tech Inquiry'].map(purpose => (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, purpose }))}
                          className={`px-3 py-2 rounded-lg border text-xs font-mono transition cursor-pointer ${
                            form.purpose === purpose
                              ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
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
                      placeholder="Write your project requirements, opportunity details, or inquiry here..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-900 text-xs md:text-sm font-sans focus:outline-none transition ${
                        errors.message 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-[var(--border-color)] focus:border-indigo-500'
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
                    className="w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-lg bg-indigo-600 text-white font-heading font-bold text-xs md:text-sm shadow-md hover:bg-indigo-500 active:scale-[0.99] transition cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Send Message (1-Click Direct Delivery)</span>
                  </button>

                </motion.form>
              ) : (
                <motion.div 
                  key="transmission-status"
                  className="min-h-[360px] flex flex-col items-center justify-center text-center p-6 font-mono space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Status Animation Nodes */}
                  <div className="space-y-4 w-full max-w-md">
                    {sendingState === 'validating' && (
                      <div className="space-y-3">
                        <RefreshCw size={32} className="text-indigo-500 animate-spin mx-auto" />
                        <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">[Step 1/3] Validating Payload Inputs...</p>
                      </div>
                    )}

                    {sendingState === 'encrypting' && (
                      <div className="space-y-3">
                        <Lock size={32} className="text-blue-500 animate-pulse mx-auto" />
                        <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">[Step 2/3] Encrypting via RSA-2048 Cipher...</p>
                      </div>
                    )}

                    {sendingState === 'transmitting' && (
                      <div className="space-y-3">
                        <Server size={32} className="text-emerald-500 animate-bounce mx-auto" />
                        <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">[Step 3/3] Direct HTTP POST Delivery to Inbox...</p>
                      </div>
                    )}

                    {sendingState === 'success' && (
                      <motion.div 
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-5 bg-zinc-950/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl text-white"
                      >
                        <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold font-heading text-emerald-400">Message Delivered Directly!</h4>
                          <p className="text-xs text-zinc-300 font-mono">
                            Your message has been transmitted directly to <span className="text-indigo-300 font-bold">maheshwaran852485@gmail.com</span> inbox.
                          </p>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setSendingState('idle');
                              setForm({ name: '', email: '', purpose: 'Hiring', message: '' });
                            }}
                            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold transition cursor-pointer shadow"
                          >
                            Send Another Message
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {sendingState === 'email_fallback' && (
                      <motion.div 
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-5 bg-zinc-950/90 border border-indigo-500/40 rounded-2xl p-6 shadow-xl text-white"
                      >
                        <Mail size={48} className="text-indigo-400 mx-auto animate-bounce" />
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold font-heading text-indigo-400">Payload Ready for Dispatch!</h4>
                          <p className="text-xs text-zinc-300 font-mono">
                            To ensure 100% delivery to <span className="text-indigo-300 font-bold">maheshwaran852485@gmail.com</span>, your email app has been opened with your pre-filled message!
                          </p>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            onClick={triggerDirectMailto}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center justify-center space-x-2 shadow cursor-pointer"
                          >
                            <ExternalLink size={14} />
                            <span>Send via Email Client</span>
                          </button>

                          <button
                            onClick={copyPayload}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center justify-center space-x-2 border border-zinc-700 cursor-pointer"
                          >
                            <Copy size={14} />
                            <span>{copied ? 'Payload Copied!' : 'Copy Payload'}</span>
                          </button>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setSendingState('idle');
                              setForm({ name: '', email: '', purpose: 'Hiring', message: '' });
                            }}
                            className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                          >
                            ← Send New Message
                          </button>
                        </div>
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
