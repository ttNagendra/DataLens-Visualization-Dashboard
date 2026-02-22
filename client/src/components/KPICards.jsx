function KPICards({ data }) {
    const totalRecords = data.length;

    const avgIntensity = totalRecords > 0
        ? (data.reduce((sum, d) => sum + (d.intensity || 0), 0) / totalRecords).toFixed(1)
        : '0';

    const avgLikelihood = totalRecords > 0
        ? (data.reduce((sum, d) => sum + (d.likelihood || 0), 0) / totalRecords).toFixed(1)
        : '0';

    const avgRelevance = totalRecords > 0
        ? (data.reduce((sum, d) => sum + (d.relevance || 0), 0) / totalRecords).toFixed(1)
        : '0';

    const uniqueCountries = new Set(data.filter(d => d.country).map(d => d.country)).size;

    const cards = [
        { icon: '📋', value: totalRecords.toLocaleString(), label: 'Total Records', badge: 'Insights' },
        { icon: '⚡', value: avgIntensity, label: 'Avg Intensity', badge: 'Score' },
        { icon: '📈', value: avgLikelihood, label: 'Avg Likelihood', badge: 'Probability' },
        { icon: '🎯', value: avgRelevance, label: 'Avg Relevance', badge: 'Impact' },
    ];

    return (
        <div className="kpi-grid">
            {cards.map((card, i) => (
                <div className="kpi-card" key={i}>
                    <div className="kpi-icon">{card.icon}</div>
                    <div className="kpi-info">
                        <div className="kpi-label">{card.label}</div>
                        <div className="kpi-value">{card.value}</div>
                        <span className="kpi-badge">{card.badge}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default KPICards;
