import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { ShieldCheck, Key, User, Lock, AlertCircle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.login(username, password);
      if (response.success) {
        onLoginSuccess(response.user);
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow"></div>
      
      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="login-badge-icon">
            <ShieldCheck size={28} />
          </div>
          <h2>Admin Gate</h2>
          <p>You Say I Deliver Strategic Control Console</p>
        </div>

        {error && (
          <div className="login-error-banner">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label><User size={16} /> Username</label>
            <div className="input-with-icon">
              <User className="input-field-icon" size={16} />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          <div className="login-input-group">
            <label><Lock size={16} /> Security Password</label>
            <div className="input-with-icon">
              <Key className="input-field-icon" size={16} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary login-submit-btn"
          >
            {loading ? 'Authenticating...' : 'Establish Session'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Protected area. All attempts are monitored and recorded.</p>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(circle at center, #2a0003 0%, #111111 100%);
          position: relative;
          overflow: hidden;
        }
        .login-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0) 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 3rem 2.5rem;
          background: rgba(20, 20, 20, 0.75) !important;
          border-color: rgba(139,0,0,0.3) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(139,0,0,0.1) !important;
          position: relative;
          z-index: 1;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-header h2 {
          font-family: var(--font-serif);
          color: #FFFFFF;
          font-size: 1.85rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }
        .login-header p {
          color: #8E8A85;
          font-size: 0.88rem;
        }
        .login-badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: rgba(139,0,0,0.15);
          color: var(--color-primary);
          border-radius: 50%;
          border: 1px solid rgba(139,0,0,0.3);
          box-shadow: 0 0 15px rgba(139,0,0,0.2);
        }
        .login-error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220,53,69,0.1);
          border: 1px solid rgba(220,53,69,0.25);
          color: #EF4444;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .login-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .login-input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #D3CFC9;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .input-with-icon {
          position: relative;
          width: 100%;
        }
        .input-field-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #555555;
          pointer-events: none;
        }
        .login-input-group input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          background: rgba(0,0,0,0.4);
          border: 1px solid #333333;
          border-radius: 8px;
          outline: none;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: all 0.3s;
        }
        .login-input-group input:focus {
          border-color: var(--color-primary);
          background: rgba(0,0,0,0.6);
          box-shadow: 0 0 10px rgba(139,0,0,0.15);
        }
        .login-submit-btn {
          margin-top: 0.5rem;
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        .login-footer {
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 1.25rem;
        }
        .login-footer p {
          font-size: 0.75rem;
          color: #555555;
        }
      `}</style>
    </div>
  );
}
