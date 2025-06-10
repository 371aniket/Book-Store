import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8010/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            // Store the token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Force a page reload to update the authentication state
            window.location.href = '/';
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '40px auto',
                padding: '30px',
                background: 'linear-gradient(135deg, #d0e2ff, #e6ccff)',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
        >
            <h2 className="text-center" style={{ color: '#2c3e50', marginBottom: '20px' }}>
                ✨ Register
            </h2>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label><strong>Username:</strong></label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <div>
                    <label><strong>Email:</strong></label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <div>
                    <label><strong>Password:</strong></label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <div>
                    <label><strong>Confirm Password:</strong></label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        padding: '10px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        marginTop: '10px'
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register; 