import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import blogPosts from './blogData';
import './BlogPage.css';

export default function BlogPage() {
  return (
    <div className="page blog-page">
      <div className="page__container">

        {/* Hero */}
        <motion.div className="blog-hero"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaTag size={11} /><span>Blog</span>
          </div>
          <h1 className="blog-hero__title">
            SEO Insights &{' '}
            <span className="gradient-text">Expert Tips</span>
          </h1>
          <p className="blog-hero__desc">
            Stay ahead with the latest SEO strategies, industry trends,
            and actionable tips from our experts.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}>
              <Link to={`/blog/${post.slug}`} className="blog-card glass-card">
                <div className="blog-card__img-wrap">
                  <img src={post.img} alt={post.title} className="blog-card__img" loading="lazy" />
                  <span className="blog-card__tag">{post.tag}</span>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category}</span>
                    <span className="blog-card__dot">·</span>
                    <span className="blog-card__date">
                      <FaCalendarAlt size={10} /> {post.date}
                    </span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__footer">
                    <span className="blog-card__read-more">
                      Read More <FaArrowRight size={12} />
                    </span>
                    <span className="blog-card__read-time">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
