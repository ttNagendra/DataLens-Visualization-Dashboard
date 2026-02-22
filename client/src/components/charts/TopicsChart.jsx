import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
    '#7367f0', '#28c76f', '#00cfe8', '#ff9f43', '#ea5455',
    '#9e95f5', '#4bc98b', '#3dd5f3', '#ffb976', '#f08182',
];

function TopicsChart({ data }) {
    const topicMap = {};
    data.forEach(d => {
        const topic = d.topic || '';
        if (topic) topicMap[topic] = (topicMap[topic] || 0) + 1;
    });

    const entries = Object.entries(topicMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const chartData = {
        labels: entries.map(e => e[0]),
        datasets: [{
            data: entries.map(e => e[1]),
            backgroundColor: COLORS,
            borderColor: '#ffffff',
            borderWidth: 3,
            hoverOffset: 8,
            hoverBorderWidth: 0,
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#6f6b7d',
                    font: { size: 11, weight: 500 },
                    padding: 12,
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
                padding: 12,
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
}

export default TopicsChart;
