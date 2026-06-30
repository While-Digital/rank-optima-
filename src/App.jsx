import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Layout
import Navbar       from './components/Navbar/Navbar';
import Footer       from './components/Footer/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Home sections
import Scanner      from './components/Scanner/Scanner';
import Hero         from './components/Hero/Hero';
import Features     from './components/Features/Features';
import HowItWorks   from './components/HowItWorks/HowItWorks';
import Comparison   from './components/Comparison/Comparison';
import WhyUs        from './components/WhyUs/WhyUs';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing      from './components/Pricing/Pricing';
import FAQ          from './components/FAQ/FAQ';
import CTA          from './components/CTA/CTA';

// Pages
import FeaturesPage  from './pages/Features/FeaturesPage';
import SolutionsPage from './pages/Solutions/SolutionsPage';
import SEOAuditPage  from './pages/SEOAudit/SEOAuditPage';
import PricingPage   from './pages/Pricing/PricingPage';
import BlogPage      from './pages/Blog/BlogPage';
import BlogPostPage  from './pages/Blog/BlogPostPage';
import LoginPage     from './pages/Login/LoginPage';

function HomePage() {
  return (
    <>
      <Scanner />
      <Hero />
      <Features />
      <HowItWorks />
      <Comparison />
      <WhyUs />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/features"      element={<FeaturesPage />} />
          <Route path="/solutions"     element={<SolutionsPage />} />
          <Route path="/seo-audit"     element={<SEOAuditPage />} />
          <Route path="/pricing"       element={<PricingPage />} />
          <Route path="/blog"          element={<BlogPage />} />
          <Route path="/blog/:slug"    element={<BlogPostPage />} />
          <Route path="/login"         element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
