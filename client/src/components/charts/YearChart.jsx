import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement, LineElement, Filler, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function YearChart({ data }) {
    const yearMap = {};
    data.forEach(d => {
        if (d.end_year && d.end_year > 0) {
            yearMap[d.end_year] = (yearMap[d.end_year] || 0) + 1;
        }
    });

    const entries = Object.entries(yearMap)
        .map(([y, c]) => ({ year: Number(y), count: c }))
        .filter(e => e.year >= 2000 && e.year <= 2100)
        .sort((a, b) => a.year - b.year);

    const chartData = {
        labels: entries.map(e => e.year),
        datasets: [{
            label: 'Records',
            data: entries.map(e => e.count),
            fill: true,
            backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(115, 103, 240, 0.2)');
                gradient.addColorStop(1, 'rgba(115, 103, 240, 0)');
                return gradient;
            },
            borderColor: '#7367f0',
            borderWidth: 2.5,
            pointBackgroundColor: '#7367f0',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 3,
            tension: 0.4,
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
                titleFont: { weight: 600 },
            },
        },
        scales: {
            x: {
                ticks: { color: '#a5a2ad', font: { size: 11 } },
                grid: { display: false },
                border: { display: false },
            },
            y: {
                ticks: { color: '#a5a2ad', font: { size: 11 }, padding: 8 },
                grid: { color: '#f0eff2', drawBorder: false },
                border: { display: false },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return <Line data={chartData} options={options} />;
}

export default YearChart;
