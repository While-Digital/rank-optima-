import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBrain, FaShieldAlt, FaKey, FaCrosshairs,
  FaFileAlt, FaTachometerAlt, FaArrowRight,
  FaSearch, FaChartLine, FaRocket, FaCheckCircle
} from 'react-icons/fa';
import './FeaturesPage.css';

const coreFeatures = [
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

const auditSteps = [
  { num: '01', title: 'Enter Your URL', desc: 'Simply paste your website URL into our scanner. No sign-up required for the initial audit.' },
  { num: '02', title: 'AI Deep Crawl', desc: 'Our AI engine crawls 150+ SEO factors in under 30 seconds — technical, content, and off-page.' },
  { num: '03', title: 'Get Your Score', desc: 'Receive a comprehensive SEO score with prioritized recommendations you can act on immediately.' },
];

const comparisonData = [
  { feature: 'AI-Powered Analysis', rankOptima: true, competitors: false },
  { feature: 'Real-Time Scanning', rankOptima: true, competitors: false },
  { feature: '150+ SEO Checks', rankOptima: true, competitors: 'Limited' },
  { feature: 'White-Label Reports', rankOptima: true, competitors: 'Paid Add-on' },
  { feature: 'Competitor Tracking', rankOptima: true, competitors: 'Basic' },
  { feature: 'Keyword Research', rankOptima: 'Unlimited', competitors: '50 keywords' },
];

export default function FeaturesPage() {
  return (
    <div className="page features-page">
      <div className="page__container">

        {/* Hero */}
        <motion.div className="feat-hero"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaRocket size={11} /><span>Features</span>
          </div>
          <h1 className="feat-hero__title">
            The Best SEO Audit Tool{' '}
            <span className="gradient-text">For Your Website</span>
          </h1>
          <p className="feat-hero__desc">
            Powered by AI, built for speed. Rank Optima delivers the most
            comprehensive SEO analysis with actionable insights in seconds.
          </p>
        </motion.div>

        {/* Core Features Grid */}
        <div className="feat-grid">
          {coreFeatures.map(({ Icon, title, desc, grad, tag }, i) => (
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

        {/* How It Works Section */}
        <motion.div className="feat-how"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaSearch size={11} /><span>How It Works</span>
          </div>
          <h2 className="feat-section-title">
            Audit Your Website in{' '}
            <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <div className="feat-steps">
            {auditSteps.map(({ num, title, desc }, i) => (
              <motion.div key={num} className="feat-step glass-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.12 }}>
                <span className="feat-step__num gradient-text">{num}</span>
                <h3 className="feat-step__title">{title}</h3>
                <p className="feat-step__desc">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div className="feat-compare"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaChartLine size={11} /><span>Why Choose Us</span>
          </div>
          <h2 className="feat-section-title">
            Rank Optima vs{' '}
            <span className="gradient-text">The Competition</span>
          </h2>
          <div className="feat-table-wrap glass-card">
            <table className="feat-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="feat-table__highlight">Rank Optima</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map(({ feature, rankOptima, competitors }) => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    <td className="feat-table__highlight">
                      {rankOptima === true ? (
                        <FaCheckCircle size={16} className="feat-check" />
                      ) : rankOptima}
                    </td>
                    <td className="feat-table__other">
                      {competitors === true ? (
                        <FaCheckCircle size={16} className="feat-check--muted" />
                      ) : competitors === false ? (
                        <span className="feat-x">✕</span>
                      ) : competitors}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="feat-cta glass-card"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="feat-cta__title">
            Start Your Free SEO Audit{' '}
            <span className="gradient-text">Today</span>
          </h2>
          <p className="feat-cta__desc">
            No credit card required. Get a comprehensive audit of your website in under 30 seconds.
          </p>
          <Link to="/seo-audit" className="feat-cta__btn">
            <FaRocket size={14} /> Launch Free Audit
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
