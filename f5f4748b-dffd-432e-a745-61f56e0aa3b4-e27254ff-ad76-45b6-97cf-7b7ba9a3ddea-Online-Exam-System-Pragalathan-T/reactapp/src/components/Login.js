import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import './Login.css';

export default function Login() {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({});
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		
		// Clear field error when user starts typing
		if (fieldErrors[name]) {
			setFieldErrors(prev => ({
				...prev,
				[name]: null
			}));
		}
	};

	const validateForm = () => {
		const errors = {};
		
		if (!formData.username.trim()) {
			errors.username = 'Username is required';
		}
		
		if (!formData.password.trim()) {
			errors.password = 'Password is required';
		}
		
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		
		try {
			const res = await api.login(formData);
			localStorage.setItem('token', res.data.token || 'dummy-token');
			localStorage.setItem('username', res.data.username || formData.username);
			const role = res.data.role || 'STUDENT';
			localStorage.setItem('role', role);
			
			// Dispatch custom event for role change
			window.dispatchEvent(new Event('roleChanged'));
			
			const dest = role === 'ADMIN' ? '/admin/exam-management' : 
						  role === 'TEACHER' ? '/teacher-dashboard' : 
						  '/student-exams';
			navigate(dest);
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-header">
					<h1 className="auth-title">Welcome Back</h1>
					<p className="auth-subtitle">Sign in to your account to continue</p>
				</div>

				<form onSubmit={onSubmit} className="auth-form">
					<div className="form-group">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							className={`form-input ${fieldErrors.username ? 'form-input--error' : ''}`}
							placeholder="Enter your username"
							value={formData.username}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.username && (
							<span className="form-error">{fieldErrors.username}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
							placeholder="Enter your password"
							value={formData.password}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.password && (
							<span className="form-error">{fieldErrors.password}</span>
						)}
					</div>

					{error && (
						<div className="auth-error">
							<span className="auth-error-icon">⚠️</span>
							<span>{error}</span>
						</div>
					)}

					<button 
						type="submit" 
						className="auth-button"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<span className="loading"></span>
								Signing in...
							</>
						) : (
							'Sign In'
						)}
					</button>
				</form>

				<div className="auth-footer">
					<p className="auth-footer-text">
						Don't have an account?{' '}
						<Link to="/register" className="auth-link">
							Create one here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
