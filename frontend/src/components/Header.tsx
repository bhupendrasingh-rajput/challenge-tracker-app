import { useEffect, useState } from 'react';
import { FaFirefoxBrowser } from "react-icons/fa";
import '../styles/Header.css';
import AuthModal from './AuthModal';

const Header = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const openModal = (login: boolean) => {
        setIsLogin(login);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        window.dispatchEvent(new Event('storage'));
    };

    const updateUser = () => {
        const userData = localStorage.getItem('user');
        if (userData) { setUser(JSON.parse(userData)) }
        else { setUser(null) }
    };

    useEffect(() => {
        updateUser();
        window.addEventListener('storage', updateUser);
        return () => { window.removeEventListener('storage', updateUser); };
    }, []);

    return (
        <div className='header'>
            <div className="brand"><FaFirefoxBrowser /></div>
            <div className="nav">
                <a href="#home">Home</a>
                <a href="#challenges">Challenges</a>
                <a href="#features">Features</a>
                <a href="#stories">Stories</a>
            </div>
            {user ? (
                <div className="auth">
                    <div className="authName">{user.name}</div>
                    <div className="authbtn" onClick={handleLogout}>Logout</div>
                </div>
            ) : (
                <div className="auth">
                    <div className="authbtn" onClick={() => openModal(true)}>Login</div>
                    <div className="authbtn" onClick={() => openModal(false)}>Register</div>
                </div>
            )}

            <AuthModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                isLogin={isLogin}
                toggleForm={toggleForm}
                setUser={setUser}
            />
        </div>
    );
};

export default Header;
