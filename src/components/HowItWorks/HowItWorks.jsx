import { motion } from 'framer-motion';
import { FaGlobe, FaRocket, FaArrowRight } from 'react-icons/fa';
import { MdManageSearch } from 'react-icons/md';
import './HowItWorks.css';

const steps = [
  {
    num: '01', Icon: FaGlobe,        color: '#4f8eff',
    title: 'Enter Your Website',
    desc:  'Simply type in your domain URL. No setup required, no technical knowledge needed.',
  },
  {
    num: '02', Icon: MdManageSearch,  color: '#a78bfa',
    title: 'AI Scans Your Website',
    desc:  'Our AI crawls every page, analyzing 150+ SEO factors including technical health, keywords, and backlinks.',
  },
  {
    num: '03', Icon: FaRocket,        color: '#22d3ee',
    title: 'Receive Your SEO Strategy',
    desc:  'Get a prioritized action plan with AI recommendations to boost rankings and drive more organic traffic.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw__container">
        <motion.div className="hiw__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaRocket size={11} /><span>How It Works</span>
          </div>
          <h2 className="hiw__title">
            SEO Results in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="hiw__desc">
            From URL to actionable strategy in under 60 seconds. No expertise required.
          </p>
        </motion.div>

        <div className="hiw__steps">
          {steps.map(({ num, Icon, color, title, desc }, i) => (
            <motion.div key={num} className="hiw__step"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hiw__connector">
                  <motion.div className="hiw__connector-line"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }} />
                  <FaArrowRight size={14} className="hiw__connector-arrow" style={{ color }} />
                </div>
              )}

              <div className="hiw__step-card">
                <div className="hiw__step-num" style={{ color, borderColor: color + '40' }}>{num}</div>
                <motion.div className="hiw__icon-ring"
                  style={{ background: color + '18', borderColor: color + '35' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}>
                  <Icon size={28} style={{ color }} />
                </motion.div>
                <h3 className="hiw__step-title">{title}</h3>
                <p className="hiw__step-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
