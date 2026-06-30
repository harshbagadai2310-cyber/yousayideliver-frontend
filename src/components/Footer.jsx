import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-info">
            <h3 className="footer-title">YOU SAY I DELIVER</h3>
            <p className="footer-desc">
              We design and construct high-conversion digital architectures, premium visual brand kits, and result-oriented marketing systems for elite companies ready to scale.
            </p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/yousay_ideliver/"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/yousayideliver"
                className="social-link"
                aria-label="Behance"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7v1.5h7V7zm-1.5 5c0-.9-.7-1.5-1.5-1.5s-1.5.6-1.5 1.5h3zm-3 1.5c0 .9.7 1.5 1.5 1.5.5 0 .9-.2 1.1-.6h1.7c-.4 1.3-1.6 2.1-2.8 2.1-2.2 0-3.5-1.5-3.5-3.5s1.3-3.5 3.5-3.5c2.2 0 3.3 1.5 3.3 3.5v.5h-5.3zm-5.7 1.3c0 .8-.5 1.2-1.3 1.2H4.3v-2.5H7c.8 0 1.3.4 1.3 1.3zm-.3-4.3c0 .7-.5 1.1-1.2 1.1H4.3V8.8h2.5c.7 0 1.2.4 1.2 1.2zm1.8 1.5c.5-.4.8-1 .8-1.7 0-1.8-1.3-2.8-3.2-2.8H1v12h5.5c2 0 3.5-1.1 3.5-3.1 0-1.1-.6-2-1.5-2.4z" />
                </svg>
              </a>
              <a
                href="https://dribbble.com/yousayideliver"
                className="social-link"
                aria-label="Dribbble"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              <li><Link to="/services" className="footer-link">Strategy & Core</Link></li>
              <li><Link to="/services" className="footer-link">Marketing Architecture</Link></li>
              <li><Link to="/services" className="footer-link">Full-Stack Launch</Link></li>
              <li><Link to="/services" className="footer-link">Elite Scale-Up</Link></li>
            </ul>
          </div>

          {/* Legal / Pages links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/work" className="footer-link">Our Work</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/blogs" className="footer-link">Blogs</Link></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list footer-contact-list">
              <li>
                <Mail size={16} />
                <span>hello@yousayideliver.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+91 93134 82177</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>Rajkot, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} You Say I Deliver. All rights reserved. Strategic digital systems engineered with precision.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #111111;
          color: #E6E6E6;
          padding: 5rem 2rem 2.5rem;
          border-top: 2px solid var(--color-primary);
          font-family: var(--font-sans);
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 4rem;
          margin-bottom: 4rem;
        }
        .footer-brand-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          color: #FFFFFF;
        }
        .footer-desc {
          color: #A0A0A0;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 380px;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: #E6E6E6;
          transition: all 0.3s;
        }
        .social-link:hover {
          background: var(--color-primary);
          color: #FFFFFF;
          transform: translateY(-2px);
        }
        .footer-heading {
          font-family: var(--font-serif);
          color: #FFFFFF;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
        }
        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-link {
          color: #A0A0A0;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--color-primary);
        }
        .footer-contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #A0A0A0;
        }
        .footer-contact-list svg {
          color: var(--color-primary);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #777777;
        }
        .footer-bottom-links {
          display: flex;
          gap: 0.75rem;
        }
        .footer-bottom-link:hover {
          color: #A0A0A0;
        }
        .divider {
          color: #333333;
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
