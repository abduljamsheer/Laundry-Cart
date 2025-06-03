import React, { useEffect, useRef, useState } from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from '../AuthOPration';
export function LoginHeader() {

    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.popup-menu') && !e.target.closest('.kebab-menu')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);
    return <nav className="navbar">
        <div className="navbar-logo">LAUNDRY</div>
        <div className="navbar-links">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Career</a>
            <a href="#" className="nav-link sign-in-btn">Sign In</a>
        </div>
        <div className="kebab-menu" onClick={() => setMenuOpen(!menuOpen)}>
            ⋮
        </div>
        {menuOpen && (
            <div className="popup-menu">
                <a href="#" className="popup-link">Home</a>
                <a href="#" className="popup-link">Services</a>
                <a href="#" className="popup-link">Contact</a>
                <button className="sign-in-btn popup-btn">Sign In</button>
            </div>
        )}
    </nav>
}
export const Footer = () => {
    return (
        <>
            <div className="footer-referral">
                <p className='footer-text'> Now Refer & Earn €500 for every referral* </p>

                <span>* Terms and conditions will be applied</span>
            </div>
            <div className="footer">
                <div className="footer-column">
                    <h3>ABOUT US</h3>
                    <span>Doorstep Wash & Dryclean Service</span>
                </div>
                <div className="footer-column">
                    <a href="#">Home</a>
                    <a href="#">Sign in</a>
                    <a href="#">Register</a>
                </div>
                <div className="footer-column">
                    <a href="#">Pricing</a>

                </div>
                <div className="footer-column">
                    <a href="#">Career</a>
                    <a href="#">Blogs</a>
                    <a href="#">Create</a>
                </div>
                <div className="footer-column">
                    <a href="#">Contact</a>
                </div>
                <div className="footer-column">
                    <h3>SOCIAL MEDIA</h3>
                    <div className="social-icons" alt='simple/svg'>
                        <img src='images/facebook.svg' alt='simple/svg' />
                        <img src='images/instagram.svg' alt='simple/svg' />
                        <img src='images/linkedin.svg' alt='simple/svg' />
                    </div>
                </div>

            </div>
            <div className="create-footer">
                2025 © Laundry
            </div>
        </>
    );
};
const MainSection = () => {
    const navigate = useNavigate()
    return (
        <div className="main-container">
            <div className="service-info">
                <h1 className="service-title">Laundry Service</h1>
                <p className="service-subtitle">Doorstep Wash & Dryclean Service</p>
                <div >
                    <p className="account-prompt">Don't Have An Account?</p>
                    <button className="register-button" onClick={() => {
                        navigate('/signup')
                    }}>Register</button>
                </div>
            </div>
            <SignInForm />
        </div>
    );
};
const SignInForm = () => {
    const URL = 'https://laundry-server-b7j6.onrender.com' || 'http://localhost:8000';
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        contact: '',
        password: ''
    });
    const inputRef = useRef(null)
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toggleVisibility = () => {
        setPasswordVisible(prev => !prev);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!formData.contact) {
            setError('Email or Mobile is required');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSignIn = () => {
        if (!validateForm()) return;
        setIsLoading(true);
        setError('');
        setSuccess('');
        setIsLoading(false);
        fetch(`${URL}/api/v1/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).
            then((data) => {
                if (data.status === "Failed") {
                    setError(data.message);
                } else if (data.status === "Success" && data.token) {
                    setToken("token", data.token);
                    setSuccess('Login successful!');
                    navigate("/create");
                } else {
                    setError("Unexpected response from server.");
                }
            }).catch((error) => {
                setError(error.message)
            })


    };

    return (
        <div className="right-section">
            <h2>SIGN IN</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
            }}>
                <input
                    type="text"
                    name="contact"
                    placeholder="Mobile / Email"
                    value={formData.contact}
                    autoComplete="username"
                    onChange={handleInputChange}
                />
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    ref={inputRef}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <img className='lock-icon' src='images/padlock.svg' placeholder='padlockimg/svg' onClick={toggleVisibility} />
                <label className="forgot-password"><a href="#" onClick={() => {
                    navigate('/reset-password')
                }}>Forget Password?</a></label>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <div className='btn-head'>

                    <button
                        className="signin-btn"
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>
    );
};


function Login() {
    return (
        <div className='login'>
            <LoginHeader />
            <MainSection />
            <Footer />
        </div>
    )
}

export default Login