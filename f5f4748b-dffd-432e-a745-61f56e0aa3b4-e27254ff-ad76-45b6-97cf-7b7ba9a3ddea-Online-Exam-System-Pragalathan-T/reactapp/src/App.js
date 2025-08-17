import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ExamCreator from './components/ExamCreator';
import ExamResults from './components/ExamResults';
import ExamInterface from './components/ExamInterface';
import StudentExamList from './components/StudentExamList';
import TeacherDashboard from './components/TeacherDashboard';
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
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import MainLayout from './layouts/MainLayout';
import RoleGuard from './routes/RoleGuard';
import Sidebar from './components/Sidebar';

function AdminDashboard() {
  const username = localStorage.getItem('username') || 'Admin';
  return (
    <div style={{ display:'flex' }}>
      <Sidebar role="ADMIN" />
      <div style={{ flex:1, padding:16 }}>
        <h1>Welcome, {username} (ADMIN)</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          <a className="card" href="/admin/exam-management"><div className="card__title">Manage Exams</div></a>
          <a className="card" href="/admin/users"><div className="card__title">Manage Users</div></a>
          <a className="card" href="/admin/questions"><div className="card__title">Manage Questions</div></a>
          <a className="card" href="/history"><div className="card__title">View Results</div></a>
        </div>
      </div>
    </div>
  );
}

function TeacherHome() {
  const username = localStorage.getItem('username') || 'Teacher';
  return (
    <div style={{ display:'flex' }}>
      <Sidebar role="TEACHER" />
      <div style={{ flex:1, padding:16 }}>
        <h1>Welcome, {username} (TEACHER)</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          <a className="card" href="/create-exam"><div className="card__title">Create Exam</div></a>
          <a className="card" href="/admin/exam-management"><div className="card__title">Manage Exams</div></a>
          <a className="card" href="/history"><div className="card__title">Manage Results</div></a>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const username = localStorage.getItem('username') || 'Student';
  return (
    <div style={{ display:'flex' }}>
      <Sidebar role="STUDENT" />
      <div style={{ flex:1, padding:16 }}>
        <h1>Welcome, {username} (STUDENT)</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          <a className="card" href="/student-exams"><div className="card__title">Exam List</div></a>
          <a className="card" href="/history"><div className="card__title">Attempt History</div></a>
          <a className="card" href="/history"><div className="card__title">Results</div></a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin/dashboard" element={
          <RoleGuard roles={["ADMIN"]}>
            <AdminDashboard />
          </RoleGuard>
        } />
        <Route path="/teacher/dashboard" element={
          <RoleGuard roles={["TEACHER"]}>
            <TeacherHome />
          </RoleGuard>
        } />
        <Route path="/student/dashboard" element={
          <RoleGuard roles={["STUDENT"]}>
            <StudentDashboard />
          </RoleGuard>
        } />

        <Route path="/create-exam" element={
          <RoleGuard roles={["TEACHER"]}>
            <ExamCreator />
          </RoleGuard>
        } />
        <Route path="/admin/questions" element={
          <RoleGuard roles={["ADMIN"]}>
            <QuestionsAdmin />
          </RoleGuard>
        } />
        <Route path="/admin/exam-management" element={
          <RoleGuard roles={["ADMIN", "TEACHER"]}>
            <ExamManagement />
          </RoleGuard>
        } />
        <Route path="/admin/users" element={
          <RoleGuard roles={["ADMIN"]}>
            <AdminUsers />
          </RoleGuard>
        } />

        <Route path="/student-exams" element={
          <RoleGuard roles={["STUDENT"]}>
            <StudentExamList />
          </RoleGuard>
        } />
        <Route path="/history" element={
          <RoleGuard roles={["STUDENT", "TEACHER", "ADMIN"]}>
            <AttemptHistory />
          </RoleGuard>
        } />

        <Route path="/exam-results/:studentExamId" element={
          <RoleGuard roles={["STUDENT", "TEACHER", "ADMIN"]}>
            <ExamResults />
          </RoleGuard>
        } />
        <Route path="/exam/:studentExamId" element={
          <RoleGuard roles={["STUDENT"]}>
            <ExamInterface />
          </RoleGuard>
        } />
        <Route path="/exam-details" element={<ExamDetails />} />

        <Route path="/teacher-dashboard" element={<Navigate to="/teacher/dashboard" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
export default App;