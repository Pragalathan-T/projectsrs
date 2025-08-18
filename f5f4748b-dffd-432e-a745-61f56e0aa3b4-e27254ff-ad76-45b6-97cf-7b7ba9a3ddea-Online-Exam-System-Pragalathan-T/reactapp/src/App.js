import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ExamCreator from './components/ExamCreator';
import ExamResults from './components/ExamResults';
import ExamInterface from './components/ExamInterface';
import StudentExamList from './components/StudentExamList';
import TeacherDashboard from './components/TeacherDashboard';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AttemptHistory from './components/AttemptHistory';
import AdminUsers from './components/AdminUsers';
import ExamDetails from './components/ExamDetails';
import NotFound from './components/NotFound';
import QuestionsAdmin from './components/QuestionsAdmin';
import ExamManagement from './components/ExamManagement';
import LandingPage from './components/LandingPage';

// App Styles
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('STUDENT');

  // Update user role when localStorage changes
  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem('role') || 'STUDENT';
      setUserRole(role);
    };

    // Initial role check
    updateRole();

    // Listen for storage changes (when user logs in/out)
    window.addEventListener('storage', updateRole);
    
    // Custom event for role changes within the same tab
    window.addEventListener('roleChanged', updateRole);

    return () => {
      window.removeEventListener('storage', updateRole);
      window.removeEventListener('roleChanged', updateRole);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBar role={userRole} />
        <main className="app__main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - Teacher */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard teacherUsername={localStorage.getItem('username')} />} />
            <Route path="/create-exam" element={<ExamCreator />} />
            
            {/* Protected Routes - Student */}
            <Route path="/student-exams" element={<StudentExamList />} />
            <Route path="/history" element={<AttemptHistory />} />
            <Route path="/exam/:studentExamId" element={<ExamInterface />} />
            <Route path="/exam-results/:studentExamId" element={<ExamResults />} />
            
            {/* Protected Routes - Admin */}
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/questions" element={<QuestionsAdmin />} />
            <Route path="/admin/exam-management" element={<ExamManagement />} />
            
            {/* Shared Protected Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/exam-details" element={<ExamDetails />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;