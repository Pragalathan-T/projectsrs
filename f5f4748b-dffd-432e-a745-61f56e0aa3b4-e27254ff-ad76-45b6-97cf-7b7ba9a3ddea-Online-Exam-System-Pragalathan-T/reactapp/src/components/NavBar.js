import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import './NavBar.css';

export default function NavBar({ role = 'STUDENT' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');
  }, [location]);

  const logout = async () => {
    try { 
      await api.logout(); 
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'TEACHER': return 'Teacher';
      case 'ADMIN': return 'Admin';
      case 'STUDENT': return 'Student';
      default: return 'Guest';
    }
  };

  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__brand">
          <Link to="/" className="nav__brand-link">
            <span className="nav__brand-icon">🎓</span>
            <span className="nav__brand-text">Online Exam</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`nav__toggle ${isMenuOpen ? 'nav__toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav__menu ${isMenuOpen ? 'nav__menu--open' : ''}`}>
          <ul className="nav__links">
            {/* Public Links */}
            {!isLoggedIn && (
              <>
                <li><Link to="/about" className={isActiveLink('/about') ? 'nav__link--active' : ''} onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" className={isActiveLink('/contact') ? 'nav__link--active' : ''} onClick={closeMenu}>Contact</Link></li>
                <li><Link to="/help" className={isActiveLink('/help') ? 'nav__link--active' : ''} onClick={closeMenu}>Help</Link></li>
              </>
            )}

            {/* Role-specific Links */}
            {isLoggedIn && role === 'TEACHER' && (
              <>
                <li><Link to="/teacher-dashboard" className={isActiveLink('/teacher-dashboard') ? 'nav__link--active' : ''} onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/create-exam" className={isActiveLink('/create-exam') ? 'nav__link--active' : ''} onClick={closeMenu}>Create Exam</Link></li>
              </>
            )}
            
            {isLoggedIn && role === 'STUDENT' && (
              <>
                <li><Link to="/student-exams" className={isActiveLink('/student-exams') ? 'nav__link--active' : ''} onClick={closeMenu}>My Exams</Link></li>
                <li><Link to="/history" className={isActiveLink('/history') ? 'nav__link--active' : ''} onClick={closeMenu}>History</Link></li>
              </>
            )}
            
            {isLoggedIn && role === 'ADMIN' && (
              <>
                <li><Link to="/admin/users" className={isActiveLink('/admin/users') ? 'nav__link--active' : ''} onClick={closeMenu}>Users</Link></li>
                <li><Link to="/admin/questions" className={isActiveLink('/admin/questions') ? 'nav__link--active' : ''} onClick={closeMenu}>Questions</Link></li>
                <li><Link to="/admin/exam-management" className={isActiveLink('/admin/exam-management') ? 'nav__link--active' : ''} onClick={closeMenu}>Exams</Link></li>
              </>
            )}
          </ul>

          {/* User Section */}
          <div className="nav__user">
            {isLoggedIn ? (
              <>
                <div className="nav__user-info">
                  <span className="nav__user-role">{getRoleDisplayName(role)}</span>
                  <span className="nav__username">{username}</span>
                </div>
                <div className="nav__user-actions">
                  <Link to="/profile" className={`nav__user-link ${isActiveLink('/profile') ? 'nav__link--active' : ''}`} onClick={closeMenu}>
                    Profile
                  </Link>
                  <button className="nav__logout" onClick={logout}>
                    <span className="nav__logout-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="nav__auth-actions">
                <Link to="/login" className={`nav__auth-link ${isActiveLink('/login') ? 'nav__link--active' : ''}`} onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className={`nav__auth-link nav__auth-link--primary ${isActiveLink('/register') ? 'nav__link--active' : ''}`} onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && <div className="nav__overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
}