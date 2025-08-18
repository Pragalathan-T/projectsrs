import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Online Exam System</h1>
          <p className="hero__subtitle">
            Modern, secure, and user-friendly platform for creating, managing, and taking online examinations
          </p>
          <div className="hero__actions">
            <Link to="/login" className="btn btn--primary btn--large">
              Get Started
            </Link>
            <Link to="/register" className="btn btn--secondary btn--large">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-icon">📋</div>
            <h3>Create Exams</h3>
            <p>Design comprehensive assessments with multiple question types</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="features__title">Why Choose Our Platform?</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">👨‍🏫</div>
              <h3 className="feature-card__title">For Teachers</h3>
              <p className="feature-card__description">
                Create and manage exams, track student progress, and analyze results with powerful analytics
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">👨‍🎓</div>
              <h3 className="feature-card__title">For Students</h3>
              <p className="feature-card__description">
                Take exams seamlessly, view results instantly, and track your academic progress over time
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">👨‍💼</div>
              <h3 className="feature-card__title">For Administrators</h3>
              <p className="feature-card__description">
                Manage users, oversee exam processes, and maintain system integrity with comprehensive controls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stat">
              <div className="stat__number">1000+</div>
              <div className="stat__label">Exams Created</div>
            </div>
            <div className="stat">
              <div className="stat__number">5000+</div>
              <div className="stat__label">Students Served</div>
            </div>
            <div className="stat">
              <div className="stat__number">99.9%</div>
              <div className="stat__label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat__number">24/7</div>
              <div className="stat__label">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}