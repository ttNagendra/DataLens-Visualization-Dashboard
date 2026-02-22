import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS = [
    '#7367f0', '#9e95f5', '#c3bef7', '#28c76f', '#00cfe8',
    '#ff9f43', '#ea5455', '#4bc98b', '#3dd5f3', '#ffb976',
];

function SourceChart({ data }) {
    const sourceMap = {};
    data.forEach(d => {
        const source = d.source || '';
        if (source) sourceMap[source] = (sourceMap[source] || 0) + 1;
    });

    const entries = Object.entries(sourceMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const chartData = {
        labels: entries.map(e => e[0]),
        datasets: [{
            label: 'Records',
            data: entries.map(e => e[1]),
            backgroundColor: COLORS.map(c => c + 'cc'),
            borderColor: COLORS,
            borderWidth: 1.5,
            borderRadius: 5,
            borderSkipped: false,
            maxBarThickness: 36,
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
            },
        },
        scales: {
            x: {
                ticks: { color: '#a5a2ad', font: { size: 10.5, weight: 500 }, maxRotation: 45 },
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

export default SourceChart;
