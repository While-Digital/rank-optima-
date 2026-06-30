import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle, FaCrown, FaArrowRight,
  FaSeedling, FaRocket, FaBuilding,
  FaSearch, FaLink, FaFileAlt, FaChartLine,
  FaUserTie, FaHandshake, FaBullhorn, FaTools
} from 'react-icons/fa';
import './Pricing.css';

const plans = [
  {
    Icon: FaSeedling,
    name: 'Basic SEO',
    tag: 'For Startups',
    monthly: 299,
    yearly: 199,
    color: '#4f8eff',
    popular: false,
    cta: 'Get Started',
    desc: 'Foundational SEO service to establish your online presence and start ranking.',
    deliverables: [
      { Icon: FaSearch,   text: 'Full Website SEO Audit' },
      { Icon: FaTools,    text: 'On-Page Optimization (10 pages)' },
      { Icon: FaLink,     text: '5 Quality Backlinks/mo' },
      { Icon: FaFileAlt,  text: 'Keyword Research (20 keywords)' },
      { Icon: FaChartLine,text: 'Monthly Performance Report' },
      { Icon: FaBullhorn, text: 'Google Business Setup' },
    ],
  },
  {
    Icon: FaRocket,
    name: 'Growth SEO',
    tag: 'Most Popular',
    monthly: 699,
    yearly: 499,
    color: '#a78bfa',
    popular: true,
    cta: 'Start Now',
    desc: 'Aggressive SEO strategy for businesses serious about ranking on page one.',
    deliverables: [
      { Icon: FaSearch,   text: 'Deep Technical SEO Audit' },
      { Icon: FaTools,    text: 'On-Page Optimization (30 pages)' },
      { Icon: FaLink,     text: '15 Premium Backlinks/mo' },
      { Icon: FaFileAlt,  text: 'Keyword Research (60 keywords)' },
      { Icon: FaChartLine,text: 'Bi-Weekly Reports & Calls' },
      { Icon: FaBullhorn, text: 'Content Strategy (4 blogs/mo)' },
      { Icon: FaUserTie,  text: 'Dedicated SEO Manager' },
      { Icon: FaHandshake,text: 'Competitor Gap Analysis' },
    ],
  },
  {
    Icon: FaBuilding,
    name: 'Enterprise SEO',
    tag: 'For Agencies',
    monthly: 1499,
    yearly: 999,
    color: '#22d3ee',
    popular: false,
    cta: 'Contact Us',
    desc: 'Full-scale SEO management for large brands and multi-location businesses.',
    deliverables: [
      { Icon: FaSearch,   text: 'Enterprise-Grade SEO Audit' },
      { Icon: FaTools,    text: 'Unlimited Page Optimization' },
      { Icon: FaLink,     text: '40+ Authority Backlinks/mo' },
      { Icon: FaFileAlt,  text: 'Full Keyword Universe Mapping' },
      { Icon: FaChartLine,text: 'Weekly Reports & Strategy Calls' },
      { Icon: FaBullhorn, text: 'Content Production (12 blogs/mo)' },
      { Icon: FaUserTie,  text: 'Senior SEO Strategist' },
      { Icon: FaHandshake,text: 'White-Label Reporting' },
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__container">

        <motion.div className="pricing__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaCrown size={11} /><span>SEO Service Plans</span>
          </div>
          <h2 className="pricing__title">
            Managed SEO Plans That{' '}
            <span className="gradient-text">Deliver Results</span>
          </h2>
          <p className="pricing__desc">
            Done-for-you SEO services. We handle everything so you can focus on your business.
          </p>

          <div className="pricing__toggle">
            <span className={!yearly ? 'active' : ''}>Monthly</span>
            <button className={`toggle-switch${yearly ? ' on' : ''}`}
              onClick={() => setYearly(!yearly)} aria-label="Toggle yearly">
              <div className="toggle-thumb" />
            </button>
            <span className={yearly ? 'active' : ''}>
              Yearly <span className="save-badge">Save 30%</span>
            </span>
          </div>
        </motion.div>

        <div className="pricing__grid">
          {plans.map(({ Icon, name, tag, monthly, yearly: yr, color, popular, desc, cta, deliverables }, i) => {
            const price = yearly ? yr : monthly;
            return (
              <motion.div key={name}
                className={`pricing-card${popular ? ' pricing-card--popular' : ''}`}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}>

                {popular && <div className="popular-badge">Most Popular</div>}

                {/* Top */}
                <div className="pricing-card__top">
                  <div className="pricing-card__icon-row">
                    <div className="pricing-card__icon"
                      style={{ background: color + '18', border: `1px solid ${color}35`, color }}>
                      <Icon size={20} />
                    </div>
                    <span className="pricing-card__tag" style={{ color, background: color + '14' }}>{tag}</span>
                  </div>
                  <h3 className="pricing-card__name">{name}</h3>
                  <p className="pricing-card__desc">{desc}</p>
                </div>

                {/* Price */}
                <div className="pricing-card__price">
                  <span className="price-currency">$</span>
                  <motion.span className="price-amount"
                    key={`${name}-${yearly}`}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}>
                    {price}
                  </motion.span>
                  <span className="price-period">/mo</span>
                </div>

                {/* Divider */}
                <div className="pricing-card__divider" style={{ background: color + '30' }} />

                {/* Deliverables */}
                <ul className="pricing-card__features">
                  {deliverables.map(({ Icon: DIcon, text }) => (
                    <li key={text}>
                      <span className="feat-icon" style={{ color, background: color + '14' }}>
                        <DIcon size={11} />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  className={`pricing-card__btn${popular ? ' btn--highlight' : ''}`}
                  style={popular ? {} : { borderColor: color + '50', color }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {cta} <FaArrowRight size={12} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.p className="pricing__note"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}>
          All plans include a free site audit before we begin. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  );
}
