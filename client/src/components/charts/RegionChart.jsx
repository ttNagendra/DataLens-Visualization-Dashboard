import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const COLORS = [
    'rgba(115,103,240,0.6)', 'rgba(40,199,111,0.6)', 'rgba(0,207,232,0.6)',
    'rgba(255,159,67,0.6)', 'rgba(234,84,85,0.6)', 'rgba(158,149,245,0.6)',
    'rgba(75,201,139,0.6)', 'rgba(61,213,243,0.6)', 'rgba(255,185,118,0.6)',
    'rgba(240,129,130,0.6)',
];

function RegionChart({ data }) {
    const regionMap = {};
    data.forEach(d => {
        const region = d.region || '';
        if (region) regionMap[region] = (regionMap[region] || 0) + 1;
    });

    const entries = Object.entries(regionMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const chartData = {
        labels: entries.map(e => e[0]),
        datasets: [{
            data: entries.map(e => e[1]),
            backgroundColor: COLORS,
            borderColor: '#ffffff',
            borderWidth: 2,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#6f6b7d',
                    font: { size: 10.5, weight: 500 },
                    padding: 8,
                    boxWidth: 10,
                    boxHeight: 10,
                    borderRadius: 3,
                    useBorderRadius: true,
                },
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#444050',
                bodyColor: '#6f6b7d',
                borderColor: '#e6e5ea',
                borderWidth: 1,
                cornerRadius: 8,
            },
        },
        scales: {
            r: {
                grid: { color: '#f0eff2' },
                ticks: { display: false },
            },
        },
    };

    return <PolarArea data={chartData} options={options} />;
}

export default RegionChart;
