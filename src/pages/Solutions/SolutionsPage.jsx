import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaChartLine, FaUsers, FaRocket,
  FaBuilding, FaShoppingCart, FaArrowRight,
  FaCheckCircle, FaGlobe, FaCogs, FaShieldAlt
} from 'react-icons/fa';
import './SolutionsPage.css';

const solutions = [
  {
    Icon: FaSearch,
    title: 'Local SEO Dominance',
    desc: 'Get found by nearby customers. Optimize your Google Business Profile, local citations, and map rankings to drive foot traffic.',
    color: '#4f8eff',
    features: ['Google Business Profile Optimization', 'Local Citation Building', 'Review Management', 'Map Pack Rankings'],
  },
  {
    Icon: FaRocket,
    title: 'E-Commerce SEO',
    desc: 'Boost product visibility across search engines. Optimized category pages, product schema, and technical SEO for online stores.',
    color: '#a78bfa',
    features: ['Product Page Optimization', 'Category SEO Strategy', 'Schema Markup', 'Site Speed Optimization'],
  },
  {
    Icon: FaBuilding,
    title: 'Enterprise SEO',
    desc: 'Scale SEO across large websites with hundreds of pages. Technical audits, content strategy, and dedicated SEO management.',
    color: '#22d3ee',
    features: ['Multi-Site Management', 'Custom Reporting', 'Dedicated Strategist', 'White-Label Solutions'],
  },
  {
    Icon: FaChartLine,
    title: 'Startup Growth SEO',
    desc: 'Rapid organic growth for early-stage companies. Keyword research, content planning, and aggressive link building strategies.',
    color: '#f59e0b',
    features: ['Keyword Gap Analysis', 'Content Marketing', 'Link Building', 'Growth Analytics'],
  },
];

const stats = [
  { value: '2.4M+', label: 'Websites Analyzed' },
  { value: '98.7%', label: 'Accuracy Rate' },
  { value: '<30s', label: 'Scan Time' },
  { value: '150+', label: 'SEO Checks' },
];

const industries = [
  { Icon: FaShoppingCart, title: 'E-Commerce', desc: 'Online stores & marketplaces' },
  { Icon: FaBuilding, title: 'SaaS & Tech', desc: 'Software & technology companies' },
  { Icon: FaGlobe, title: 'Healthcare', desc: 'Medical practices & clinics' },
  { Icon: FaUsers, title: 'Agencies', desc: 'Marketing & SEO agencies' },
  { Icon: FaCogs, title: 'Manufacturing', desc: 'Industrial & manufacturing' },
  { Icon: FaShieldAlt, title: 'Legal & Finance', desc: 'Law firms & financial services' },
];

export default function SolutionsPage() {
  return (
    <div className="page solutions-page">
      <div className="page__container">

        {/* Hero Section */}
        <motion.div className="sol-hero"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaRocket size={11} /><span>Our Solutions</span>
          </div>
          <h1 className="sol-hero__title">
            SEO Solutions Built for{' '}
            <span className="gradient-text">Every Business</span>
          </h1>
          <p className="sol-hero__desc">
            Whether you're a local shop or a global enterprise, Rank Optima
            delivers tailored SEO strategies that drive real results.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div className="sol-stats"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          {stats.map(({ value, label }) => (
            <div key={label} className="sol-stat">
              <span className="sol-stat__value gradient-text">{value}</span>
              <span className="sol-stat__label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Solution Cards */}
        <div className="sol-grid">
          {solutions.map(({ Icon, title, desc, color, features }, i) => (
            <motion.div key={title} className="sol-card glass-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}>
              <div className="sol-card__icon" style={{ background: color + '18', border: `1px solid ${color}35`, color }}>
                <Icon size={24} />
              </div>
              <h3 className="sol-card__title">{title}</h3>
              <p className="sol-card__desc">{desc}</p>
              <ul className="sol-card__features">
                {features.map((f) => (
                  <li key={f}>
                    <FaCheckCircle size={12} style={{ color, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/seo-audit" className="sol-card__link">
                Get Started <FaArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Industries Section */}
        <motion.div className="sol-industries"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaGlobe size={11} /><span>Industries We Serve</span>
          </div>
          <h2 className="sol-section-title">
            Trusted Across{' '}
            <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="sol-section-desc">
            Our SEO solutions are designed to work across diverse industries,
            delivering measurable growth no matter your sector.
          </p>
          <div className="sol-industries-grid">
            {industries.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} className="sol-industry-card glass-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <div className="sol-industry-icon">
                  <Icon size={22} />
                </div>
                <h4 className="sol-industry-title">{title}</h4>
                <p className="sol-industry-desc">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="sol-cta glass-card"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="sol-cta__title">
            Ready to Dominate Your{' '}
            <span className="gradient-text">Market?</span>
          </h2>
          <p className="sol-cta__desc">
            Get a free SEO audit and discover how our tailored solutions
            can transform your online presence.
          </p>
          <div className="sol-cta__buttons">
            <Link to="/seo-audit" className="sol-cta__btn sol-cta__btn--primary">
              <FaRocket size={14} /> Free SEO Audit
            </Link>
            <Link to="/pricing" className="sol-cta__btn sol-cta__btn--secondary">
              View Pricing <FaArrowRight size={12} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
