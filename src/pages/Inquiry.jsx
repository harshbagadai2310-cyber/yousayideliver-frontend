import React, { useState } from 'react';
import { api } from '../api';
import { CheckCircle2, User, Mail, Phone, Building2, MapPin, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Inquiry() {
  // Form Fields State
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  // UI Flow States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !location || !details) {
      setError('Please fill in all mandatory fields (Name, Email, Location, and Inquiry Details).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.inquiries.create({
        name,
        companyName,
        email,
        location,
        phone,
        details
      });
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inquiry-page section">
      <div className="container">
        {success ? (
          <motion.div 
            className="success-view glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 size={64} className="success-icon" />
            <h1 className="success-title">INQUIRY RECEIVED</h1>
            <p className="success-message">
              Thank you, <strong>{name}</strong>. Your inquiry has been logged, and we have dispatched WhatsApp & email notifications to our team.
            </p>
            <div className="confirmation-details">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Location:</strong> {location}</p>
              <p>We will review your details and reach out within 24 hours.</p>
            </div>
            <button 
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSuccess(false);
                setName('');
                setCompanyName('');
                setEmail('');
                setLocation('');
                setPhone('');
                setDetails('');
              }}
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <div className="inquiry-grid">
            <div className="inquiry-info-panel">
              <span className="info-badge">GET IN TOUCH</span>
              <h1 className="info-title">LET'S BUILD SOMETHING ELITE</h1>
              <p className="info-desc">
                Tell us about your brand vision, custom software demands, or marketing scaling goals. Our specialists review all inquiries directly to engineer a premium solution.
              </p>
              
              <div className="info-points">
                <div className="info-point">
                  <span className="point-number">1</span>
                  <div>
                    <h4>Initial Review</h4>
                    <p>We analyze your website, current marketing efforts, and location specifications.</p>
                  </div>
                </div>
                <div className="info-point">
                  <span className="point-number">2</span>
                  <div>
                    <h4>Milestone Architecture</h4>
                    <p>We coordinate custom deliverables and outline 50/50 stage payment terms.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              className="inquiry-form-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="form-card-title">PROJECT INQUIRY FORM</h2>
              <p className="form-card-subtitle">Provide your requirements below (* indicates mandatory fields)</p>
              
              {error && <div className="error-alert-box">{error}</div>}
              
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-name">Your Name *</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input 
                        id="inquiry-name"
                        type="text" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry-company">Company Name</label>
                    <div className="input-wrapper">
                      <Building2 size={18} className="input-icon" />
                      <input 
                        id="inquiry-company"
                        type="text" 
                        placeholder="Acme Corp" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="inquiry-email">Email Address *</label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input 
                        id="inquiry-email"
                        type="email" 
                        placeholder="john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiry-location">Location (City / State) *</label>
                    <div className="input-wrapper">
                      <MapPin size={18} className="input-icon" />
                      <input 
                        id="inquiry-location"
                        type="text" 
                        placeholder="Mumbai, Maharashtra" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-phone">Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input 
                      id="inquiry-phone"
                      type="tel" 
                      placeholder="+91 93134 82177" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-details">Inquiry details (Describe your needs) *</label>
                  <div className="textarea-wrapper">
                    <MessageSquare size={18} className="textarea-icon" />
                    <textarea 
                      id="inquiry-details"
                      rows="5"
                      placeholder="Please details your branding, logo, or custom website scope, deadlines, and current state..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Send Inquiry'} <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>

      <style>{`
        .inquiry-page {
          padding-top: 8rem;
          padding-bottom: 5rem;
          background: #FAF8F5;
          min-height: 90vh;
          font-family: var(--font-sans), sans-serif;
        }
        
        .success-view {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 3rem 2rem;
          background: #FFFFFF;
          border: 1px solid rgba(139, 0, 0, 0.08);
          border-radius: 12px;
        }
        .success-icon {
          color: #2E7D32;
          margin-bottom: 1.5rem;
        }
        .success-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          letter-spacing: 0.05em;
          color: #111;
          margin-bottom: 1rem;
        }
        .success-message {
          color: #555;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .confirmation-details {
          background: #FDFBF7;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          text-align: left;
        }
        .confirmation-details p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: #333;
        }
        .confirmation-details p:last-child {
          margin-bottom: 0;
          margin-top: 1rem;
          color: #777;
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
          padding-top: 0.75rem;
        }

        .inquiry-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }
        
        .inquiry-info-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .info-badge {
          display: inline-block;
          align-self: flex-start;
          background: rgba(139, 0, 0, 0.05);
          border: 1px solid rgba(139, 0, 0, 0.15);
          color: var(--color-primary, #8B0000);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .info-title {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          line-height: 1.2;
          color: #111111;
        }
        .info-desc {
          color: #666666;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        .info-points {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .info-point {
          display: flex;
          gap: 1.25rem;
        }
        .point-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--color-primary, #8B0000);
          color: #FFFFFF;
          font-weight: 700;
          border-radius: 50%;
          flex-shrink: 0;
          font-size: 0.95rem;
        }
        .info-point h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          margin-bottom: 0.35rem;
          color: #111;
        }
        .info-point p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .inquiry-form-card {
          background: #FFFFFF;
          border: 1px solid rgba(139, 0, 0, 0.08);
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .form-card-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          letter-spacing: 0.05em;
          color: #111;
          margin-bottom: 0.5rem;
        }
        .form-card-subtitle {
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 0.75rem;
        }
        .error-alert-box {
          background: rgba(211, 47, 47, 0.05);
          border: 1px solid rgba(211, 47, 47, 0.2);
          color: #D32F2F;
          padding: 0.85rem 1.25rem;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        
        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #444;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          background: #FAF8F5;
          transition: all 0.3s;
        }
        .input-icon {
          color: #777;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }
        .input-wrapper input {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: #333;
        }
        .input-wrapper:focus-within {
          border-color: var(--color-primary, #8B0000);
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.05);
        }

        .textarea-wrapper {
          display: flex;
          align-items: flex-start;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 0.75rem 0.85rem;
          background: #FAF8F5;
          transition: all 0.3s;
        }
        .textarea-icon {
          color: #777;
          margin-right: 0.75rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        .textarea-wrapper textarea {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: #333;
          resize: vertical;
          font-family: inherit;
        }
        .textarea-wrapper:focus-within {
          border-color: var(--color-primary, #8B0000);
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.05);
        }
        
        .submit-btn {
          align-self: flex-start;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        
        @media (max-width: 992px) {
          .inquiry-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .info-title {
            font-size: 2.2rem;
          }
        }
        @media (max-width: 576px) {
          .form-group-row {
            grid-template-columns: 1fr;
          }
          .inquiry-form-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
