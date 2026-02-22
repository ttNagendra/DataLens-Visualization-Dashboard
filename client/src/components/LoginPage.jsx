import { useState, useEffect } from 'react';

const DEMO_EMAIL = 'demo@blackcoffer.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = 'Demo User';

function LoginPage({ onLogin, onSwitchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Seed demo user on first load
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('dashboard_users') || '[]');
        if (!users.find(u => u.email === DEMO_EMAIL)) {
            users.push({ name: DEMO_NAME, email: DEMO_EMAIL, password: DEMO_PASSWORD });
            localStorage.setItem('dashboard_users', JSON.stringify(users));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('dashboard_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('dashboard_auth', JSON.stringify({ email: user.email, name: user.name }));
                onLogin(user);
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 600);
    };

    const handleDemoLogin = () => {
        setEmail(DEMO_EMAIL);
        setPassword(DEMO_PASSWORD);
        setError('');
        setLoading(true);
        setTimeout(() => {
            const demoUser = { name: DEMO_NAME, email: DEMO_EMAIL };
            localStorage.setItem('dashboard_auth', JSON.stringify(demoUser));
            onLogin(demoUser);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-illustration">
                        <div className="auth-shapes">
                            <div className="shape shape-1"></div>
                            <div className="shape shape-2"></div>
                            <div className="shape shape-3"></div>
                            <div className="shape shape-4"></div>
                        </div>
                        <div className="auth-brand">
                            <div className="auth-brand-icon">B</div>
                            <h1>Blackcoffer</h1>
                        </div>
                        <p className="auth-tagline">Data Visualization Dashboard</p>
                        <p className="auth-desc">High-impact consulting insights powered by advanced analytics, interactive charts, and real-time data exploration.</p>


                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-form-wrapper">
                        <h2>Welcome Back! 👋</h2>
                        <p className="auth-subtitle">Please sign-in to your account to explore the dashboard</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="login-email">Email</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="············"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? (
                                    <span className="btn-loading">
                                        <span className="spinner"></span>
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <button type="button" className="demo-login-btn" onClick={handleDemoLogin} disabled={loading}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Try Demo Account
                        </button>

                        <div className="demo-credentials">
                            <p className="demo-credentials-title">Demo Credentials</p>
                            <div className="demo-credential-row">
                                <span className="demo-label">Email:</span>
                                <code>{DEMO_EMAIL}</code>
                            </div>
                            <div className="demo-credential-row">
                                <span className="demo-label">Password:</span>
                                <code>{DEMO_PASSWORD}</code>
                            </div>
                        </div>

                        <p className="auth-switch">
                            New on our platform?{' '}
                            <button type="button" onClick={onSwitchToSignup}>Create an account</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
