import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { Check, Sparkles, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const INDIVIDUAL_PRICES = {
  "Brand Discovery & Research Session": "₹500",
  "Brand Story & Messaging Plan": "₹500",
  "Logo & Icon Design": "₹2,000",
  "Complete Brand Book & File Handoff": "₹3,000",
  
  "Business Cards & Stationery Designs": "₹3,000",
  "Social Media Profiles & Grid Templates": "₹4,000",
  "High-Converting Social Media Ad Templates": "₹6,000",
  
  "Website Layout Planning & Interactive Mockups": "₹4,000",
  "Custom Website Development": "₹16,000",
  "Google Search Optimization & Speed Tuning": "₹5,000"
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePricingMode, setActivePricingMode] = useState('bundle'); // 'bundle' or 'individual'

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.services.list();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
        setError('Unable to load pricing packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter basic vs. elite packages
  const basicServices = useMemo(() => {
    return services
      .filter((s) => s.phase !== 'Elite')
      .sort((a, b) => a.phase.localeCompare(b.phase));
  }, [services]);

  const eliteService = useMemo(() => {
    return services.find((s) => s.phase === 'Elite');
  }, [services]);

  const getTopPill = (phase) => {
    if (phase === 'Phase 1') return 'ESSENTIAL FOUNDATION';
    if (phase === 'Phase 2') return 'COMPLETE MARKETING ASSETS';
    if (phase === 'Phase 3') return 'PREMIUM WEB PRESENCE';
    return 'ALL-IN-ONE SOLUTION';
  };

  const parseFeature = (feature) => {
    const colonIndex = feature.indexOf(':');
    if (colonIndex === -1) {
      return { heading: feature, detail: '' };
    }
    return {
      heading: feature.substring(0, colonIndex).trim(),
      detail: feature.substring(colonIndex + 1).trim()
    };
  };

  return (
    <div className="services-page section">
      <div className="container">
        <h1 className="section-title">SERVICES & PRICING</h1>
        <p className="section-subtitle">
          Transparent, value-engineered investment tiers structured to establish strategy, build marketing collateral, and launch high-conversion software systems.
        </p>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading pricing tiers...</p>
          </div>
        ) : error ? (
          <div className="error-alert">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        ) : (
          <div className="pricing-wrapper">
            {/* Toggle pricing mode: Discounted Bundles vs Individual Services */}
            <div className="pricing-mode-toggle-container">
              <div className="pricing-mode-toggle-bar">
                <button
                  type="button"
                  className={`toggle-btn ${activePricingMode === 'bundle' ? 'active' : ''}`}
                  onClick={() => setActivePricingMode('bundle')}
                >
                  Discounted Bundles
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${activePricingMode === 'individual' ? 'active' : ''}`}
                  onClick={() => setActivePricingMode('individual')}
                >
                  Individual Services
                </button>
              </div>
            </div>

            {/* Top 3 Basic Packages Grid */}
            <div className="services-grid">
              {basicServices.map((service) => (
                <div key={service._id} className="service-card glass-panel">
                  <div className="service-header">
                    <span className="top-category-pill">{getTopPill(service.phase)}</span>
                    <span className="service-phase">{service.phase}</span>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                  </div>

                  {activePricingMode === 'bundle' ? (
                    <>
                      <div className="pricing-box">
                        <div className="price-row">
                          <span className="price-main">{service.price}</span>
                          {service.originalPrice && (
                            <span className="price-original">{service.originalPrice}</span>
                          )}
                        </div>
                        {service.savings && (
                          <span className="savings-badge">
                            % Bundle savings of {service.savings}!
                          </span>
                        )}
                      </div>

                      <div className="features-container">
                        {service.features.map((feature, idx) => {
                          const { heading, detail } = parseFeature(feature);
                          return (
                            <div key={idx} className="feature-row">
                              <Check className="feature-check" size={16} />
                              <div className="feature-text">
                                <span className="feature-heading">{heading}</span>
                                {detail && <span className="feature-detail"> {detail}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pricing-box individual-pricing-box">
                        <span className="individual-pricing-title">DELIVERABLE-BASED CUSTOM PRICING</span>
                      </div>

                      <div className="individual-features-container">
                        {service.features.map((feature, idx) => {
                          const { heading, detail } = parseFeature(feature);
                          const individualPrice = INDIVIDUAL_PRICES[heading] || '₹0';
                          return (
                            <div key={idx} className="individual-feature-card">
                              <div className="individual-feature-left">
                                <Check className="feature-check-circle" size={16} />
                                <div className="individual-feature-text">
                                  <span className="individual-feature-heading">{heading}</span>
                                  {detail && <span className="individual-feature-detail">{detail}</span>}
                                </div>
                              </div>
                              <span className="individual-feature-price">{individualPrice}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <div className="cta-wrapper">
                    {activePricingMode === 'bundle' ? (
                      <a
                        href={`/book?package=${encodeURIComponent(service.title)}`}
                        className="cta-outline-btn"
                      >
                        AUTHORIZE & BOOK BUNDLE ↗
                      </a>
                    ) : (
                      <a
                        href={`/inquiry?package=${encodeURIComponent(service.title)}`}
                        className="cta-outline-btn"
                      >
                        AUTHORIZE & INQUIRE SERVICES ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Section: Combined Package (Elite) */}
            {eliteService && (
              <div className="elite-horizontal-banner">
                <div className="elite-left-content">
                  <span className="elite-solution-badge">ALL-IN-ONE SOLUTION</span>
                  <h2 className="elite-package-title">THE COMPLETE GROWTH PACKAGE</h2>
                  <p className="elite-package-desc">
                    {eliteService.description}
                  </p>

                  <div className="elite-stats-grid">
                    <div className="stat-col">
                      <span className="stat-label">ORIGINAL SUM</span>
                      <span className="stat-value strikethrough">{eliteService.originalPrice || '₹44,000'}</span>
                    </div>
                    <div className="stat-col">
                      <span className="stat-label">COMBINED PACKAGE</span>
                      <span className="stat-value highlighted">{eliteService.price}</span>
                    </div>
                    <div className="stat-col">
                      <span className="stat-label">YOUR SAVINGS</span>
                      <span className="stat-value saving-red">{eliteService.savings ? `${eliteService.savings} Saved` : '₹9,000 Saved'}</span>
                    </div>
                    <div className="stat-col">
                      <span className="stat-label">ESTIMATED TIMELINE</span>
                      <span className="stat-value">12 Weeks Total</span>
                    </div>
                  </div>
                </div>

                <div className="elite-right-pricing glass-panel">
                  <span className="special-deal-label">SPECIAL PACKAGE DEAL</span>
                  <div className="special-deal-price">{eliteService.price}</div>
                  <a
                    href={`/book?package=${encodeURIComponent(eliteService.title)}`}
                    className="book-full-btn"
                  >
                    <Calendar size={18} /> {eliteService.ctaLabel || 'BOOK FULL PACKAGE'}
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Section: Notes Section */}
            <div className="important-notes-section glass-panel">
              <div className="notes-left">
                <span className="notes-pill">MILESTONES & TRANSITION</span>
                <h3 className="notes-main-title">IMPORTANT NOTES</h3>
                <p className="notes-subtitle">FRAMEWORK FOR SOVEREIGN, CLIENT-FOCUSED COMMITMENT</p>
              </div>

              <div className="notes-right-list">
                <div className="note-item">
                  <div className="note-badge">1</div>
                  <div className="note-body">
                    <h4 className="note-item-title">SOVEREIGN SCOPE PRICING ADJUSTMENTS</h4>
                    <p className="note-item-text">
                      <strong>Prices may vary</strong> depending on the content complexity and the services selected.
                    </p>
                  </div>
                </div>

                <div className="note-item">
                  <div className="note-badge">2</div>
                  <div className="note-body">
                    <h4 className="note-item-title">TRANSPARENT FIFTY-FIFTY MILESTONE LEDGER</h4>
                    <p className="note-item-text">
                      To ensure a <strong>transparent and seamless collaboration</strong>, <strong>50% of the total project amount is payable before the commencement of the service</strong>, while the <strong>remaining 50% is payable upon successful completion and final delivery</strong>. This milestone-based payment structure reflects our commitment to building long-term relationships founded on <strong>trust, professionalism, transparency, and mutual confidence</strong>.
                    </p>
                  </div>
                </div>

                <div className="note-item">
                  <div className="note-badge">3</div>
                  <div className="note-body">
                    <h4 className="note-item-title">LONG-TERM VALUE ALIGNMENT PROMISE</h4>
                    <p className="note-item-text">
                      Our objective is <strong>not just to deliver content</strong>, but to become <strong>your long-term creative partner</strong>, helping your brand grow consistently through strategic, high-quality, and impactful content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .services-page {
          padding-top: 8rem;
          padding-bottom: 5rem;
          min-height: 80vh;
        }
        .pricing-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          margin-top: 3rem;
        }
        
        /* Toggle pricing mode: Discounted Bundles vs Individual Services */
        .pricing-mode-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .pricing-mode-toggle-bar {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.06);
          display: inline-flex;
          padding: 4px;
          border-radius: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .toggle-btn {
          border: none;
          background: none;
          padding: 0.65rem 1.8rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          color: var(--color-text-muted, #777777);
          font-family: var(--font-sans), sans-serif;
        }
        .toggle-btn.active {
          background: var(--color-primary, #8B0000);
          color: #FFFFFF !important;
          box-shadow: 0 4px 10px rgba(139, 0, 0, 0.2);
        }
        
        /* Phase Filter Tabs */
        .phase-filters-container {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .phase-filter-btn {
          background: none;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 0.55rem 1.35rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted, #777777);
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: var(--font-sans), sans-serif;
        }
        .phase-filter-btn:hover {
          border-color: var(--color-primary, #8B0000);
          color: var(--color-primary, #8B0000);
        }
        .phase-filter-btn.active {
          background: #1C1C1E;
          border-color: #1C1C1E;
          color: #FFFFFF !important;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* Individual services layout */
        .individual-pricing-box {
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 2rem;
          text-align: center;
        }
        .individual-pricing-title {
          font-size: 0.85rem;
          color: var(--color-text-muted, #777777);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .individual-features-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }
        .individual-feature-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 6px rgba(0,0,0,0.015);
          gap: 1rem;
          transition: all 0.25s ease;
        }
        .individual-feature-card:hover {
          border-color: rgba(139, 0, 0, 0.2);
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.04);
        }
        .individual-feature-left {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .feature-check-circle {
          color: var(--color-primary, #8B0000);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        .individual-feature-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .individual-feature-heading {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text, #333333);
        }
        .individual-feature-detail {
          font-size: 0.82rem;
          color: var(--color-text-muted, #777777);
          line-height: 1.45;
        }
        .individual-feature-price {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary, #8B0000);
          white-space: nowrap;
        }

        /* Filter single card display scaling */
        .services-grid.single-filtered-grid {
          display: flex;
          justify-content: center;
        }
        .services-grid.single-filtered-grid .service-card {
          width: 100%;
          max-width: 480px;
        }
        
        /* 3 Columns Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          align-items: stretch;
        }
        
        .service-card {
          display: flex;
          flex-direction: column;
          padding: 2.5rem 2rem;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(139, 0, 0, 0.08);
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .top-category-pill {
          display: inline-block;
          background: #1A1C1E;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.35rem 0.8rem;
          border-radius: 100px;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          width: fit-content;
        }
        
        .service-phase {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.12em;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }
        
        .service-title {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          font-weight: 600;
          color: var(--color-text-main);
          margin-bottom: 0.8rem;
          line-height: 1.25;
        }
        
        .service-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          min-height: 4.5rem;
        }
        
        /* Pricing block */
        .pricing-box {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .price-main {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .price-original {
          font-size: 1.1rem;
          text-decoration: line-through;
          color: #A39E93;
        }
        .savings-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2E7D32;
          margin-top: 0.25rem;
        }
        
        /* Feature rows */
        .features-container {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }
        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .feature-check {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        .feature-text {
          font-size: 0.85rem;
          line-height: 1.45;
          color: var(--color-text-muted);
        }
        .feature-heading {
          font-weight: 600;
          color: var(--color-text-main);
        }
        .feature-detail {
          color: var(--color-text-muted);
        }
        
        .cta-wrapper {
          margin-top: auto;
        }
        .cta-outline-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.85rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          border: 1px solid var(--color-primary);
          border-radius: 4px;
          color: var(--color-primary);
          background: transparent;
          transition: background 0.3s ease, color 0.3s ease;
          text-transform: uppercase;
        }
        .cta-outline-btn:hover {
          background: var(--color-primary);
          color: #FFFFFF;
        }
        
        /* Combo Horizontal Banner */
        .elite-horizontal-banner {
          display: flex;
          background: #5C6268;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          align-items: stretch;
          color: #FFFFFF;
        }
        .elite-left-content {
          flex: 1;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .elite-solution-badge {
          display: inline-block;
          background: var(--color-primary);
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.35rem 0.8rem;
          border-radius: 100px;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          width: fit-content;
        }
        .elite-package-title {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
          color: #FFFFFF;
        }
        .elite-package-desc {
          color: #FFFFFF !important;
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.85;
          margin-bottom: 2.5rem;
          max-width: 650px;
        }
        
        .elite-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 1.5rem;
        }
        .stat-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .stat-col span {
          color: #FFFFFF;
        }
        .stat-label {
          font-size: 0.68rem;
          font-weight: 600;
          opacity: 0.65;
          letter-spacing: 0.05em;
        }
        .stat-value {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .stat-value.strikethrough {
          text-decoration: line-through;
          opacity: 0.7;
        }
        .stat-value.highlighted {
          color: #FFFFFF;
        }
        .stat-value.saving-red {
          color: #FF8A80;
        }
        
        .elite-right-pricing {
          width: 320px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem;
          flex-shrink: 0;
          text-align: center;
        }
        .special-deal-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          opacity: 0.75;
          margin-bottom: 0.5rem;
        }
        .special-deal-price {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #FFFFFF;
        }
        .book-full-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--color-primary);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 1rem 1.5rem;
          border-radius: 4px;
          width: 100%;
          transition: background 0.3s ease;
          text-transform: uppercase;
        }
        .book-full-btn:hover {
          background: #A00000;
        }
        
        /* Important Notes Section */
        .important-notes-section {
          display: flex;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(139, 0, 0, 0.08);
          border-radius: 12px;
          gap: 4rem;
        }
        .notes-left {
          width: 300px;
          flex-shrink: 0;
          border-left: 4px solid var(--color-primary);
          padding-left: 1.5rem;
        }
        .notes-pill {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }
        .notes-main-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-text-main);
          margin-bottom: 0.5rem;
        }
        .notes-subtitle {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          line-height: 1.4;
        }
        
        .notes-right-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          flex: 1;
        }
        .note-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .note-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(139, 0, 0, 0.05);
          border: 1px solid rgba(139, 0, 0, 0.15);
          border-radius: 50%;
          color: var(--color-primary);
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .note-body {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .note-item-title {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.05em;
        }
        .note-item-text {
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--color-text-muted);
        }
        
        /* Loader & Spinner */
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: var(--color-text-muted);
          gap: 1rem;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(139,0,0,0.1);
          border-top: 3px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .error-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(220,53,69,0.05);
          border: 1px solid rgba(220,53,69,0.2);
          padding: 1.5rem;
          border-radius: var(--border-radius-md);
          color: #DC3545;
          max-width: 600px;
          margin: 3rem auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsiveness */
        @media (max-width: 1024px) {
          .elite-horizontal-banner {
            flex-direction: column;
          }
          .elite-right-pricing {
            width: 100%;
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            padding: 2.5rem;
          }
          .important-notes-section {
            flex-direction: column;
            gap: 2.5rem;
          }
          .notes-left {
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .elite-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
          }
          .elite-left-content {
            padding: 2rem;
          }
          .important-notes-section {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
