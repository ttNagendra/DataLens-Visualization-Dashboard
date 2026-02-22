import { Bubble } from 'react-chartjs-2';
import {
    Chart as ChartJS, LinearScale, PointElement,
    Tooltip, Legend
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BUBBLE_COLORS = [
    { bg: 'rgba(115,103,240,0.4)', border: '#7367f0' },
    { bg: 'rgba(0,207,232,0.4)', border: '#00cfe8' },
    { bg: 'rgba(255,159,67,0.4)', border: '#ff9f43' },
    { bg: 'rgba(40,199,111,0.4)', border: '#28c76f' },
    { bg: 'rgba(234,84,85,0.4)', border: '#ea5455' },
    { bg: 'rgba(158,149,245,0.4)', border: '#9e95f5' },
];

function RelevanceChart({ data }) {
    const sectors = [...new Set(data.map(d => d.sector || 'Unknown'))].slice(0, 6);

    const datasets = sectors.map((sector, i) => {
        const sectorData = data
            .filter(d => (d.sector || 'Unknown') === sector)
            .slice(0, 30)
            .map(d => ({
                x: d.relevance || 0,
                y: d.likelihood || 0,
                r: Math.min(Math.max((d.intensity || 1) / 2, 3), 18),
            }));

        return {
            label: sector,
            data: sectorData,
            backgroundColor: BUBBLE_COLORS[i % BUBBLE_COLORS.length].bg,
            borderColor: BUBBLE_COLORS[i % BUBBLE_COLORS.length].border,
            borderWidth: 1.5,
        };
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#6f6b7d', font: { size: 11, weight: 500 }, boxWidth: 10, padding: 16 },
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
                    label: ctx => {
                        const { x, y, r } = ctx.raw;
                        return `Relevance: ${x}, Likelihood: ${y}, Intensity: ${(r * 2).toFixed(0)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: { display: true, text: 'Relevance', color: '#a5a2ad', font: { size: 12, weight: 500 } },
                ticks: { color: '#a5a2ad' },
                grid: { color: '#f0eff2' },
                border: { display: false },
            },
            y: {
                title: { display: true, text: 'Likelihood', color: '#a5a2ad', font: { size: 12, weight: 500 } },
                ticks: { color: '#a5a2ad' },
                grid: { color: '#f0eff2' },
                border: { display: false },
            },
        },
    };

    return <Bubble data={{ datasets }} options={options} />;
}

export default RelevanceChart;
