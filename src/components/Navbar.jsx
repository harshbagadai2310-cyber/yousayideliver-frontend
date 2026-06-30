import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, LogOut } from 'lucide-react';
import { api } from '../api';

export default function Navbar({ adminUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo & Title */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src="/Logo.jpeg" alt="You Say I Deliver Logo" className="brand-logo" />
          <span className="brand-text">YOU SAY I DELIVER</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
          <Link to="/work" className={`nav-link ${isActive('/work') ? 'active' : ''}`}>Our Work</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'active' : ''}`}>FAQ</Link>
          <Link to="/blogs" className={`nav-link ${isActive('/blogs') ? 'active' : ''}`}>Blogs</Link>
          
          {adminUser ? (
            <>
              <Link to="/admin" className={`nav-link admin-indicator ${isActive('/admin') ? 'active' : ''}`}>
                <ShieldAlert size={16} /> Admin Portal
              </Link>
              <button onClick={onLogout} className="logout-btn" title="Logout">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/inquiry" className="nav-link" style={{ marginRight: '1rem', fontWeight: 600 }}>Inquiry Form</Link>
              <Link to="/book" className="btn btn-primary nav-book-btn">Book Consultation</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-links">
          <Link to="/" className={`drawer-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/services" className={`drawer-link ${isActive('/services') ? 'active' : ''}`} onClick={closeMenu}>Services</Link>
          <Link to="/work" className={`drawer-link ${isActive('/work') ? 'active' : ''}`} onClick={closeMenu}>Our Work</Link>
          <Link to="/about" className={`drawer-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>About Us</Link>
          <Link to="/faq" className={`drawer-link ${isActive('/faq') ? 'active' : ''}`} onClick={closeMenu}>FAQ</Link>
          <Link to="/blogs" className={`drawer-link ${isActive('/blogs') ? 'active' : ''}`} onClick={closeMenu}>Blogs</Link>
          
          {adminUser ? (
            <>
              <Link to="/admin" className="drawer-link admin-indicator-drawer" onClick={closeMenu}>
                <ShieldAlert size={18} /> Admin Portal
              </Link>
              <button onClick={() => { onLogout(); closeMenu(); }} className="drawer-link logout-drawer-btn">
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/inquiry" className="drawer-link" style={{ fontWeight: 600, color: 'var(--color-primary)' }} onClick={closeMenu}>Inquiry Form</Link>
              <Link to="/book" className="btn btn-primary drawer-book-btn" onClick={closeMenu}>Book Consultation</Link>
            </>
          )}
        </div>
      </div>

      {/* Styles for Navbar - embedded or defined in index.css */}
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.25rem 2rem;
          transition: all 0.4s ease;
          background: transparent;
        }
        .navbar-scrolled {
          background: rgba(253, 251, 247, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          padding: 0.75rem 2rem;
          box-shadow: 0 4px 30px rgba(139, 0, 0, 0.05);
          border-bottom: 1px solid rgba(139, 0, 0, 0.08);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          color: var(--color-text-main);
        }
        .brand-logo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--color-primary);
        }
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--color-primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: var(--color-primary);
          font-weight: 600;
        }
        .nav-book-btn {
          padding: 0.5rem 1.25rem;
          font-size: 0.9rem;
        }
        .admin-indicator {
          color: #DC3545;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
        }
        .logout-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: color 0.3s;
          padding: 0.25rem;
        }
        .logout-btn:hover {
          color: var(--color-primary);
        }
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-main);
          position: relative;
          z-index: 1001;
        }
        .nav-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background: var(--color-bg-base);
          box-shadow: -5px 0 30px rgba(0,0,0,0.05);
          transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 8rem 2rem 2rem;
          border-left: 1px solid var(--color-border);
        }
        .nav-drawer.open {
          right: 0;
        }
        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .drawer-link {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .drawer-link:hover, .drawer-link.active {
          color: var(--color-primary);
          padding-left: 0.5rem;
          transition: all 0.3s ease;
        }
        .drawer-book-btn {
          margin-top: 1.5rem;
          width: 100%;
        }
        .admin-indicator-drawer {
          color: #DC3545;
          font-weight: 600;
        }
        .logout-drawer-btn {
          background: none;
          border: none;
          text-align: left;
          font-family: inherit;
          cursor: pointer;
          padding: 0;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
          .nav-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
