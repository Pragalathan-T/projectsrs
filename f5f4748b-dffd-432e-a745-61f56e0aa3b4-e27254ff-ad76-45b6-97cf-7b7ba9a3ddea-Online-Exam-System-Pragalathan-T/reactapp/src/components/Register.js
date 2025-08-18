import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Register.css';

export default function Register() {
	const [formData, setFormData] = useState({ 
		name: '', 
		email: '', 
		username: '', 
		password: '', 
		confirmPassword: '',
		role: 'STUDENT' 
	});
	const [successMsg, setSuccessMsg] = useState(null);
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
		
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		}
		
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Please enter a valid email';
		}
		
		if (!formData.username.trim()) {
			errors.username = 'Username is required';
		} else if (formData.username.length < 3) {
			errors.username = 'Username must be at least 3 characters';
		}
		
		if (!formData.password.trim()) {
			errors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}
		
		if (!formData.confirmPassword.trim()) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}
		
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMsg(null);
		
		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		
		try {
			const { confirmPassword, ...registrationData } = formData;
			await api.register(registrationData);
			setSuccessMsg('Registration successful! You can now log in.');
			
			// Redirect to login after 2 seconds
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-header">
					<h1 className="auth-title">Create Account</h1>
					<p className="auth-subtitle">Join our platform to get started</p>
				</div>

				<form onSubmit={onSubmit} className="auth-form">
					<div className="form-group">
						<label htmlFor="name" className="form-label">
							Full Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							className={`form-input ${fieldErrors.name ? 'form-input--error' : ''}`}
							placeholder="Enter your full name"
							value={formData.name}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.name && (
							<span className="form-error">{fieldErrors.name}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="email" className="form-label">
							Email Address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
							placeholder="Enter your email address"
							value={formData.email}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.email && (
							<span className="form-error">{fieldErrors.email}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							className={`form-input ${fieldErrors.username ? 'form-input--error' : ''}`}
							placeholder="Choose a username"
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
							placeholder="Create a password"
							value={formData.password}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.password && (
							<span className="form-error">{fieldErrors.password}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword" className="form-label">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							className={`form-input ${fieldErrors.confirmPassword ? 'form-input--error' : ''}`}
							placeholder="Confirm your password"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							disabled={isLoading}
						/>
						{fieldErrors.confirmPassword && (
							<span className="form-error">{fieldErrors.confirmPassword}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="role" className="form-label">
							Account Type
						</label>
						<select
							id="role"
							name="role"
							className="form-input"
							value={formData.role}
							onChange={handleInputChange}
							disabled={isLoading}
						>
							<option value="STUDENT">Student</option>
							<option value="TEACHER">Teacher</option>
							<option value="ADMIN">Administrator</option>
						</select>
					</div>

					{successMsg && (
						<div className="auth-success">
							<span className="auth-success-icon">✅</span>
							<span>{successMsg}</span>
						</div>
					)}

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
								Creating Account...
							</>
						) : (
							'Create Account'
						)}
					</button>
				</form>

				<div className="auth-footer">
					<p className="auth-footer-text">
						Already have an account?{' '}
						<Link to="/login" className="auth-link">
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
