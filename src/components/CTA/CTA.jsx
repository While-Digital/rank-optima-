import { motion } from 'framer-motion';
import { FaBolt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './CTA.css';

export default function CTA() {
  const scrollToScanner = (e) => {
    e.preventDefault();
    document.querySelector('#scanner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta" id="cta">
      {/* Animated gradient blobs */}
      <div className="cta__blobs" aria-hidden="true">
        <div className="cta-blob cta-blob--1" />
        <div className="cta-blob cta-blob--2" />
        <div className="cta-blob cta-blob--3" />
      </div>

      <div className="cta__container">
        <motion.div className="cta__card"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>

          <motion.div className="cta__badge"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <FaBolt size={11} /> AI-Powered
          </motion.div>

          <motion.h2 className="cta__title"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Ready To Improve Your
            <br />
            <span className="cta__title-highlight">SEO Performance?</span>
          </motion.h2>

          <motion.p className="cta__desc"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}>
            Join 10,000+ businesses already growing with Rank Optima.
            Start your free audit — no credit card required.
          </motion.p>

          <motion.div className="cta__actions"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <motion.a href="#scanner" className="cta__btn-primary"
              onClick={scrollToScanner}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <FaBolt size={15} />
              Start Free Audit
              <FaArrowRight size={14} />
            </motion.a>
          </motion.div>

          <motion.div className="cta__trust"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}>
            {['No credit card', '14-day free trial', 'Cancel anytime', 'Setup in 60 seconds'].map((t) => (
              <div key={t} className="cta__trust-item">
                <FaCheckCircle size={12} /> <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
