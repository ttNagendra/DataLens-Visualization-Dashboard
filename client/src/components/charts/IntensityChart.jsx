import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const COLORS = [
    '#7367f0', '#28c76f', '#00cfe8', '#ff9f43', '#ea5455',
    '#9e95f5', '#4bc98b', '#3dd5f3', '#ffb976', '#f08182',
    '#5a50e0', '#1fa85c',
];

function IntensityChart({ data }) {
    const sectorMap = {};
    data.forEach(d => {
        const sector = d.sector || 'Unknown';
        if (!sectorMap[sector]) sectorMap[sector] = { total: 0, count: 0 };
        sectorMap[sector].total += d.intensity || 0;
        sectorMap[sector].count += 1;
    });

    const entries = Object.entries(sectorMap)
        .map(([s, v]) => ({ sector: s, avg: v.total / v.count }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 12);

    const chartData = {
        labels: entries.map(e => e.sector),
        datasets: [{
            label: 'Avg Intensity',
            data: entries.map(e => e.avg.toFixed(1)),
            backgroundColor: entries.map((_, i) => COLORS[i % COLORS.length] + 'cc'),
            borderColor: entries.map((_, i) => COLORS[i % COLORS.length]),
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 40,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#444050',
                bodyColor: '#6f6b7d',
                borderColor: '#e6e5ea',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                boxPadding: 6,
                titleFont: { weight: 600 },
            },
        },
        scales: {
            x: {
                ticks: { color: '#a5a2ad', font: { size: 11, weight: 500 }, maxRotation: 45 },
                grid: { display: false },
                border: { display: false },
            },
            y: {
                ticks: { color: '#a5a2ad', font: { size: 11 }, padding: 8 },
                grid: { color: '#f0eff2', drawBorder: false },
                border: { display: false },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}

export default IntensityChart;
