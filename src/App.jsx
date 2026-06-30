import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { api } from './api';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Book from './pages/Book';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Inquiry from './pages/Inquiry';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function WhatsAppWidget() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null;
  }
  return (
    <a 
      href="https://wa.me/919313482177" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-floating-btn"
    >
      <svg 
        viewBox="0 0 24 24" 
        className="whatsapp-svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="whatsapp-tooltip">Connect on WhatsApp</span>
    </a>
  );
}

export default function App() {
  const [adminUser, setAdminUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.auth.me();
        if (response.success && response.user) {
          setAdminUser(response.user);
        }
      } catch (err) {
        // Safe to ignore - just means not authenticated
        setAdminUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      setAdminUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
  };

  if (loadingAuth) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner"></div>
        <p>Connecting to secure session...</p>
        <style>{`
          .auth-loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #FDFBF7;
            gap: 1rem;
            color: #5A5550;
            font-family: sans-serif;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(139,0,0,0.1);
            border-top: 3px solid #8B0000;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar adminUser={adminUser} onLogout={handleLogout} />
        
        <main className="main-content-area">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/book" element={<Book />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            
            {/* Login Route (redirects to admin if already logged in) */}
            <Route 
              path="/login" 
              element={adminUser ? <Navigate to="/admin" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
            />
            
            {/* Protected Admin Route */}
            <Route 
              path="/admin" 
              element={adminUser ? <AdminDashboard /> : <Navigate to="/login" replace />} 
            />
            
            {/* Fallback Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        
        <WhatsAppWidget />
        
        <style>{`
          .app-shell {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .main-content-area {
            flex-grow: 1;
          }
          .whatsapp-floating-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background-color: #8B0000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(139, 0, 0, 0.3), 0 0 10px rgba(139, 0, 0, 0.15);
            z-index: 9999;
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, background-color 0.3s ease;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: whatsappBreathe 3s ease-in-out infinite;
          }
          .whatsapp-floating-btn:hover {
            transform: scale(1.1);
            background-color: #A00000;
            box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4), 0 0 15px rgba(139, 0, 0, 0.25);
            animation-play-state: paused;
          }
          @keyframes whatsappBreathe {
            0% {
              transform: scale(1);
              box-shadow: 0 4px 16px rgba(139, 0, 0, 0.3), 0 0 10px rgba(139, 0, 0, 0.15);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 6px 22px rgba(139, 0, 0, 0.45), 0 0 18px rgba(139, 0, 0, 0.25);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 4px 16px rgba(139, 0, 0, 0.3), 0 0 10px rgba(139, 0, 0, 0.15);
            }
          }
          .whatsapp-svg {
            width: 32px;
            height: 32px;
            fill: #FFFFFF;
          }
          .whatsapp-tooltip {
            position: absolute;
            bottom: 50%;
            right: calc(100% + 15px);
            transform: translateY(50%) scale(0.9);
            background: #1C1C1C;
            color: #FFFFFF;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: var(--font-sans), sans-serif;
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          .whatsapp-tooltip::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent transparent #1C1C1C;
          }
          .whatsapp-floating-btn:hover .whatsapp-tooltip {
            opacity: 1;
            transform: translateY(50%) scale(1);
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}
