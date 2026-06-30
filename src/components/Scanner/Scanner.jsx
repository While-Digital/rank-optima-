import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaBolt, FaCheckCircle, FaSpinner,
  FaGlobe, FaShieldAlt, FaChartBar, FaBrain,
  FaExclamationTriangle, FaInfoCircle, FaTimes,
  FaImage, FaLink, FaFileAlt, FaCode, FaServer,
  FaMobileAlt, FaDesktop, FaArrowRight, FaDownload,
  FaEye, FaTag, FaListUl, FaCheckSquare,
  FaExternalLinkAlt, FaChevronDown, FaChevronUp,
  FaRobot, FaSitemap, FaUnlink, FaCogs,
  FaLock, FaMobile, FaFileCode, FaDatabase
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Scanner.css';

const scanSteps = [
  { icon: FaGlobe,       label: 'Fetching website content...' },
  { icon: FaFileCode,    label: 'Parsing sitemap & robots.txt...' },
  { icon: FaCogs,        label: 'Crawling pages & analyzing SEO...' },
  { icon: FaChartBar,    label: 'Checking performance metrics...' },
  { icon: FaUnlink,   label: 'Detecting broken links...' },
  { icon: FaBrain,       label: 'Running technical SEO checks...' },
  { icon: FaCheckCircle, label: 'Generating full report...' },
];

const API_BASE = '';

function getScoreColor(score) {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Needs Work';
  if (score >= 40) return 'Poor';
  return 'Critical';
}

function getRatingColor(r) {
  if (r === 'good') return '#22c55e';
  if (r === 'needs-improvement') return '#f59e0b';
  return '#ef4444';
}

function formatSavings(val) {
  if (val === null || val === undefined) return '';
  if (val >= 1000) return `${(val / 1000).toFixed(1)} s`;
  return `${Math.round(val)} ms`;
}

function formatBytes(val) {
  if (val === null || val === undefined) return '';
  if (val >= 1048576) return `${(val / 1048576).toFixed(1)} MB`;
  if (val >= 1024) return `${(val / 1024).toFixed(1)} KB`;
  return `${Math.round(val)} B`;
}

function safeHostname(url) {
  try { return new URL(url).hostname; } catch { return url; }
}

function safePath(url) {
  try { return new URL(url).pathname; } catch { return url; }
}

function generatePDF(report) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const w = doc.internal.pageSize.getWidth();
  let y = 15;
  const addLine = () => { doc.setDrawColor(200); doc.line(15, y, w - 15, y); y += 5; };

  doc.setFontSize(20);
  doc.setTextColor(30, 40, 80);
  doc.text('SEO Audit Report', w / 2, y, { align: 'center' }); y += 8;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`URL: ${report.url}`, w / 2, y, { align: 'center' }); y += 5;
  doc.text(`Date: ${new Date(report.timestamp).toLocaleDateString()} | Pages Crawled: ${report.pagesCrawled || 1}`, w / 2, y, { align: 'center' }); y += 8;
  addLine();

  doc.setFontSize(14);
  doc.setTextColor(30);
  doc.text(`Overall SEO Score: ${report.score}/100 (${getScoreLabel(report.score)})`, 15, y); y += 10;

  // Performance Overview
  doc.setFontSize(12); doc.text('Performance Overview', 15, y); y += 7;
  autoTable(doc,{ startY: y, head: [['Metric', 'Score', 'Detail']], body: [
    ['SEO Score', `${report.score}/100`, getScoreLabel(report.score)],
    ['Site Speed', `${report.pageSpeed?.mobile?.performance || 'N/A'}%`, report.pageSpeed?.mobile?.lcp ? `LCP: ${report.pageSpeed.mobile.lcp}` : 'N/A'],
    ['Mobile Responsive', report.technicalSEO?.mobileViewport?.passed ? 'Good' : 'Poor', report.technicalSEO?.mobileViewport?.detail || 'N/A'],
  ], theme: 'grid', fontSize: 8 }); y = doc.lastAutoTable.finalY + 10;

  if (report.pageSpeed?.mobile && !report.pageSpeed.mobile.error) {
    doc.setFontSize(12); doc.text('Performance Scores', 15, y); y += 7;
    const ps = report.pageSpeed;
    autoTable(doc,{ startY: y, head: [['Metric', 'Mobile', 'Desktop']], body: [
      ['Performance', `${ps.mobile.performance}%`, `${ps.desktop?.performance || 'N/A'}%`],
      ['Accessibility', `${ps.mobile.accessibility}%`, `${ps.desktop?.accessibility || 'N/A'}%`],
      ['Best Practices', `${ps.mobile.bestPractices}%`, `${ps.desktop?.bestPractices || 'N/A'}%`],
      ['SEO Score', `${ps.mobile.seo}%`, `${ps.desktop?.seo || 'N/A'}%`],
      ['FCP', ps.mobile.fcp, ps.desktop?.fcp || 'N/A'],
      ['LCP', ps.mobile.lcp, ps.desktop?.lcp || 'N/A'],
      ['TBT', ps.mobile.tbt, ps.desktop?.tbt || 'N/A'],
      ['CLS', ps.mobile.cls, ps.desktop?.cls || 'N/A'],
      ['Speed Index', ps.mobile.si, ps.desktop?.si || 'N/A'],
      ['TTI', ps.mobile.tti, ps.desktop?.tti || 'N/A'],
    ], theme: 'grid', fontSize: 8 }); y = doc.lastAutoTable.finalY + 10;
  }

  if (report.pageSpeed?.mobile?.opportunities?.length > 0) {
    doc.setFontSize(12); doc.text('Performance Opportunities', 15, y); y += 7;
    autoTable(doc,{ startY: y, head: [['Opportunity', 'Savings']], body: report.pageSpeed.mobile.opportunities.map(o => [
      o.title,
      o.savings ? (o.savings >= 1000 ? `${(o.savings / 1000).toFixed(1)} s` : `${Math.round(o.savings)} ms`) : '-'
    ]), theme: 'grid', fontSize: 8 }); y = doc.lastAutoTable.finalY + 10;
  }

  if (report.pageSpeed?.mobile?.diagnostics?.length > 0) {
    doc.setFontSize(12); doc.text('Performance Diagnostics', 15, y); y += 7;
    autoTable(doc,{ startY: y, head: [['Diagnostic', 'Description']], body: report.pageSpeed.mobile.diagnostics.map(d => [
      d.title,
      (d.description || '').substring(0, 80)
    ]), theme: 'grid', fontSize: 8 }); y = doc.lastAutoTable.finalY + 10;
  }

  if (report.technicalSEO) {
    doc.setFontSize(12); doc.text('Technical SEO', 15, y); y += 7;
    const ts = report.technicalSEO;
    autoTable(doc,{ startY: y, head: [['Check', 'Status', 'Detail']], body: Object.entries(ts).map(([k, v]) => [
      k.replace(/([A-Z])/g, ' $1').trim(),
      v.passed ? 'PASS' : 'FAIL',
      v.detail || ''
    ]), theme: 'grid', fontSize: 8 }); y = doc.lastAutoTable.finalY + 10;
  }

  if (report.robots?.found) {
    doc.setFontSize(12); doc.text('Robots.txt', 15, y); y += 7;
    doc.setFontSize(8); doc.text(report.robots.content.substring(0, 500), 15, y); y += 10;
  }

  if (report.sitemap?.found) {
    doc.setFontSize(12); doc.text(`Sitemap: ${report.sitemap.urlCount} URLs found`, 15, y); y += 10;
  }

  if (report.brokenLinks?.broken?.length > 0) {
    doc.setFontSize(12); doc.setTextColor(220, 50, 50);
    doc.text(`Broken Links (${report.brokenLinks.broken.length})`, 15, y); y += 7;
    doc.setTextColor(30);
    autoTable(doc,{ startY: y, head: [['URL', 'Status']], body: report.brokenLinks.broken.map(l => [l.url.substring(0, 80), String(l.status)]), theme: 'grid', fontSize: 8, headStyles: { fillColor: [220, 50, 50] } });
    y = doc.lastAutoTable.finalY + 10;
  }

  if (report.aggregated?.issues?.length > 0) {
    if (y > 240) { doc.addPage(); y = 15; }
    doc.setFontSize(12); doc.setTextColor(220, 50, 50);
    doc.text(`Issues (${report.aggregated.issues.length})`, 15, y); y += 7;
    doc.setTextColor(30);
    autoTable(doc,{ startY: y, head: [['Issue', 'URL']], body: report.aggregated.issues.map(i => [i.message, (i.url || '').substring(0, 50)]), theme: 'grid', fontSize: 8, headStyles: { fillColor: [220, 50, 50] } });
    y = doc.lastAutoTable.finalY + 10;
  }

  if (report.aggregated?.warnings?.length > 0) {
    if (y > 240) { doc.addPage(); y = 15; }
    doc.setFontSize(12); doc.setTextColor(200, 150, 0);
    doc.text(`Warnings (${report.aggregated.warnings.length})`, 15, y); y += 7;
    doc.setTextColor(30);
    autoTable(doc,{ startY: y, head: [['Warning', 'URL']], body: report.aggregated.warnings.map(w => [w.message, (w.url || '').substring(0, 50)]), theme: 'grid', fontSize: 8, headStyles: { fillColor: [200, 150, 0] } });
    y = doc.lastAutoTable.finalY + 10;
  }

  if (report.aggregated?.passed?.length > 0) {
    if (y > 240) { doc.addPage(); y = 15; }
    doc.setFontSize(12); doc.setTextColor(30, 160, 80);
    doc.text(`Passed Checks (${report.aggregated.passed.length})`, 15, y); y += 7;
    doc.setTextColor(30);
    autoTable(doc,{ startY: y, head: [['Passed']], body: report.aggregated.passed.map(p => [p]), theme: 'grid', fontSize: 8, headStyles: { fillColor: [30, 160, 80] } });
  }

  doc.save(`seo-audit-${report.hostname || 'report'}.pdf`);
}

function ScoreRing({ score, size = 120, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = getScoreColor(score);
  return (
    <div className="audit-score-ring" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--ring-track, rgba(255,255,255,0.06))" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="audit-score-inner">
        <span className="audit-score-num" style={{ color }}>{score}</span>
        <span className="audit-score-label">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, count, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="audit-section">
      <button className="audit-section__header" onClick={() => setOpen(!open)}>
        <div className="audit-section__header-left">
          <Icon size={15} style={{ color }} />
          <span>{title}</span>
          {count !== undefined && (
            <span className="audit-section__count" style={{ background: color + '20', color }}>{count}</span>
          )}
        </div>
        {open ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="audit-section__body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = useCallback(async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true); setReport(null); setError(null); setStep(0);

    const stepInterval = setInterval(() => {
      setStep(prev => prev < scanSteps.length - 1 ? prev + 1 : prev);
    }, 3500);

    try {
      const res = await fetch(`${API_BASE}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Audit failed');
      setStep(scanSteps.length);
      setTimeout(() => setReport(data), 400);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(stepInterval);
      setScanning(false);
    }
  }, [url]);

  const handleReset = () => { setReport(null); setUrl(''); setStep(0); setError(null); };
  const hp = report?.homepage;
  const agg = report?.aggregated;
  const ps = report?.pageSpeed;
  const ts = report?.technicalSEO;

  return (
    <section className="scanner" id="scanner">
      <div className="scanner__container">
        <motion.div className="scanner__header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="section-badge">
            <FaSearch size={11} /><span>Free SEO Audit</span>
          </div>
          <h1 className="scanner__title">
            Your Free <span className="gradient-text">AI SEO Audit</span>
          </h1>
          <p className="scanner__desc">
            Enter your URL and get a full SEO audit with AI-powered recommendations in seconds.
          </p>
        </motion.div>

        <motion.div className="scanner__card"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <AnimatePresence mode="wait">
            {!scanning && !report && (
              <motion.form key="form" className="scanner__form" onSubmit={handleScan}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="scanner__input-wrap">
                  <input type="url" className="scanner__input"
                    placeholder="https://yourwebsite.com"
                    value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <motion.button type="submit" className="scanner__btn"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <FaBolt size={15} /> Run Free Audit
                </motion.button>
              </motion.form>
            )}

            {scanning && (
              <motion.div key="scanning" className="scanner__progress"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="scan-url-display"><FaGlobe size={13} /><span>{url}</span></div>
                <div className="scan-circle-wrap">
                  <svg viewBox="0 0 120 120" className="scan-svg">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--scan-track, rgba(255,255,255,0.05))" strokeWidth="4" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#scanG)"
                      strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - step / scanSteps.length)}`}
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dashoffset 0.7s ease' }} />
                    <defs><linearGradient id="scanG" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4f8eff" /><stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient></defs>
                  </svg>
                  <div className="scan-pct">{Math.round((step / scanSteps.length) * 100)}%</div>
                </div>
                <div className="scan-steps">
                  {scanSteps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={i}
                        className={`scan-step${i < step ? ' done' : ''}${i === step && scanning ? ' active' : ''}`}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: i <= step ? 1 : 0.3, x: 0 }}
                        transition={{ delay: i * 0.08 }}>
                        {i < step ? <FaCheckCircle size={13} /> : i === step && scanning ? <FaSpinner size={13} className="spin" /> : <Icon size={13} />}
                        <span>{s.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {error && !scanning && (
              <motion.div key="error" className="scanner__error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FaTimes size={20} style={{ color: '#ef4444' }} />
                <p>{error}</p>
                <button className="scanner__btn-ghost" onClick={handleReset}>Try Again</button>
              </motion.div>
            )}

            {report && !scanning && (
              <motion.div key="report" className="audit-report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                {/* ── Section 1: Score + Performance + Preview ── */}
                <div className="audit-report__top">
                  <div className="audit-report__left">
                    <ScoreRing score={report.score} />
                    <div className="audit-report__meta">
                      <h3 className="audit-report__url"><FaGlobe size={14} /> {report.hostname}</h3>
                      <p className="audit-report__title-text">Crawled {report.pagesCrawled} page(s)</p>
                    </div>

                    <div className="audit-report__quick-stats">
                      <div className="audit-qs">
                        <span className="audit-qs__val" style={{ color: '#ef4444' }}>{agg?.totalIssues || 0}</span>
                        <span className="audit-qs__label">Issues</span>
                      </div>
                      <div className="audit-qs">
                        <span className="audit-qs__val" style={{ color: '#f59e0b' }}>{agg?.totalWarnings || 0}</span>
                        <span className="audit-qs__label">Warnings</span>
                      </div>
                      <div className="audit-qs">
                        <span className="audit-qs__val" style={{ color: '#22c55e' }}>{agg?.totalPassed || 0}</span>
                        <span className="audit-qs__label">Passed</span>
                      </div>
                    </div>

                    <button className="audit-download-btn" onClick={() => generatePDF(report)}>
                      <FaDownload size={13} /> Download PDF Report
                    </button>
                  </div>

                  <div className="audit-report__right">
                    <div className="audit-preview">
                      <h4 className="audit-preview__title"><FaEye size={13} /> Website Preview</h4>
                      {report.screenshot ? (
                        <div className="audit-preview__img-wrap">
                          <img src={report.screenshot} alt="Website preview" className="audit-preview__img" />
                        </div>
                      ) : (
                        <div className="audit-preview__placeholder"><FaImage size={32} /><p>Preview not available</p></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Meta Info Row ── */}
                {hp && (
                  <div className="audit-meta-row-section">
                    <div className="audit-meta-grid">
                      {[
                        { icon: FaTag, label: 'Title', val: hp.title?.substring(0, 80) },
                        { icon: FaFileAlt, label: 'Description', val: hp.metaDescription?.substring(0, 100) },
                        { icon: FaCode, label: 'Canonical', val: hp.canonical?.substring(0, 60) },
                        { icon: FaGlobe, label: 'Language', val: hp.language },
                        { icon: FaFileAlt, label: 'Words', val: String(hp.wordCount) },
                        { icon: FaLink, label: 'Links', val: `${hp.links?.internal?.length || 0} internal / ${hp.links?.external?.length || 0} external` },
                        { icon: FaImage, label: 'Images', val: `${hp.images?.withAlt || 0}/${hp.images?.total || 0} with alt` },
                        { icon: FaRobot, label: 'Sitemap', val: report.sitemap?.found ? `${report.sitemap.urlCount} URLs` : 'Not found' },
                        { icon: FaRobot, label: 'Robots.txt', val: report.robots?.found ? 'Found' : 'Not found' },
                      ].map(({ icon: Ic, label, val }) => (
                        <div key={label} className="audit-meta-cell">
                          <div className="audit-meta-cell__icon"><Ic size={14} /></div>
                          <div className="audit-meta-cell__content">
                            <span className="audit-meta-cell__label">{label}</span>
                            <span className="audit-meta-cell__val">{val || 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Performance Overview ── */}
                <div className="audit-perf-bars">
                  <h4 className="audit-perf-bars__title"><FaChartBar size={14} /> Performance Overview</h4>
                  <div className="audit-perf-bars__grid">
                    {/* SEO Score */}
                    <div className="audit-perf-bar-card">
                      <div className="audit-perf-bar-card__header">
                        <FaSearch size={13} style={{ color: getScoreColor(report.score) }} />
                        <span className="audit-perf-bar-card__label">SEO Score</span>
                        <span className="audit-perf-bar-card__val" style={{ color: getScoreColor(report.score) }}>{report.score}/100</span>
                      </div>
                      <div className="audit-perf-bar-track">
                        <div className="audit-perf-bar-fill" style={{ width: `${report.score}%`, background: getScoreColor(report.score) }} />
                      </div>
                    </div>

                    {/* Site Speed */}
                    <div className="audit-perf-bar-card">
                      <div className="audit-perf-bar-card__header">
                        <FaBolt size={13} style={{ color: getScoreColor(ps?.mobile?.performance ?? 0) }} />
                        <span className="audit-perf-bar-card__label">Site Speed</span>
                        <span className="audit-perf-bar-card__val" style={{ color: getScoreColor(ps?.mobile?.performance ?? 0) }}>{ps?.mobile?.performance != null ? `${ps.mobile.performance}%` : 'N/A'}</span>
                      </div>
                      <div className="audit-perf-bar-track">
                        <div className="audit-perf-bar-fill" style={{ width: `${ps?.mobile?.performance ?? 0}%`, background: getScoreColor(ps?.mobile?.performance ?? 0) }} />
                      </div>
                      {ps?.mobile?.lcp && <span className="audit-perf-bar-card__sub">Load: {ps.mobile.lcp}</span>}
                    </div>

                    {/* Mobile Responsive */}
                    <div className="audit-perf-bar-card">
                      <div className="audit-perf-bar-card__header">
                        <FaMobileAlt size={13} style={{ color: getScoreColor(ts?.mobileViewport?.passed ? 90 : 30) }} />
                        <span className="audit-perf-bar-card__label">Mobile Responsive</span>
                        <span className="audit-perf-bar-card__val" style={{ color: getScoreColor(ts?.mobileViewport?.passed ? 90 : 30) }}>{ts?.mobileViewport?.passed ? 'Good' : 'Poor'}</span>
                      </div>
                      <div className="audit-perf-bar-track">
                        <div className="audit-perf-bar-fill" style={{ width: ts?.mobileViewport?.passed ? '90%' : '30%', background: getScoreColor(ts?.mobileViewport?.passed ? 90 : 30) }} />
                      </div>
                      <span className="audit-perf-bar-card__sub">{ts?.mobileViewport?.detail || 'No viewport meta tag'}</span>
                    </div>
                  </div>
                </div>

                {/* ── PageSpeed Insights ── */}
                {ps?.mobile && !ps.mobile.error && (
                  <div className="audit-report__perf">
                    <h4 className="audit-report__perf-title"><FaServer size={13} /> Website Insights</h4>
                    <div className="audit-perf-grid">
                      {[
                        { label: 'Performance', val: ps.mobile.performance, icon: FaChartBar },
                        { label: 'Accessibility', val: ps.mobile.accessibility, icon: FaEye },
                        { label: 'Best Practices', val: ps.mobile.bestPractices, icon: FaShieldAlt },
                        { label: 'SEO Score', val: ps.mobile.seo, icon: FaSearch },
                      ].map(({ label, val, icon: Ic }) => (
                        <div key={label} className="audit-perf-item">
                          <Ic size={12} style={{ color: getScoreColor(val) }} />
                          <span className="audit-perf-item__label">{label}</span>
                          <span className="audit-perf-item__val" style={{ color: getScoreColor(val) }}>{val}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="audit-vitals">
                      {[
                        { label: 'FCP', val: ps.mobile.fcp, rating: ps.mobile.fcpRating },
                        { label: 'LCP', val: ps.mobile.lcp, rating: ps.mobile.lcpRating },
                        { label: 'TBT', val: ps.mobile.tbt, rating: ps.mobile.tbtRating },
                        { label: 'CLS', val: ps.mobile.cls, rating: ps.mobile.clsRating },
                        { label: 'SI', val: ps.mobile.si, rating: ps.mobile.siRating },
                        { label: 'TTI', val: ps.mobile.tti, rating: ps.mobile.ttiRating },
                      ].map(({ label, val, rating }) => (
                        <div key={label} className="audit-vital">
                          <span className="audit-vital__label">{label}</span>
                          <span className="audit-vital__val">{val}</span>
                          <span className="audit-vital__rating" style={{ color: getRatingColor(rating) }}>{rating}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Section 2: Full Report ── */}
                <div className="audit-report__bottom">

                  {/* Technical SEO */}
                  {ts && (
                    <CollapsibleSection title="Technical SEO" icon={FaCogs} color="#60a5fa" defaultOpen={true}>
                      <div className="audit-items">
                        {Object.entries(ts).map(([key, val]) => (
                          <div key={key} className={`audit-item ${val.passed ? 'audit-item--pass' : 'audit-item--error'}`}>
                            {val.passed ? <FaCheckCircle size={12} /> : <FaTimes size={12} />}
                            <span><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {val.detail}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* PageSpeed Opportunities */}
                  {ps?.mobile && !ps.mobile.error && ps.mobile.opportunities?.length > 0 && (
                    <CollapsibleSection title="Performance Opportunities" icon={FaBolt} count={ps.mobile.opportunities.length} color="#f59e0b" defaultOpen={false}>
                      <div className="audit-items">
                        {ps.mobile.opportunities.map((opp, i) => (
                          <div key={i} className="audit-item audit-item--warning">
                            <FaBolt size={12} />
                            <div className="audit-item__content">
                              <span className="audit-item__title">{opp.title}</span>
                              <span className="audit-item__desc">{opp.description?.substring(0, 120)}{opp.description?.length > 120 ? '...' : ''}</span>
                              {opp.savings > 0 && (
                                <span className="audit-item__savings">
                                  Potential savings: {opp.savings >= 1000 ? formatSavings(opp.savings) : formatBytes(opp.savings)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* PageSpeed Diagnostics */}
                  {ps?.mobile && !ps.mobile.error && ps.mobile.diagnostics?.length > 0 && (
                    <CollapsibleSection title="Performance Diagnostics" icon={FaCogs} count={ps.mobile.diagnostics.length} color="#a78bfa" defaultOpen={false}>
                      <div className="audit-items">
                        {ps.mobile.diagnostics.map((diag, i) => (
                          <div key={i} className="audit-item audit-item--warning">
                            <FaCogs size={12} />
                            <div className="audit-item__content">
                              <span className="audit-item__title">{diag.title}</span>
                              <span className="audit-item__desc">{diag.description?.substring(0, 120)}{diag.description?.length > 120 ? '...' : ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Issues */}
                  <CollapsibleSection title="Issues Found" icon={FaExclamationTriangle} count={agg?.totalIssues || 0} color="#ef4444" defaultOpen={true}>
                    <div className="audit-items">
                      {agg?.issues?.length > 0 ? agg.issues.map((item, i) => (
                        <div key={i} className="audit-item audit-item--error">
                          <FaTimes size={12} />
                          <span>{item.message} {item.url && <small className="audit-item__url">({safePath(item.url)})</small>}</span>
                        </div>
                      )) : <div className="audit-item audit-item--success"><FaCheckCircle size={12} /> <span>No critical issues found</span></div>}
                    </div>
                  </CollapsibleSection>

                  {/* Warnings */}
                  <CollapsibleSection title="Warnings" icon={FaExclamationTriangle} count={agg?.totalWarnings || 0} color="#f59e0b">
                    <div className="audit-items">
                      {agg?.warnings?.length > 0 ? agg.warnings.map((item, i) => (
                        <div key={i} className="audit-item audit-item--warning">
                          <FaInfoCircle size={12} />
                          <span>{item.message} {item.url && <small className="audit-item__url">({safePath(item.url)})</small>}</span>
                        </div>
                      )) : <div className="audit-item audit-item--success"><FaCheckCircle size={12} /> <span>No warnings</span></div>}
                    </div>
                  </CollapsibleSection>

                  {/* Broken Links */}
                  {report.brokenLinks?.broken?.length > 0 && (
                    <CollapsibleSection title="Broken Links" icon={FaUnlink} count={report.brokenLinks.broken.length} color="#ef4444">
                      <div className="audit-items">
                        {report.brokenLinks.broken.map((link, i) => (
                          <div key={i} className="audit-item audit-item--error">
                            <FaUnlink size={12} />
                            <span><code>{link.url.substring(0, 70)}</code> — Status: {link.status || 'Connection failed'}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Robots.txt */}
                  {report.robots?.found && (
                    <CollapsibleSection title="Robots.txt" icon={FaRobot} color="#22d3ee">
                      <div className="audit-robots">
                        <pre className="audit-robots__content">{report.robots.content}</pre>
                        {report.robots.disallowPaths?.length > 0 && (
                          <div className="audit-items">
                            <div className="audit-item audit-item--warning"><FaInfoCircle size={12} /><span>Disallowed paths: {report.robots.disallowPaths.join(', ')}</span></div>
                          </div>
                        )}
                        {report.robots.sitemaps?.length > 0 && (
                          <div className="audit-items">
                            {report.robots.sitemaps.map((sm, i) => (
                              <div key={i} className="audit-item audit-item--pass"><FaCheckCircle size={12} /><span>Sitemap: {sm}</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Sitemap */}
                  <CollapsibleSection title={`Sitemap ${report.sitemap?.found ? `(${report.sitemap.urlCount} URLs)` : ''}`} icon={FaSitemap} color="#a78bfa">
                    <div className="audit-items">
                      {report.sitemap?.found ? (
                        <>
                          <div className="audit-item audit-item--pass"><FaCheckCircle size={12} /><span>Sitemap found with {report.sitemap.urlCount} URLs</span></div>
                          {report.sitemap.sampleUrls?.map((u, i) => (
                            <div key={i} className="audit-item audit-item--pass"><FaGlobe size={12} /><span className="audit-item__url">{u}</span></div>
                          ))}
                        </>
                      ) : (
                        <div className="audit-item audit-item--warning"><FaInfoCircle size={12} /><span>No sitemap.xml found — create one for better indexing</span></div>
                      )}
                    </div>
                  </CollapsibleSection>

                  {/* Passed */}
                  <CollapsibleSection title="Passed Checks" icon={FaCheckSquare} count={agg?.totalPassed || 0} color="#22c55e">
                    <div className="audit-items">
                      {agg?.passed?.map((item, i) => (
                        <div key={i} className="audit-item audit-item--pass"><FaCheckCircle size={12} /><span>{item}</span></div>
                      ))}
                    </div>
                  </CollapsibleSection>

                  {/* Pages Crawled */}
                  {report.pages?.length > 1 && (
                    <CollapsibleSection title="Crawled Pages" icon={FaGlobe} count={report.pages.length} color="#3b82f6">
                      <div className="audit-pages">
                        {report.pages.map((p, i) => (
                          <div key={i} className="audit-page-row">
                            <span className="audit-page-row__url">{p.url}</span>
                            <span className="audit-page-row__score" style={{ color: getScoreColor(p.score) }}>{p.score}/100</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  )}

                  <div className="audit-report__bottom-actions">
                    <button className="audit-download-btn audit-download-btn--large" onClick={() => generatePDF(report)}>
                      <FaDownload size={15} /> Download Full PDF Report
                    </button>
                    <button className="scanner__btn-ghost" onClick={handleReset}>Audit Another Site</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!report && (
          <motion.div className="scanner__stats"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            {[
              { num: '2.4M+', label: 'Websites Analyzed' },
              { num: '98.7%', label: 'Accuracy Rate' },
              { num: '< 30s', label: 'Avg Scan Time' },
              { num: '150+',  label: 'SEO Checks Run' },
            ].map((s) => (
              <div key={s.label} className="scanner__stat">
                <div className="scanner__stat-num">{s.num}</div>
                <div className="scanner__stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
