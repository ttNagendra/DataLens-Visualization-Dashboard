import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CountryChart({ data }) {
    const countryMap = {};
    data.forEach(d => {
        const country = d.country || '';
        if (country) countryMap[country] = (countryMap[country] || 0) + 1;
    });

    const entries = Object.entries(countryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12);

    const chartData = {
        labels: entries.map(e => e[0]),
        datasets: [{
            label: 'Records',
            data: entries.map(e => e[1]),
            backgroundColor: 'rgba(0,207,232,0.65)',
            borderColor: '#00cfe8',
            borderWidth: 1.5,
            borderRadius: 4,
            borderSkipped: false,
            maxBarThickness: 18,
        }],
    };

    const options = {
        indexAxis: 'y',
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
                ticks: { color: '#a5a2ad', font: { size: 11 } },
                grid: { color: '#f0eff2', drawBorder: false },
                border: { display: false },
            },
            y: {
                ticks: { color: '#6f6b7d', font: { size: 11, weight: 500 } },
                grid: { display: false },
                border: { display: false },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}

export default CountryChart;
