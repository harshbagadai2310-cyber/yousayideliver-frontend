import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="about-page section">
      <div className="container">
        {/* Intro */}
        <motion.div 
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about-subtitle-tag">Our Narrative</span>
          <h1 className="about-main-title">WE ARE DESIGNERS, SYSTEMS ENGINEERS, & GROWTH ARCHITECTS.</h1>
          <div className="title-bar"></div>
          <p className="about-lead-text">
            “You Say I Deliver” is not just a brand name. It is a strict operational commitment. We build digital ecosystems for businesses that have moved past generic setups and require institutional-grade digital frameworks.
          </p>
        </motion.div>

        {/* Story pillars */}
        <motion.div 
          className="pillars-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Pillar 1 */}
          <motion.div className="pillar-card glass-panel" variants={blockVariants}>
            <div className="pillar-icon-box">
              <Zap size={24} />
            </div>
            <h3 className="pillar-title">Hyper-Local Velocity</h3>
            <p className="pillar-desc">
              We operate with elite pacing. In digital commerce, speed is a major competitive advantage. We deploy systems, branding, and assets at hyper-velocity without compromising architectural detail. We move fast so that your campaigns go to market while your competitors are still drafting approvals.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div className="pillar-card glass-panel" variants={blockVariants}>
            <div className="pillar-icon-box">
              <ShieldCheck size={24} />
            </div>
            <h3 className="pillar-title">Full-Stack Strategic Ownership</h3>
            <p className="pillar-desc">
              We reject fragmented workflows. When we build your digital ecosystem, we take full end-to-end strategic ownership. From the initial brand identity roadmap to custom React engineering and final cloud deployment, we oversee every layer. No loose ends. No outsourced excuses.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div className="pillar-card glass-panel" variants={blockVariants}>
            <div className="pillar-icon-box">
              <TrendingUp size={24} />
            </div>
            <h3 className="pillar-title">Long-Term Digital ROI</h3>
            <p className="pillar-desc">
              We build systems, not brochures. Every logo, ad creative template, and database route we engineer has a clear strategic purpose: maximizing your long-term digital ROI. We design experiences that captivate clients and backend infrastructure that saves hundreds of manual operational hours.
            </p>
          </motion.div>
        </motion.div>

        {/* Closing Narrative */}
        <motion.div 
          className="about-closing glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="closing-content">
            <Sparkles className="closing-icon" size={32} />
            <h2 className="closing-title">You Say. We Deliver. No Exceptions.</h2>
            <p className="closing-text">
              We serve a limited number of high-growth clients each quarter. This operational filter guarantees our executive team is directly involved in your strategic assets.
            </p>
            <a href="/book" className="btn btn-primary">Partner with Us</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-page {
          padding-top: 8rem;
          background: linear-gradient(180deg, var(--color-bg-base) 0%, #FAF6EE 100%);
        }
        .about-intro {
          max-width: 800px;
          margin: 0 auto 5rem;
          text-align: center;
        }
        .about-subtitle-tag {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-primary);
          display: block;
          margin-bottom: 1rem;
        }
        .about-main-title {
          font-family: var(--font-serif);
          font-size: 2.85rem;
          line-height: 1.2;
          color: var(--color-text-main);
          margin-bottom: 1.5rem;
        }
        .title-bar {
          width: 80px;
          height: 3px;
          background-color: var(--color-primary);
          margin: 1.5rem auto;
          border-radius: 2px;
        }
        .about-lead-text {
          font-size: 1.2rem;
          line-height: 1.7;
          color: var(--color-text-muted);
        }
        
        /* Pillars grid */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-bottom: 5rem;
        }
        .pillar-card {
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.45);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-radius: var(--border-radius-lg);
        }
        .pillar-icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(139, 0, 0, 0.08);
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
        }
        .pillar-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-text-main);
        }
        .pillar-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-muted);
        }
        
        /* Closing panel */
        .about-closing {
          background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(253, 251, 247, 0.5) 100%);
          border-color: rgba(139, 0, 0, 0.2);
          border-radius: var(--border-radius-lg);
          padding: 4rem;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .closing-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .closing-icon {
          color: var(--color-primary);
        }
        .closing-title {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          color: var(--color-text-main);
        }
        .closing-text {
          font-size: 1.1rem;
          color: var(--color-text-muted);
          max-width: 600px;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 992px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-main-title {
            font-size: 2.25rem;
          }
          .about-closing {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
