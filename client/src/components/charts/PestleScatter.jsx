import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

// Scatter plot with custom point styles per PESTLE category
function PestleScatter({ data }) {
    const pestleGroups = {};
    data.forEach(d => {
        const p = d.pestle || '';
        if (p) {
            if (!pestleGroups[p]) pestleGroups[p] = [];
            pestleGroups[p].push({ x: d.intensity || 0, y: d.relevance || 0 });
        }
    });

    const pestles = Object.entries(pestleGroups)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 8);

    const COLORS = [
        { bg: 'rgba(115,103,240,0.5)', border: '#7367f0' },
        { bg: 'rgba(40,199,111,0.5)', border: '#28c76f' },
        { bg: 'rgba(0,207,232,0.5)', border: '#00cfe8' },
        { bg: 'rgba(255,159,67,0.5)', border: '#ff9f43' },
        { bg: 'rgba(234,84,85,0.5)', border: '#ea5455' },
        { bg: 'rgba(158,149,245,0.5)', border: '#9e95f5' },
        { bg: 'rgba(75,201,139,0.5)', border: '#4bc98b' },
        { bg: 'rgba(61,213,243,0.5)', border: '#3dd5f3' },
    ];

    const SHAPES = ['circle', 'triangle', 'rect', 'rectRounded', 'star', 'cross', 'crossRot', 'dash'];

    const datasets = pestles.map(([name, points], i) => ({
        label: name,
        data: points.slice(0, 40),
        backgroundColor: COLORS[i % COLORS.length].bg,
        borderColor: COLORS[i % COLORS.length].border,
        borderWidth: 1.5,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointStyle: SHAPES[i % SHAPES.length],
    }));

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#6f6b7d',
                    font: { size: 10.5, weight: 500 },
                    usePointStyle: true,
                    pointStyleWidth: 10,
                    padding: 14,
                },
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#444050',
                bodyColor: '#6f6b7d',
                borderColor: '#e6e5ea',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                callbacks: {
                    label: ctx => `${ctx.dataset.label}: Intensity ${ctx.raw.x}, Relevance ${ctx.raw.y}`,
                },
            },
        },
        scales: {
            x: {
                title: { display: true, text: 'Intensity', color: '#a5a2ad', font: { size: 12, weight: 500 } },
                ticks: { color: '#a5a2ad' },
                grid: { color: '#f0eff2' },
                border: { display: false },
            },
            y: {
                title: { display: true, text: 'Relevance', color: '#a5a2ad', font: { size: 12, weight: 500 } },
                ticks: { color: '#a5a2ad' },
                grid: { color: '#f0eff2' },
                border: { display: false },
            },
        },
    };

    return <Scatter data={{ datasets }} options={options} />;
}

export default PestleScatter;
