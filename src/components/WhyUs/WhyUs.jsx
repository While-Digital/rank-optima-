import { motion } from 'framer-motion';
import {
  FaBrain, FaBolt, FaFileAlt, FaBullseye,
  FaClock, FaCheckCircle
} from 'react-icons/fa';
import './WhyUs.css';

const reasons = [
  { Icon: FaBrain,    title: 'AI-Powered Insights',        desc: 'Machine learning trained on millions of ranked pages delivers recommendations that actually move the needle.', color: '#a78bfa' },
  { Icon: FaBolt,     title: 'Faster Audits',              desc: 'Complete a full 150-point SEO audit in under 30 seconds — 10x faster than any manual audit process.', color: '#4f8eff' },
  { Icon: FaFileAlt,  title: 'Agency-Ready Reports',       desc: 'White-label PDF and live shareable reports your clients will be proud to present in any boardroom.', color: '#22d3ee' },
  { Icon: FaBullseye, title: 'Accurate Recommendations',   desc: 'Every fix is ranked by impact, so you always know what to work on first for the biggest ranking gains.', color: '#10b981' },
  { Icon: FaClock,    title: 'Save Hours of Manual Work',  desc: 'Automate the tedious parts of SEO. Let our AI do the heavy lifting while you focus on strategy.', color: '#f59e0b' },
  { Icon: FaCheckCircle, title: 'Proven Track Record',     desc: 'Over 2.4 million websites audited. Customers report an average 67% increase in organic traffic within 90 days.', color: '#ef4444' },
];

export default function WhyUs() {
  return (
    <section className="whyus" id="why-us">
      <div className="whyus__container">
        <motion.div className="whyus__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaBullseye size={11} /><span>Why Rank Optima</span>
          </div>
          <h2 className="whyus__title">
            Built Different, <span className="gradient-text">Built Better</span>
          </h2>
          <p className="whyus__desc">
            Every feature is designed with one goal: to get your website ranking higher, faster.
          </p>
        </motion.div>

        <div className="whyus__grid">
          {reasons.map(({ Icon, title, desc, color }, i) => (
            <motion.div key={title} className="whyus__card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}>
              <div className="whyus__icon" style={{ color, background: color + '15', border: `1px solid ${color}30` }}>
                <Icon size={18} />
              </div>
              <div className="whyus__text">
                <h3 className="whyus__card-title">{title}</h3>
                <p className="whyus__card-desc">{desc}</p>
              </div>
              <div className="whyus__check" style={{ color }}>
                <FaCheckCircle size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
