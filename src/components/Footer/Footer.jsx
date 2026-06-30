import { motion } from 'framer-motion';
import {
  FaTwitter, FaLinkedinIn, FaGithub, FaInstagram,
  FaHeart
} from 'react-icons/fa';
import './Footer.css';

const links = {
  Product:   ['Features', 'SEO Audit', 'Keyword Tracking', 'Competitor Analysis', 'API'],
  Resources: ['Documentation', 'Blog', 'Case Studies', 'SEO Guides', 'Changelog'],
  Company:   ['About', 'Careers', 'Press', 'Partners', 'Contact', 'Legal'],
};

const socials = [
  { Icon: FaTwitter,    href: '#', label: 'Twitter' },
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { Icon: FaGithub,     href: '#', label: 'GitHub' },
  { Icon: FaInstagram,  href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top row */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <FooterLogoIcon />
              <div className="footer__logo-text">
                <span className="footer__logo-rank">Rank</span>
                <span className="footer__logo-optima">Optima</span>
              </div>
            </div>
            <p className="footer__tagline">
              AI-powered SEO audits that help websites rank higher, faster.
            </p>
            <div className="footer__socials">
              {socials.map(({ Icon, href, label }) => (
                <motion.a key={label} href={href} className="footer__social-btn"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}>
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="footer__link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Rank Optima. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="footer__made">
            Made with <span className="footer__heart"><FaHeart size={11} /></span> by Rank Optima Team
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f8eff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="17" r="7" fill="rgba(79,142,255,0.12)" stroke="url(#flg)" strokeWidth="2" />
      <rect x="14" y="18" width="2.2" height="3.5" rx="0.6" fill="url(#flg)" />
      <rect x="17" y="15.5" width="2.2" height="6" rx="0.6" fill="url(#flg)" />
      <rect x="20" y="13.5" width="2.2" height="8" rx="0.6" fill="url(#flg)" />
      <line x1="23.5" y1="22.5" x2="29" y2="28" stroke="url(#flg)" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
