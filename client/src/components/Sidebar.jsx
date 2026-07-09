function Sidebar({ filterOptions, filters, onFilterChange, onClear, activeCount, collapsed, onToggle }) {
    const filterFields = [
        { key: 'end_year', label: 'End Year', options: filterOptions.endYears },
        { key: 'topic', label: 'Topic', options: filterOptions.topics },
        { key: 'sector', label: 'Sector', options: filterOptions.sectors },
        { key: 'region', label: 'Region', options: filterOptions.regions },
        { key: 'pestle', label: 'PESTLE', options: filterOptions.pestles },
        { key: 'source', label: 'Source', options: filterOptions.sources },
        { key: 'swot', label: 'SWOT', options: filterOptions.swot },
        { key: 'country', label: 'Country', options: filterOptions.countries },
        { key: 'city', label: 'City', options: filterOptions.cities },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">B</div>
                    {!collapsed && <h1>DataLens</h1>}
                </div>
                {!collapsed && <p className="sidebar-subtitle">Dashboard Filters</p>}
                <button className="sidebar-collapse-btn" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {collapsed
                            ? <><polyline points="9 18 15 12 9 6" /></>
                            : <><polyline points="15 18 9 12 15 6" /></>
                        }
                    </svg>
                </button>
            </div>

            {!collapsed && (
                <div className="sidebar-filters">
                    {filterFields.map(({ key, label, options }) => (
                        <div className="filter-section" key={key}>
                            <label htmlFor={`filter-${key}`}>{label}</label>
                            <select
                                id={`filter-${key}`}
                                value={filters[key] || ''}
                                onChange={e => onFilterChange(key, e.target.value)}
                            >
                                <option value="">All {label}s</option>
                                {(options || []).map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {activeCount > 0 && (
                        <div className="active-filters">
                            ✓ {activeCount} filter{activeCount > 1 ? 's' : ''} active
                        </div>
                    )}

                    <button className="clear-btn" onClick={onClear}>
                        ✕ Clear All Filters
                    </button>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
