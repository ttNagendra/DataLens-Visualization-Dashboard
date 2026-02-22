import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SectorChart({ data }) {
    const sectorMap = {};
    data.forEach(d => {
        const sector = d.sector || 'Unknown';
        if (!sectorMap[sector]) sectorMap[sector] = { count: 0, totalIntensity: 0 };
        sectorMap[sector].count += 1;
        sectorMap[sector].totalIntensity += d.intensity || 0;
    });

    const entries = Object.entries(sectorMap)
        .map(([s, v]) => ({ sector: s, count: v.count, avgIntensity: v.totalIntensity / v.count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);

    const chartData = {
        labels: entries.map(e => e.sector),
        datasets: [
            {
                label: 'Count',
                data: entries.map(e => e.count),
                backgroundColor: 'rgba(40,199,111,0.65)',
                borderColor: '#28c76f',
                borderWidth: 1.5,
                borderRadius: 4,
                borderSkipped: false,
                maxBarThickness: 24,
            },
            {
                label: 'Avg Intensity',
                data: entries.map(e => e.avgIntensity.toFixed(1)),
                backgroundColor: 'rgba(115,103,240,0.65)',
                borderColor: '#7367f0',
                borderWidth: 1.5,
                borderRadius: 4,
                borderSkipped: false,
                maxBarThickness: 24,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#6f6b7d',
                    font: { size: 11, weight: 500 },
                    boxWidth: 10,
                    boxHeight: 10,
                    borderRadius: 3,
                    useBorderRadius: true,
                    padding: 16,
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

export default SectorChart;
