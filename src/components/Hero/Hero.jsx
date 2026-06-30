import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBolt, FaArrowRight, FaPlay, FaCheckCircle,
  FaChartLine, FaStar, FaBrain, FaExclamationTriangle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import './Hero.css';

const floatingCards = [
  { icon: FaCheckCircle, label: '35 SEO Issues Fixed', sub: 'Technical audit complete', color: '#22d3ee', delay: 0 },
  { icon: FaChartLine,   label: 'Traffic +187%',       sub: 'Opportunity found',       color: '#4f8eff', delay: 0.3 },
  { icon: HiSparkles,    label: 'AI Analysis Done',     sub: '142 recommendations',     color: '#a78bfa', delay: 0.6 },
];

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__blobs" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__container">
        {/* Left */}
        <div className="hero__content">
          <motion.div className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <FaBolt className="badge-icon" size={11} />
            <span>AI-Powered SEO Platform</span>
          </motion.div>

          <motion.h1 className="hero__headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            AI SEO Audits That Help
            <br />
            <span className="hero__headline-highlight">Websites Rank Higher</span>
          </motion.h1>

          <motion.p className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}>
            Analyze your website, discover hidden SEO problems, and get
            intelligent AI recommendations to improve rankings and drive
            organic traffic.
          </motion.p>

          <motion.div className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38 }}>
            <motion.a href="#scanner" className="btn-primary"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#scanner')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <FaBolt size={14} />
              Analyze Website
              <FaArrowRight size={13} />
            </motion.a>
            <motion.button className="btn-secondary"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <span className="play-ring"><FaPlay size={10} /></span>
              View Demo
            </motion.button>
          </motion.div>

          <motion.div className="hero__trust"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}>
            {['AI Powered', 'Instant Audit', 'Detailed Reports', 'No Card Needed'].map((t) => (
              <div className="trust-badge" key={t}>
                <FaCheckCircle size={12} />
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Laptop mockup */}
        <motion.div className="hero__visual"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="laptop-wrap">
            <motion.div className="laptop"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="laptop__screen"><DashboardPreview /></div>
              <div className="laptop__body" />
              <div className="laptop__base" />
            </motion.div>

            {floatingCards.map((card, i) => (
              <FloatingCard key={i} card={card} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ card, index }) {
  const Icon = card.icon;
  const positions = [
    { top: '12%', left: '-8%' },
    { bottom: '22%', left: '-12%' },
    { top: '30%', right: '-10%' },
  ];
  return (
    <motion.div className="floating-card" style={positions[index]}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.8 + card.delay },
        scale:   { duration: 0.5, delay: 0.8 + card.delay },
        y:       { duration: 3 + index, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
      }}>
      <div className="fcard__icon" style={{ color: card.color }}>
        <Icon size={15} />
      </div>
      <div>
        <div className="fcard__label">{card.label}</div>
        <div className="fcard__sub">{card.sub}</div>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let n = 0;
      const iv = setInterval(() => {
        n += 2; setScore(n);
        if (n >= 94) clearInterval(iv);
      }, 20);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dashboard__sidebar">
        <div className="db-logo">
          <div className="db-logo-dot" /><span>RankOptima</span>
        </div>
        {['Dashboard', 'Audit', 'Keywords', 'Reports', 'Competitors'].map((item, i) => (
          <div key={item} className={`db-nav-item${i === 0 ? ' active' : ''}`}>
            <div className="db-nav-dot" /><span>{item}</span>
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="dashboard__main">
        <div className="db-score-row">
          <div className="db-score-card">
            <div className="db-score-circle">
              <svg viewBox="0 0 80 80" className="score-svg">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="url(#sg)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - score / 100)}`}
                  transform="rotate(-90 40 40)"
                  style={{ transition: 'stroke-dashoffset 0.05s' }} />
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4f8eff" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="score-text">
                <span className="score-num">{score}</span>
                <span className="score-label">/100</span>
              </div>
            </div>
            <div className="db-score-meta">
              <div className="db-score-title">SEO Score</div>
              <div className="db-score-tag">Excellent</div>
            </div>
          </div>

          <div className="db-metrics">
            {[
              { label: 'Technical',    val: 96, color: '#22d3ee' },
              { label: 'Performance',  val: 88, color: '#a78bfa' },
              { label: 'Keywords',     val: 91, color: '#4f8eff' },
            ].map((m) => (
              <div key={m.label} className="db-metric-item">
                <div className="db-metric-header">
                  <span>{m.label}</span>
                  <span style={{ color: m.color }}>{m.val}%</span>
                </div>
                <div className="db-metric-bar">
                  <motion.div className="db-metric-fill"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.val}%` }}
                    transition={{ duration: 1, delay: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-ai-section">
          <div className="db-ai-label">
            <FaBrain size={9} /> AI Suggestions
          </div>
          {[
            { text: 'Add meta descriptions to 12 pages', priority: 'High' },
            { text: 'Improve page load speed by 0.8s',  priority: 'Medium' },
            { text: 'Fix 4 broken internal links',       priority: 'High' },
          ].map((s, i) => (
            <motion.div key={i} className="db-ai-item"
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.2 }}>
              <FaExclamationTriangle size={8} color={s.priority === 'High' ? '#f59e0b' : '#94a3b8'} />
              <span>{s.text}</span>
              <span className={`db-priority db-priority--${s.priority.toLowerCase()}`}>{s.priority}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
