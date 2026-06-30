import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';
import './FAQ.css';

const faqs = [
  {
    q: 'How does Rank Optima work?',
    a: 'Rank Optima uses advanced AI and machine learning to crawl your website and analyze over 150 SEO factors — including technical health, on-page optimization, keyword opportunities, and backlink profiles. It then generates a prioritized action plan with specific recommendations.',
  },
  {
    q: 'Is the AI analysis accurate?',
    a: 'Yes. Our AI has been trained on millions of ranked pages across hundreds of industries. We maintain a 98.7% accuracy rate for issue detection and our recommendations are validated against real ranking data. Most users see measurable results within 30–60 days.',
  },
  {
    q: 'Can agencies use Rank Optima for multiple clients?',
    a: 'Absolutely. Our Agency plan is built specifically for SEO agencies. You get unlimited website audits, white-label reporting with your own branding, a client management dashboard, and a dedicated account manager.',
  },
  {
    q: 'Do the reports look professional enough for clients?',
    a: 'Yes — our reports are designed to impress. They include executive summaries, visual score breakdowns, prioritized issue lists, and AI-generated recommendations. You can fully white-label them with your agency logo and colors.',
  },
  {
    q: 'How long does a full SEO audit take?',
    a: 'Most websites are fully analyzed in under 30 seconds. Larger enterprise sites with thousands of pages typically complete in 2–5 minutes. You get real-time progress updates during the scan.',
  },
  {
    q: 'Do I need technical SEO knowledge to use it?',
    a: 'Not at all. Rank Optima is designed for everyone from beginners to expert SEOs. Every issue comes with a plain-English explanation and step-by-step fix instructions. You can also share tasks directly with your developer.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <motion.div className="faq__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaQuestionCircle size={11} /><span>FAQ</span>
          </div>
          <h2 className="faq__title">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="faq__desc">
            Everything you need to know about Rank Optima. Can't find what you're looking for?{' '}
            <a href="#" className="faq__contact">Chat with our team.</a>
          </p>
        </motion.div>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <motion.div key={i} className={`faq__item${open === i ? ' open' : ''}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
              <button className="faq__question" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <div className="faq__icon">
                  {open === i ? <FaMinus size={13} /> : <FaPlus size={13} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div className="faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
