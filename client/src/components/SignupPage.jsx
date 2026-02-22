import { useState } from 'react';

function SignupPage({ onSignup, onSwitchToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('dashboard_users') || '[]');
            if (users.find(u => u.email === email)) {
                setError('An account with this email already exists');
                setLoading(false);
                return;
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('dashboard_users', JSON.stringify(users));
            localStorage.setItem('dashboard_auth', JSON.stringify({ email, name }));
            onSignup(newUser);
            setLoading(false);
        }, 600);
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
                        <p className="auth-tagline">Blackcoffer Data Visualization Dashboard</p>
                        <p className="auth-desc">Join Blackcoffer to explore 1000+ global insights with powerful analytics, interactive charts, and real-time filtering.</p>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-form-wrapper">
                        <h2>Adventure starts here 🚀</h2>
                        <p className="auth-subtitle">Make data exploration easy and powerful!</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="signup-name">Full Name</label>
                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoComplete="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-email">Email</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    placeholder="············"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signup-confirm">Confirm Password</label>
                                <input
                                    id="signup-confirm"
                                    type="password"
                                    placeholder="············"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </div>

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? 'Creating account...' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="auth-switch">
                            Already have an account?{' '}
                            <button type="button" onClick={onSwitchToLogin}>Sign in instead</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
