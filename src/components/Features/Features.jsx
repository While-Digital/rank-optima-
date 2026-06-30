import { motion } from 'framer-motion';
import {
  FaBrain, FaShieldAlt, FaKey, FaCrosshairs,
  FaFileAlt, FaTachometerAlt, FaArrowRight
} from 'react-icons/fa';
import './Features.css';

const features = [
  {
    Icon: FaBrain,
    title: 'AI SEO Analysis',
    desc: 'Our AI engine scans every corner of your site, identifying ranking opportunities humans miss.',
    grad: 'linear-gradient(135deg,#3b82f6,#7c3aed)',
    tag: 'Core AI',
  },
  {
    Icon: FaShieldAlt,
    title: 'Technical SEO Audit',
    desc: 'Deep crawl for broken links, crawl errors, schema markup, Core Web Vitals, and 100+ checks.',
    grad: 'linear-gradient(135deg,#22d3ee,#3b82f6)',
    tag: 'Technical',
  },
  {
    Icon: FaKey,
    title: 'Keyword Intelligence',
    desc: 'Discover high-value keywords, track rankings in real-time, and uncover gap opportunities.',
    grad: 'linear-gradient(135deg,#7c3aed,#ec4899)',
    tag: 'Keywords',
  },
  {
    Icon: FaCrosshairs,
    title: 'Competitor Tracking',
    desc: "Monitor competitors' SEO moves. See what's working for them and how to outrank them.",
    grad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    tag: 'Competitive',
  },
  {
    Icon: FaFileAlt,
    title: 'SEO Reports',
    desc: 'Beautiful white-label reports for clients. Export PDF or share live dashboards with a link.',
    grad: 'linear-gradient(135deg,#10b981,#22d3ee)',
    tag: 'Reporting',
  },
  {
    Icon: FaTachometerAlt,
    title: 'Performance Monitoring',
    desc: 'Track page speed, CWV scores, and performance trends. Get alerted when rankings drop.',
    grad: 'linear-gradient(135deg,#3b82f6,#22d3ee)',
    tag: 'Monitoring',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__container">
        <motion.div className="features__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaBrain size={11} /><span>Features</span>
          </div>
          <h2 className="features__title">
            Everything You Need to{' '}
            <span className="gradient-text">Dominate Search</span>
          </h2>
          <p className="features__desc">
            A complete AI-powered SEO platform. From deep technical audits to
            competitor intelligence — all in one beautiful dashboard.
          </p>
        </motion.div>

        <div className="features__grid">
          {features.map(({ Icon, title, desc, grad, tag }, i) => (
            <motion.div key={title} className="feature-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}>
              <div className="feature-card__glow" style={{ background: grad }} />
              <div className="feature-card__inner">
                <div className="feature-card__icon-wrap" style={{ background: grad + '1a' }}>
                  <Icon size={22} style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                </div>
                <div className="feature-card__tag">{tag}</div>
                <h3 className="feature-card__title">{title}</h3>
                <p className="feature-card__desc">{desc}</p>
                <div className="feature-card__link">
                  Learn more <FaArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
