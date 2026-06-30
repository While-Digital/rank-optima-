import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Sarah Chen',    role: 'Head of SEO',          company: 'GrowthLab Agency',
    avatar: 'SC', color: '#4f8eff', rating: 5,
    review: "Rank Optima transformed how we deliver SEO results. The AI audit identifies issues we'd spend hours finding manually. Our clients' rankings improved by an average of 40% in just 3 months.",
  },
  {
    name: 'Marcus Williams', role: 'Founder & CEO',       company: 'TechBrand Studio',
    avatar: 'MW', color: '#a78bfa', rating: 5,
    review: "I was skeptical at first, but the depth of analysis blew me away. It found 23 critical technical issues on our site that were silently killing our rankings. After fixing them, our traffic doubled.",
  },
  {
    name: 'Priya Sharma',  role: 'Digital Marketing Lead', company: 'Nexus Commerce',
    avatar: 'PS', color: '#22d3ee', rating: 5,
    review: "The competitor tracking feature alone is worth the subscription. We can now see exactly what's working for our competitors and build a strategy to outrank them. Absolutely game-changing.",
  },
  {
    name: "James O'Brien", role: 'SEO Consultant',        company: 'Freelance',
    avatar: 'JO', color: '#10b981', rating: 5,
    review: "I run SEO audits for 30+ clients. Rank Optima cut my audit time from 4 hours to 20 minutes. The white-label reports look incredibly professional and clients love them.",
  },
  {
    name: 'Lena Müller',   role: 'VP Growth',             company: 'ScaleUp Berlin',
    avatar: 'LM', color: '#f59e0b', rating: 5,
    review: "The AI recommendations are spot-on. It doesn't just tell you what's wrong — it tells you exactly what to fix, in priority order, with predicted impact. It's like having an SEO expert on call 24/7.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__container">
        <motion.div className="testimonials__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaStar size={11} /><span>Testimonials</span>
          </div>
          <h2 className="testimonials__title">
            Trusted by <span className="gradient-text">10,000+ Teams</span>
          </h2>
          <p className="testimonials__desc">
            From indie founders to enterprise agencies — everyone loves Rank Optima.
          </p>
        </motion.div>

        <div className="testimonials__carousel">
          <button className="carousel-btn" onClick={() => go(-1)} aria-label="Previous">
            <FaChevronLeft size={16} />
          </button>

          <div className="carousel-track">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={current} className="testimonial-card"
                custom={direction}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}>
                <div className="testimonial-card__quote">
                  <FaQuoteLeft size={28} />
                </div>
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} size={15} color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-card__review">"{t.review}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar"
                    style={{ background: t.color + '20', border: `2px solid ${t.color}50`, color: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__meta">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn" onClick={() => go(1)} aria-label="Next">
            <FaChevronRight size={16} />
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button key={i}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
