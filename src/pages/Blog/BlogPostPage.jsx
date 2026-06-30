import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTag, FaArrowLeft, FaClock } from 'react-icons/fa';
import blogPosts from './blogData';
import './BlogPostPage.css';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="page blog-post-page">
        <div className="page__container">
          <div className="blog-post__not-found">
            <h2>Post not found</h2>
            <Link to="/blog" className="blog-post__back">
              <FaArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page blog-post-page">
      <div className="page__container">

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Link to="/blog" className="blog-post__back">
            <FaArrowLeft size={14} /> Back to Blog
          </Link>
        </motion.div>

        <motion.article className="blog-post"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>

          <div className="blog-post__header">
            <div className="blog-post__meta">
              <span className="blog-post__category">
                <FaTag size={11} /> {post.category}
              </span>
              <span className="blog-post__date">
                <FaCalendarAlt size={11} /> {post.date}
              </span>
              <span className="blog-post__read-time">
                <FaClock size={11} /> {post.readTime}
              </span>
            </div>
            <h1 className="blog-post__title">{post.title}</h1>
          </div>

          <div className="blog-post__img-wrap">
            <img src={post.img} alt={post.title} className="blog-post__img" />
          </div>

          <div className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="blog-post__footer">
            <Link to="/blog" className="blog-post__back-btn">
              <FaArrowLeft size={14} /> Back to All Posts
            </Link>
          </div>
        </motion.article>

      </div>
    </div>
  );
}
