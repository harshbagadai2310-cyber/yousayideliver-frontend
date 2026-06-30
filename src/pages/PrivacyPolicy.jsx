import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="policy-page section">
      <div className="container policy-container glass-panel">
        <h1 className="policy-title">PRIVACY POLICY</h1>
        <div className="title-bar" style={{ margin: '1rem 0 2rem' }}></div>
        
        <p className="policy-date">Last Updated: June 28, 2026</p>

        <section className="policy-section">
          <h2>1. Data Collection Commitment</h2>
          <p>
            At You Say I Deliver, we operate under clean operational parameters. We collect information necessary to design, optimize, and launch your digital systems. This includes details submitted via our booking portal (name, company name, email contact, and WhatsApp phone number). We do not engage in background tracking or user profiling.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Use of Information</h2>
          <p>
            Any client details collected by our database are strictly utilized to:
          </p>
          <ul>
            <li>Schedule and dispatch strategy sessions.</li>
            <li>Issue automated appointment updates via Email and WhatsApp systems.</li>
            <li>Construct client profiles inside our content management dashboards.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Database & File Security</h2>
          <p>
            Your details and project assets are hosted exclusively in our private MongoDB database infrastructure. Uploaded media assets are chunked and streamed securely using MongoDB GridFS. We do not store files on public, unencrypted cloud buckets.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Cookies & Sessions</h2>
          <p>
            We use secure `HttpOnly` cookie tokens for administrator session validations. These cookies are stored locally by your browser, contain zero tracking details, and are used solely to guard private admin dashboard routes.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Retraction & Removal</h2>
          <p>
            If you wish to retract a booking schedule or request complete removal of your company contact profile from our system registries, you may submit a retraction request to <strong>hello@yousayideliver.com</strong>. All data deletes are executed permanently from active collections.
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
