import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  const handleSSOLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img 
          src="/rit-logo.png" 
          alt="RIT Logo" 
          className="rit-logo"
        />
        <h1 className="app-title">myRIT</h1>
        <p className="app-subtitle">Your Academic Hub</p>
      </div>

      <div className="progress-indicator">
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      <div className="login-card">
        <h2 className="welcome-text">Welcome Back</h2>
        <p className="welcome-description">
          Sign in to access your courses, grades, and campus community
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="student@rit.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <a href="#forgot" className="forgot-password">
            Forgot Password?
          </a>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <span>→</span>}
          </button>
        </form>

        <div className="divider">or</div>

        <button 
          type="button" 
          className="btn-secondary"
          onClick={handleSSOLogin}
          disabled={isLoading}
        >
          Sign in with RIT SSO
        </button>

        <div className="login-footer">
          Don't have an account? <a href="#contact" className="contact-link">Contact IT</a>
        </div>
      </div>
    </div>
  );
}