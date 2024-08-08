import React, { useState } from 'react';
import Modal from 'react-modal';
import { login, register } from '../services/auth';
import '../styles/AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    isLogin: boolean;
    toggleForm: () => void;
    setUser: (user: { name: string } | null) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onRequestClose, isLogin, toggleForm, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await login(email, password);
            setUser(response?.user);
            onRequestClose();
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await register(name, email, password);
            setUser(response?.user);
            onRequestClose();
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={isLogin ? 'Login Form' : 'Signup Form'}
            className="auth-modal"
            overlayClassName="auth-modal-overlay"
        >
            <div className="modal-header">
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <button onClick={onRequestClose} className="close-button">&times;</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <form className="auth-form" onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <div className="toggle-form">
                {isLogin ? (
                    <p>
                        Don't have an account? <button onClick={toggleForm}>Sign Up</button>
                    </p>
                ) : (
                    <p>
                        Already have an account? <button onClick={toggleForm}>Login</button>
                    </p>
                )}
            </div>
        </Modal>
    );
};

Modal.setAppElement('#root');

export default AuthModal;
