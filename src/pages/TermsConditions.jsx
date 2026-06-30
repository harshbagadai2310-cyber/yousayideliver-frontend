import React from 'react';

export default function TermsConditions() {
  return (
    <div className="policy-page section">
      <div className="container policy-container glass-panel">
        <h1 className="policy-title">TERMS & CONDITIONS</h1>
        <div className="title-bar" style={{ margin: '1rem 0 2rem' }}></div>
        
        <p className="policy-date">Last Updated: June 28, 2026</p>

        <section className="policy-section">
          <h2>1. Engagement & System Blueprinting</h2>
          <p>
            By booking a diagnostic session or contracting project phases with You Say I Deliver, you enter into a binding strategic agreement. We commit to executing deliverables in accordance with the 9-step growth roadmap outlined on our platform.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Investment & Project Phases</h2>
          <p>
            Our deliverables are divided into 3 distinct strategic phases and 1 Elite scale-up combo. Unless otherwise agreed in custom client contracts, payment terms are project-based and mapped to phase handoffs:
          </p>
          <ul>
            <li><strong>Phase 1:</strong> Brand Strategy & Identity Core</li>
            <li><strong>Phase 2:</strong> Marketing Architecture & Visual Assets</li>
            <li><strong>Phase 3:</strong> Digital Presence & React Web Deployment</li>
            <li><strong>Elite Combo:</strong> Integrated corporate scale-up operations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Media Upload & Database Licenses</h2>
          <p>
            For client assets stored inside MongoDB GridFS (such as brand assets, banners, ads, and photography collaterals), the client grants You Say I Deliver a non-exclusive license to host and stream files for the sole purpose of displaying content in the portfolio or customized client review ports.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Intellectual Property & Deliverables Handoff</h2>
          <p>
            All custom designs, branding handbooks, social media architectures, and full-stack source code files are 100% owned by the client upon completion of the respective phase payments. We do not retain license rights or require recurring platform fees for deployed React web engines.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Dispute Resolution</h2>
          <p>
            These terms are governed by national commercial standards. Any dispute, negotiation, or claim regarding system deployments or strategic assets will first be resolved through good-faith mediation sessions.
          </p>
        </section>
      </div>

      <style>{`
        .policy-page {
          padding-top: 8rem;
          min-height: 90vh;
          background: #FAF6EE;
        }
        .policy-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 3rem;
          background: #FFFFFF;
        }
        .policy-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-text-main);
        }
        .policy-date {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .policy-section {
          margin-bottom: 2rem;
        }
        .policy-section h2 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--color-text-main);
          margin-bottom: 0.75rem;
        }
        .policy-section p {
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }
        .policy-container ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-text-muted);
        }
        .policy-container li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}
