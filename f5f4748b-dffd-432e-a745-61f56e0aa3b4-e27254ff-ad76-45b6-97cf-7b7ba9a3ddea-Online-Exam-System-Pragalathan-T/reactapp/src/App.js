import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ExamCreator from './components/ExamCreator';
import ExamResults from './components/ExamResults';
import ExamInterface from './components/ExamInterface';
import StudentExamList from './components/StudentExamList';
import TeacherDashboard from './components/TeacherDashboard';

function App() {
return (
<Router>
  <nav>
    <ul>
        <li><Link to="/teacher-dashboard">Teacher Dashboard</Link></li>
            <li><Link to="/create-exam">Create Exam</Link></li>
                <li><Link to="/student-exams">Student Exams</Link></li>
                  </ul>
                    </nav>

                      <Routes>
                        <Route path="/create-exam" element={<ExamCreator />} />
                          <Route path="/exam-results/:studentExamId" element={<ExamResults />} />
                            <Route path="/exam/:studentExamId" element={<ExamInterface />} />
                              <Route path="/student-exams" element={<StudentExamList />} />
                                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                                  {/* Default route */}
                                  <Route path="/" element={<TeacherDashboard />} />
                                  </Routes>
                                  </Router>
                                  );
                                  }

                                  export default App;