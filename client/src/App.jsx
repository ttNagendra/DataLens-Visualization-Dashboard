import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// In production, VITE_API_URL is your Render backend URL.
// In dev, it's empty so the Vite proxy handles /api/* calls.
if (import.meta.env.VITE_API_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Sidebar from './components/Sidebar';
import KPICards from './components/KPICards';
// Standard charts
import IntensityChart from './components/charts/IntensityChart';
import LikelihoodChart from './components/charts/LikelihoodChart';
import RelevanceChart from './components/charts/RelevanceChart';
import YearChart from './components/charts/YearChart';
import CountryChart from './components/charts/CountryChart';
import SourceChart from './components/charts/SourceChart';
import SectorChart from './components/charts/SectorChart';
// Unique visualizations
import IntensityGauge from './components/charts/IntensityGauge';
import TopicsTreemap from './components/charts/TopicsTreemap';
import RegionHeatmap from './components/charts/RegionHeatmap';
import StackedAreaChart from './components/charts/StackedAreaChart';
import PestleScatter from './components/charts/PestleScatter';

// ─── Theme helpers ──────────────────────────────
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode) {
    const resolved = mode === 'system' ? getSystemTheme() : mode;
    document.documentElement.setAttribute('data-theme', resolved);
}

function App() {
    // Auth
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('dashboard_auth');
        return stored ? JSON.parse(stored) : null;
    });
    const [authPage, setAuthPage] = useState('login');

    // Theme
    const [themeMode, setThemeMode] = useState(() => localStorage.getItem('dashboard_theme') || 'light');

    // Sidebar
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Data
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        applyTheme(themeMode);
        localStorage.setItem('dashboard_theme', themeMode);
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => { if (themeMode === 'system') applyTheme('system'); };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [themeMode]);

    useEffect(() => {
        if (!user) return;
        axios.get('/api/filters')
            .then(res => setFilterOptions(res.data))
            .catch(err => console.error('Error fetching filters:', err));
    }, [user]);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const params = {};
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== '') params[key] = value;
            });
            const res = await axios.get('/api/data', { params });
            setData(res.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, [filters, user]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
    const clearFilters = () => setFilters({});
    const activeFilterCount = Object.values(filters).filter(v => v && v !== '').length;

    const handleLogin = (u) => { setUser(u); setAuthPage('login'); };
    const handleLogout = () => { localStorage.removeItem('dashboard_auth'); setUser(null); };

    // Auth pages
    if (!user) {
        if (authPage === 'signup') {
            return <SignupPage onSignup={handleLogin} onSwitchToLogin={() => setAuthPage('login')} />;
        }
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthPage('signup')} />;
    }

    // Loading state
    if (loading && data.length === 0) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
                activeCount={activeFilterCount}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(c => !c)}
            />

            <main className="main-content">
                {/* Top Navbar */}
                <div className="top-navbar">
                    <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(c => !c)} title="Toggle sidebar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <div className="navbar-right">
                        <div className="theme-switcher">
                            <button className={`theme-btn ${themeMode === 'light' ? 'active' : ''}`} onClick={() => setThemeMode('light')} title="Light">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                            </button>
                            <button className={`theme-btn ${themeMode === 'dark' ? 'active' : ''}`} onClick={() => setThemeMode('dark')} title="Dark">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            </button>
                            <button className={`theme-btn ${themeMode === 'system' ? 'active' : ''}`} onClick={() => setThemeMode('system')} title="System">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                            </button>
                        </div>
                        <div className="user-menu">
                            <div className="user-avatar">{user.name ? user.name[0].toUpperCase() : '?'}</div>
                            <div className="user-info">
                                <span className="user-name">{user.name || user.email}</span>
                                <span className="user-role">Admin</span>
                            </div>
                            <button className="logout-btn" onClick={handleLogout} title="Logout">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-header">
                    <div>
                        <div className="dashboard-header-eyebrow">Blackcoffer Intelligence</div>
                        <h2>Analytics Dashboard</h2>
                        <p>
                            Exploring {data.length.toLocaleString()} insights
                            {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active`}
                        </p>
                    </div>
                    <div className="dashboard-live-badge">
                        <span className="live-dot"></span>
                        Live Data
                    </div>
                </div>

                <KPICards data={data} />

                <div className="charts-grid">
                    {/* Row 1: Gauge + Intensity Bar (unique combo) */}
                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Intensity Gauge</h3>
                                <p className="chart-subtitle">Overall average intensity meter</p>
                            </div>
                            <span className="chart-badge badge-unique">Unique</span>
                        </div>
                        <div className="chart-wrapper"><IntensityGauge data={data} /></div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Intensity by Sector</h3>
                                <p className="chart-subtitle">Average intensity across sectors</p>
                            </div>
                            <span className="chart-badge">Sectors</span>
                        </div>
                        <div className="chart-wrapper"><IntensityChart data={data} /></div>
                    </div>

                    {/* Row 2: Region Heatmap (wide — unique) */}
                    <div className="chart-card wide">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Region × Sector Heatmap</h3>
                                <p className="chart-subtitle">Data density across regions and sectors</p>
                            </div>
                            <span className="chart-badge badge-unique">Heatmap</span>
                        </div>
                        <div className="chart-wrapper"><RegionHeatmap data={data} /></div>
                    </div>

                    {/* Row 3: Topics Treemap + Likelihood Radar */}
                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Topics Treemap</h3>
                                <p className="chart-subtitle">Topic distribution as proportional areas</p>
                            </div>
                            <span className="chart-badge badge-unique">Treemap</span>
                        </div>
                        <div className="chart-wrapper"><TopicsTreemap data={data} /></div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Likelihood by Region</h3>
                                <p className="chart-subtitle">Regional likelihood distribution</p>
                            </div>
                            <span className="chart-badge">Regions</span>
                        </div>
                        <div className="chart-wrapper"><LikelihoodChart data={data} /></div>
                    </div>

                    {/* Row 4: Stacked Area (wide — unique) */}
                    <div className="chart-card wide">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Topics Over Time</h3>
                                <p className="chart-subtitle">How top topics trend across years — stacked area</p>
                            </div>
                            <span className="chart-badge badge-unique">Stacked</span>
                        </div>
                        <div className="chart-wrapper"><StackedAreaChart data={data} /></div>
                    </div>

                    {/* Row 5: PESTLE Scatter + Relevance Bubble */}
                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>PESTLE Scatter</h3>
                                <p className="chart-subtitle">Intensity vs Relevance by PESTLE, unique shapes</p>
                            </div>
                            <span className="chart-badge badge-unique">Shapes</span>
                        </div>
                        <div className="chart-wrapper"><PestleScatter data={data} /></div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Relevance vs Likelihood</h3>
                                <p className="chart-subtitle">Bubble size represents intensity</p>
                            </div>
                            <span className="chart-badge">Analysis</span>
                        </div>
                        <div className="chart-wrapper"><RelevanceChart data={data} /></div>
                    </div>

                    {/* Row 6: Year Line (wide) */}
                    <div className="chart-card wide">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Records by Year</h3>
                                <p className="chart-subtitle">Data points distribution across end years</p>
                            </div>
                            <span className="chart-badge">Timeline</span>
                        </div>
                        <div className="chart-wrapper"><YearChart data={data} /></div>
                    </div>

                    {/* Row 7: Country + Sources */}
                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Top Countries</h3>
                                <p className="chart-subtitle">Countries with most data points</p>
                            </div>
                            <span className="chart-badge">Countries</span>
                        </div>
                        <div className="chart-wrapper"><CountryChart data={data} /></div>
                    </div>

                    <div className="chart-card">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Top Sources</h3>
                                <p className="chart-subtitle">Most referenced data sources</p>
                            </div>
                            <span className="chart-badge">Sources</span>
                        </div>
                        <div className="chart-wrapper"><SourceChart data={data} /></div>
                    </div>

                    {/* Row 8: Sector Distribution (wide) */}
                    <div className="chart-card wide">
                        <div className="chart-card-header">
                            <div className="chart-title-group">
                                <h3>Sector Distribution</h3>
                                <p className="chart-subtitle">Record count and average intensity by sector</p>
                            </div>
                            <span className="chart-badge">Overview</span>
                        </div>
                        <div className="chart-wrapper"><SectorChart data={data} /></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
