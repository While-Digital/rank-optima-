import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaBolt, FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
  { label: 'Features',  route: '/features' },
  { label: 'Solutions', route: '/solutions' },
  { label: 'SEO Audit', route: '/seo-audit' },
  { label: 'Pricing',   route: '/pricing' },
  { label: 'Blog',      route: '/blog' },
];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('ro-theme');
    if (saved) return saved;
  } catch {}
  return 'light';
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme]           = useState(getInitialTheme);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ro-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <motion.nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="logo-mark"><LogoIcon /></div>
          <div className="logo-text">
            <span className="logo-rank">Rank</span>
            <span className="logo-optima">Optima</span>
          </div>
        </Link>

        {/* Center nav */}
        <ul className="navbar__links">
          {navLinks.map(({ label, route }) => (
            <li key={label}>
              <Link
                to={route}
                className={`navbar__link${location.pathname === route ? ' navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="navbar__cta">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/seo-audit" className="navbar__btn">
              <FaBolt size={11} />
              Start Free Audit
            </Link>
          </motion.div>
          <motion.button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="navbar__theme-icon"
                >
                  <FaSun size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="navbar__theme-icon"
                >
                  <FaMoon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="navbar__mobile-links">
              {navLinks.map(({ label, route }, i) => (
                <motion.li key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <Link
                    to={route}
                    className={location.pathname === route ? 'active' : ''}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="navbar__mobile-cta">
              <button className="navbar__theme-toggle navbar__theme-toggle--mobile" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
              </button>
              <Link to="/seo-audit" className="navbar__btn">
                <FaBolt size={11} /> Start Free Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── Animated Logo SVG ── */
function LogoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f8eff" />
          <stop offset="55%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="lg2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#4f8eff" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" stroke="url(#lg1)" strokeWidth="1.2" fill="none" opacity="0.35" strokeDasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="20" r="13" stroke="url(#lg2)" strokeWidth="0.8" fill="none" opacity="0.25" strokeDasharray="4 6">
        <animateTransform attributeName="transform" type="rotate" from="360 20 20" to="0 20 20" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="18" cy="17" r="7" fill="rgba(79,142,255,0.12)" stroke="url(#lg1)" strokeWidth="2" />
      <rect x="14" y="18" width="2.2" height="3.5" rx="0.6" fill="url(#lg1)" />
      <rect x="17" y="15.5" width="2.2" height="6" rx="0.6" fill="url(#lg1)" />
      <rect x="20" y="13.5" width="2.2" height="8" rx="0.6" fill="url(#lg1)" />
      <line x1="23.5" y1="22.5" x2="29" y2="28" stroke="url(#lg1)" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="29" cy="28" r="1.8" fill="#22d3ee">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
