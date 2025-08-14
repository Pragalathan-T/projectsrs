import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar({ role = 'STUDENT' }) {
	return (
		<nav className="nav">
			<div className="nav__brand">Online Exam</div>
			<ul className="nav__links">
				{role === 'TEACHER' && (
					<>
						<li><Link to="/teacher-dashboard">Dashboard</Link></li>
						<li><Link to="/create-exam">Create Exam</Link></li>
					</>
				)}
				{role === 'STUDENT' && (
					<>
						<li><Link to="/student-exams">Exams</Link></li>
						<li><Link to="/history">History</Link></li>
					</>
				)}
				{role === 'ADMIN' && (
					<li><Link to="/admin/users">Users</Link></li>
				)}
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
}
