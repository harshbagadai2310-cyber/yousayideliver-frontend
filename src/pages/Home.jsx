import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Activity, Target, Shield, Compass, Sparkles, Layers, Eye, Code, Zap } from 'lucide-react';

const roadmapSteps = [
  {
    step: '01',
    title: 'Discover & Audit',
    icon: Compass,
    color: '#8B0000',
    description: 'We conduct a comprehensive audit of your current digital assets, performance metrics, and competitive landscape to find friction points and hidden growth opportunities.'
  },
  {
    step: '02',
    title: 'Brand Strategy',
    icon: Target,
    color: '#9C1A1C',
    description: 'Constructing your brand positioning, core messaging, value proposition, and messaging architectures to ensure alignment with target demographics.'
  },
  {
    step: '03',
    title: 'Identity System',
    icon: Sparkles,
    color: '#B02528',
    description: 'Designing signature visual devices, primary marks, custom wordmarks, and color palettes that capture the premium nature of your service.'
  },
  {
    step: '04',
    title: 'Visual Handbooks',
    icon: Layers,
    color: '#C53034',
    description: 'Compiling detailed usage handbooks that map exactly how your brand communicates visually across layouts, sizing, photography, and grids.'
  },
  {
    step: '05',
    title: 'Asset Collaterals',
    icon: Activity,
    color: '#D83B40',
    description: 'Producing high-impact physical and digital collateral, including custom packaging, stationary, digital pitch decks, and templates.'
  },
  {
    step: '06',
    title: 'Social Architecture',
    icon: Shield,
    color: '#E04E53',
    description: 'Designing matching grids, bio layouts, highlight reels, and premium custom banners for all major social media platforms.'
  },
  {
    step: '07',
    title: 'Content Framework',
    icon: Eye,
    color: '#E96166',
    description: 'Mapping out a high-retention content formula, including custom reel formats, hooks, copy frameworks, and asset libraries.'
  },
  {
    step: '08',
    title: 'UX Wireframing',
    icon: Code,
    color: '#F27579',
    description: 'Designing low and high-fidelity wireframes that visually align layout hierarchies with psychological triggers for maximum conversion.'
  },
  {
    step: '09',
    title: 'Full-Stack Launch',
    icon: Zap,
    color: '#8B0000',
    description: 'Handing off clean, SEO-optimized React-based systems deployed on cloud networks, complete with custom CMS controls.'
  }
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div className="brand-badge" variants={itemVariants}>
              <span className="badge-dot"></span> Full-Stack Digital Agency
            </motion.div>
            
            <motion.h1 className="hero-title" variants={itemVariants}>
              YOU SAY, <br /><span className="crimson-highlight">WE DELIVER.</span>
            </motion.h1>
            
            <motion.p className="hero-subtitle" variants={itemVariants}>
              We architect purpose-led brand strategies and construct high-conversion, strategic digital systems for businesses that demand premium results.
            </motion.p>
            
            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/book" className="btn btn-primary">Book Consultation <ChevronRight size={18} /></Link>
              <Link to="/inquiry" className="btn btn-secondary">Inquiry Form</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Roadmap Section */}
      <section className="section roadmap-section">
        <div className="container">
          <h2 className="section-title">THE GROWTH SYSTEM</h2>
          <p className="section-subtitle">
            Our comprehensive 9-stage engineering roadmap designed to take brands from audit to full-stack market dominance.
          </p>

          <div className="roadmap-grid glass-panel">
            {/* Steps Left Panel */}
            <div className="steps-list">
              {roadmapSteps.map((stepData, index) => {
                const IconComponent = stepData.icon;
                const isSelected = activeStep === index;
                return (
                  <button
                    key={stepData.step}
                    className={`step-item-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="step-btn-num" style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                      {stepData.step}
                    </div>
                    <div className="step-btn-icon-wrapper" style={{ background: isSelected ? 'rgba(139,0,0,0.1)' : 'transparent' }}>
                      <IconComponent size={18} style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)' }} />
                    </div>
                    <span className="step-btn-title">{stepData.title}</span>
                    {isSelected && (
                      <motion.div 
                        className="active-indicator"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Description Right Panel */}
            <div className="step-details-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="step-detail-card"
                >
                  <div className="step-detail-header">
                    <span className="large-step-number">{roadmapSteps[activeStep].step}</span>
                    <div className="step-detail-title-group">
                      <span className="step-subtitle-tag">Stage {activeStep + 1} of 9</span>
                      <h3 className="step-detail-title">{roadmapSteps[activeStep].title}</h3>
                    </div>
                  </div>
                  
                  <div className="step-divider" style={{ backgroundColor: roadmapSteps[activeStep].color }}></div>
                  
                  <p className="step-detail-desc">
                    {roadmapSteps[activeStep].description}
                  </p>
                  
                  <div className="step-detail-footer">
                    <Link to="/inquiry" className="btn-text">
                      Inquire about this stage <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          overflow-x: hidden;
        }
        
        /* Hero Section Styling */
        .hero-section {
          position: relative;
          min-height: 95vh;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 10% 20%, rgba(253, 251, 247, 0.8) 0%, rgba(253, 251, 247, 1) 90%);
          padding: 8rem 0;
          overflow: hidden;
        }
        .hero-glow-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 0, 0, 0.08) 0%, rgba(139, 0, 0, 0) 70%);
          top: -200px;
          right: -100px;
          border-radius: 50%;
          z-index: 0;
        }
        .hero-glow-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 0, 0, 0.05) 0%, rgba(139, 0, 0, 0) 70%);
          bottom: -100px;
          left: -100px;
          border-radius: 50%;
          z-index: 0;
        }
        .hero-container {
          position: relative;
          z-index: 1;
        }
        .hero-content {
          max-width: 750px;
        }
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(139, 0, 0, 0.05);
          border: 1px solid rgba(139, 0, 0, 0.15);
          color: var(--color-primary);
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          animation: brandBadgeBreathe 3s ease-in-out infinite;
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-primary);
          box-shadow: 0 0 8px var(--color-primary);
          animation: badgeDotPulse 3s ease-in-out infinite;
        }
        @keyframes brandBadgeBreathe {
          0% {
            transform: scale(1);
            background: rgba(139, 0, 0, 0.05);
            border-color: rgba(139, 0, 0, 0.15);
            box-shadow: 0 0 0 rgba(139, 0, 0, 0);
          }
          50% {
            transform: scale(1.05);
            background: rgba(139, 0, 0, 0.1);
            border-color: rgba(139, 0, 0, 0.35);
            box-shadow: 0 0 12px rgba(139, 0, 0, 0.15);
          }
          100% {
            transform: scale(1);
            background: rgba(139, 0, 0, 0.05);
            border-color: rgba(139, 0, 0, 0.15);
            box-shadow: 0 0 0 rgba(139, 0, 0, 0);
          }
        }
        @keyframes badgeDotPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 6px var(--color-primary);
          }
          50% {
            transform: scale(1.25);
            box-shadow: 0 0 16px var(--color-primary);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 6px var(--color-primary);
          }
        }
        .hero-title {
          font-family: var(--font-serif);
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          color: var(--color-text-main);
        }
        .crimson-highlight {
          color: var(--color-primary);
          position: relative;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .hero-actions {
          display: flex;
          gap: 1.25rem;
        }

        /* Roadmap Section Styling */
        .roadmap-section {
          background-color: var(--color-bg-base);
          position: relative;
        }
        .roadmap-grid {
          display: grid;
          grid-template-columns: 1.2fr 1.8fr;
          overflow: hidden;
          margin-top: 2rem;
          border-radius: var(--border-radius-lg);
        }
        .steps-list {
          padding: 2rem;
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.3);
        }
        .step-item-btn {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.9rem 1.25rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: var(--border-radius-sm);
          transition: all 0.3s;
          position: relative;
          gap: 1rem;
          text-align: left;
        }
        .step-item-btn:hover {
          background: rgba(139, 0, 0, 0.03);
        }
        .step-item-btn.active {
          background: rgba(139, 0, 0, 0.05);
        }
        .step-btn-num {
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.1rem;
        }
        .step-btn-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .step-btn-title {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--color-text-main);
        }
        .step-item-btn.active .step-btn-title {
          font-weight: 600;
          color: var(--color-primary);
        }
        .active-indicator {
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 4px;
          background-color: var(--color-primary);
          border-radius: 0 4px 4px 0;
        }
        .step-details-panel {
          padding: 4rem;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.5);
        }
        .step-detail-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .step-detail-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .large-step-number {
          font-family: var(--font-serif);
          font-size: 4rem;
          font-weight: 700;
          color: var(--color-primary);
          opacity: 0.8;
          line-height: 1;
        }
        .step-detail-title-group {
          display: flex;
          flex-direction: column;
        }
        .step-subtitle-tag {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }
        .step-detail-title {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          color: var(--color-text-main);
        }
        .step-divider {
          height: 2px;
          width: 80px;
          border-radius: 1px;
        }
        .step-detail-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-text-muted);
        }
        .step-detail-footer {
          margin-top: 1.5rem;
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 3.5rem;
          }
          .roadmap-grid {
            grid-template-columns: 1fr;
          }
          .steps-list {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            max-height: 280px;
            overflow-y: auto;
          }
          .step-details-panel {
            padding: 3rem 2rem;
          }
        }
        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.75rem;
          }
          .hero-actions {
            flex-direction: column;
            gap: 1rem;
          }
          .hero-actions .btn {
            width: 100%;
          }
          .large-step-number {
            font-size: 3rem;
          }
          .step-detail-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
