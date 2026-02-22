import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Filler, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Stacked area chart — topics over time
function StackedAreaChart({ data }) {
    const yearMap = {};
    data.forEach(d => {
        if (d.end_year && d.end_year >= 2016 && d.end_year <= 2070 && d.topic) {
            if (!yearMap[d.end_year]) yearMap[d.end_year] = {};
            yearMap[d.end_year][d.topic] = (yearMap[d.end_year][d.topic] || 0) + 1;
        }
    });

    const years = Object.keys(yearMap).map(Number).sort((a, b) => a - b);

    // Get top 5 topics
    const topicTotals = {};
    data.forEach(d => { if (d.topic) topicTotals[d.topic] = (topicTotals[d.topic] || 0) + 1; });
    const topTopics = Object.entries(topicTotals).sort((a, b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);

    const COLORS = [
        { bg: 'rgba(115,103,240,0.3)', border: '#7367f0' },
        { bg: 'rgba(40,199,111,0.3)', border: '#28c76f' },
        { bg: 'rgba(0,207,232,0.3)', border: '#00cfe8' },
        { bg: 'rgba(255,159,67,0.3)', border: '#ff9f43' },
        { bg: 'rgba(234,84,85,0.3)', border: '#ea5455' },
    ];

    const datasets = topTopics.map((topic, i) => ({
        label: topic,
        data: years.map(y => (yearMap[y] && yearMap[y][topic]) || 0),
        fill: true,
        backgroundColor: COLORS[i].bg,
        borderColor: COLORS[i].border,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: COLORS[i].border,
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        tension: 0.4,
    }));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#6f6b7d', font: { size: 10.5, weight: 500 }, boxWidth: 10, padding: 14 },
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#444050',
                bodyColor: '#6f6b7d',
                borderColor: '#e6e5ea',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                ticks: { color: '#a5a2ad', font: { size: 11 } },
                grid: { display: false },
                border: { display: false },
            },
            y: {
                stacked: true,
                ticks: { color: '#a5a2ad', font: { size: 11 }, padding: 8 },
                grid: { color: '#f0eff2', drawBorder: false },
                border: { display: false },
            },
        },
        interaction: { mode: 'index', intersect: false },
    };

    return <Line data={{ labels: years, datasets }} options={options} />;
}

export default StackedAreaChart;
