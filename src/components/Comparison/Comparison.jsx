import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Comparison.css';

function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = target / (duration / 16);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(Math.round(cur));
      if (cur >= target) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [target, duration, start]);
  return count;
}

export default function Comparison() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const beforeScore = useCounter(42, 1200, inView);
  const afterScore  = useCounter(95, 1500, inView);

  const before = [
    'SEO Score 42%', '47 Critical Errors',
    'Poor Page Speed', 'Low Visibility', 'No Ranking Strategy',
  ];
  const after = [
    'SEO Score 95%', 'All Issues Resolved',
    'Blazing Fast Pages', 'Top 3 Rankings', 'AI-Powered Strategy',
  ];

  return (
    <section className="comparison" id="comparison" ref={ref}>
      <div className="comparison__container">
        <motion.div className="comparison__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaArrowUp size={11} /><span>Results</span>
          </div>
          <h2 className="comparison__title">
            The Rank Optima <span className="gradient-text">Difference</span>
          </h2>
          <p className="comparison__desc">
            See the transformation that thousands of websites experienced after
            using Rank Optima's AI-powered SEO platform.
          </p>
        </motion.div>

        <div className="comparison__panels">
          {/* Before */}
          <motion.div className="comp-panel comp-panel--before"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="comp-panel__label comp-panel__label--before">
              <FaArrowDown size={13} /> Before Rank Optima
            </div>
            <div className="comp-panel__score">
              <span className="comp-score comp-score--bad">{beforeScore}%</span>
              <span className="comp-score-tag">SEO Score</span>
            </div>
            <ul className="comp-list">
              {before.map((item, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <FaTimes size={14} className="comp-icon comp-icon--bad" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* VS */}
          <motion.div className="comp-vs"
            initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}>
            <span>VS</span>
          </motion.div>

          {/* After */}
          <motion.div className="comp-panel comp-panel--after"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="comp-panel__label comp-panel__label--after">
              <FaArrowUp size={13} /> After Rank Optima
            </div>
            <div className="comp-panel__score">
              <span className="comp-score comp-score--good">{afterScore}%</span>
              <span className="comp-score-tag">SEO Score</span>
            </div>
            <ul className="comp-list">
              {after.map((item, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <FaCheckCircle size={14} className="comp-icon comp-icon--good" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
