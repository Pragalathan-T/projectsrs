import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ padding: 24, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
      <h1 style={{ marginBottom: 8 }}>Online Exam Portal</h1>
      <p style={{ marginBottom: 16, color: '#6b7280', maxWidth: 640 }}>
        Welcome to the unified platform for managing and taking exams. Teachers create exams, students attempt them, and admins oversee operations.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="button button-primary" to="/login">Login</Link>
        <Link className="button" to="/register">Register</Link>
      </div>
    </div>
  );
}