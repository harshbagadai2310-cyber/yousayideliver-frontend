import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Calendar, Clock, CheckCircle2, ChevronRight, User, Mail, Phone, Building2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const availableSlots = [
  "10:00 AM - 11:00 AM IST",
  "11:30 AM - 12:30 PM IST",
  "02:00 PM - 03:00 PM IST",
  "04:00 PM - 05:00 PM IST",
  "06:30 PM - 07:30 PM IST"
];

export default function Book() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packageInterest, setPackageInterest] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  // UI Flow States
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill package interest from URL query parameters
  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg) {
      setPackageInterest(pkg);
    }

    // Load active services to pre-populate dropdown
    const fetchServices = async () => {
      try {
        const data = await api.services.list();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services list:', err);
      }
    };
    fetchServices();
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !packageInterest || !date || !timeSlot) {
      setError('Please fill in all required fields and pick a time slot.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.bookings.create({
        name,
        companyName,
        email,
        phone,
        packageInterest,
        date,
        timeSlot
      });
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page section">
      <div className="container">
        {success ? (
          <motion.div 
            className="success-view glass-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 size={64} className="success-icon" />
            <h1 className="success-title">APPOINTMENT DISPATCHED</h1>
            <p className="success-message">
              Thank you, <strong>{name}</strong>. Your strategy session request has been registered in our system.
            </p>
            <div className="confirmation-details">
              <p><strong>Package:</strong> {packageInterest}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time Slot:</strong> {timeSlot}</p>
            </div>
            <p className="notifications-alert">
              🔔 Simulated WhatsApp and Email confirmations have been dispatched to the admin dashboard and logged in the console.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Homepage</button>
          </motion.div>
        ) : (
          <div className="booking-layout">
            {/* Info Side */}
            <div className="booking-info">
              <span className="booking-sub">Strategic Alignments</span>
              <h1 className="booking-title">SCHEDULE A BRAND CONSPIRACY</h1>
              <div className="title-bar" style={{ margin: '1rem 0' }}></div>
              <p className="booking-intro">
                Review core opportunities with our executive systems architects. Fill in your package interests, pick a date, and select an open time slot to reserve your review.
              </p>

              <div className="next-steps-list">
                <div className="step-card">
                  <div className="step-card-num">1</div>
                  <div>
                    <h5>Request Submission</h5>
                    <p>Your details are processed and logged. Automated notifications are sent to our scheduling office.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-card-num">2</div>
                  <div>
                    <h5>WhatsApp & Email Confirm</h5>
                    <p>We review our availability and notify you via WhatsApp and Email with connection links.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-card-num">3</div>
                  <div>
                    <h5>Strategy Launch</h5>
                    <p>We connect for a high-intensity 30-minute diagnostic session to wireframe your digital expansion.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="booking-form-wrapper glass-panel">
              {error && (
                <div className="error-banner">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Contact Fields */}
                <div className="input-group">
                  <label><User size={16} /> Client Name *</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div className="input-group">
                  <label><Building2 size={16} /> Company Name</label>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                  />
                </div>

                <div className="grid-2-form">
                  <div className="input-group">
                    <label><Mail size={16} /> Email Address *</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@acme.com"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label><Phone size={16} /> Contact Number * (WhatsApp)</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* Package dropdown */}
                <div className="input-group">
                  <label><Briefcase size={16} /> Package Interest *</label>
                  <select 
                    value={packageInterest}
                    onChange={(e) => setPackageInterest(e.target.value)}
                    required
                  >
                    <option value="">-- Select Package --</option>
                    {services.map((service) => (
                      <option key={service._id} value={service.title}>{service.title} ({service.price})</option>
                    ))}
                    <option value="Custom Project Consultation">Custom Project Consultation</option>
                  </select>
                </div>

                {/* Date Picker */}
                <div className="input-group">
                  <label><Calendar size={16} /> Select Date *</label>
                  <input 
                    type="date" 
                    value={date}
                    min={new Date().toISOString().split('T')[0]} // Block past dates
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* Time slot visual picker */}
                <div className="time-slots-selector">
                  <label className="slots-label"><Clock size={16} /> Select Time Slot *</label>
                  <div className="slots-grid">
                    {availableSlots.map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          className={`slot-chip ${isSelected ? 'active' : ''}`}
                          onClick={() => setTimeSlot(slot)}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary submit-booking-btn"
                >
                  {loading ? 'Processing Schedule...' : 'Lock Strategy Session'} <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .book-page {
          padding-top: 8rem;
          min-height: 90vh;
          background: radial-gradient(circle at 90% 10%, rgba(139, 0, 0, 0.03) 0%, rgba(253, 251, 247, 1) 70%);
        }
        
        /* Success Card */
        .success-view {
          max-width: 650px;
          margin: 3rem auto;
          text-align: center;
          padding: 4rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          background: #FFFFFF;
          border-color: var(--color-primary);
        }
        .success-icon {
          color: var(--color-primary);
        }
        .success-title {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          letter-spacing: 0.05em;
        }
        .success-message {
          font-size: 1.1rem;
          color: var(--color-text-muted);
        }
        .confirmation-details {
          background: rgba(139,0,0,0.03);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          width: 100%;
          text-align: left;
          font-size: 0.95rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .notifications-alert {
          font-size: 0.88rem;
          color: var(--color-primary);
          font-weight: 500;
        }

        /* Layout Grid */
        .booking-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: flex-start;
          margin-top: 2rem;
        }
        .booking-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .booking-sub {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--color-primary);
        }
        .booking-title {
          font-family: var(--font-serif);
          font-size: 2.75rem;
          line-height: 1.1;
        }
        .booking-intro {
          font-size: 1.1rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        
        .next-steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .step-card {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }
        .step-card-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
          box-shadow: 0 4px 8px rgba(139,0,0,0.25);
        }
        .step-card h5 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text-main);
          margin-bottom: 0.25rem;
        }
        .step-card p {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* Form styling */
        .booking-form-wrapper {
          background: #FFFFFF;
          padding: 3rem 2.5rem;
          border-radius: var(--border-radius-lg);
        }
        .error-banner {
          background: rgba(220,53,69,0.08);
          border: 1px solid rgba(220,53,69,0.2);
          color: #DC3545;
          padding: 1rem;
          border-radius: var(--border-radius-sm);
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }
        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .grid-2-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-text-main);
        }
        .input-group label svg {
          color: var(--color-primary);
        }
        .input-group input, .input-group select {
          padding: 0.75rem 1rem;
          border: 1px solid #E8E5DF;
          background: #FDFBF7;
          border-radius: 8px;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--color-text-main);
          transition: all 0.3s;
        }
        .input-group input:focus, .input-group select:focus {
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.05);
          background: #FFFFFF;
        }
        
        .time-slots-selector {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .slots-label {
          font-size: 0.88rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-text-main);
        }
        .slots-label svg {
          color: var(--color-primary);
        }
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .slot-chip {
          padding: 0.65rem 0.5rem;
          border: 1px solid #E8E5DF;
          background: #FDFBF7;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s;
          text-align: center;
        }
        .slot-chip:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .slot-chip.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(139,0,0,0.15);
        }
        .submit-booking-btn {
          margin-top: 1rem;
          padding: 0.9rem;
          border-radius: 8px;
        }

        @media (max-width: 992px) {
          .booking-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .booking-title {
            font-size: 2.25rem;
          }
        }
        @media (max-width: 576px) {
          .grid-2-form {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .slots-grid {
            grid-template-columns: 1fr;
          }
          .booking-form-wrapper {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
