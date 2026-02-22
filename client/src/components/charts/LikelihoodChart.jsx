import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS, RadialLinearScale, PointElement,
    LineElement, Filler, Tooltip, Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function LikelihoodChart({ data }) {
    const regionMap = {};
    data.forEach(d => {
        const region = d.region || 'Unknown';
        if (!regionMap[region]) regionMap[region] = { total: 0, count: 0 };
        regionMap[region].total += d.likelihood || 0;
        regionMap[region].count += 1;
    });

    const entries = Object.entries(regionMap)
        .map(([r, v]) => ({ region: r, avg: v.total / v.count }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 8);

    const chartData = {
        labels: entries.map(e => e.region),
        datasets: [{
            label: 'Avg Likelihood',
            data: entries.map(e => e.avg.toFixed(1)),
            backgroundColor: 'rgba(115, 103, 240, 0.15)',
            borderColor: '#7367f0',
            borderWidth: 2,
            pointBackgroundColor: '#7367f0',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
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
            r: {
                grid: { color: '#f0eff2' },
                angleLines: { color: '#f0eff2' },
                pointLabels: { color: '#6f6b7d', font: { size: 10.5, weight: 500 } },
                ticks: { color: '#a5a2ad', backdropColor: 'transparent', font: { size: 9 } },
            },
        },
    };

    return <Radar data={chartData} options={options} />;
}

export default LikelihoodChart;
