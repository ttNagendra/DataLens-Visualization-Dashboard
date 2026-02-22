import { useRef, useEffect } from 'react';

// Custom canvas-drawn gauge chart — no Chart.js dependency
function IntensityGauge({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || data.length === 0) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h * 0.58;
        const radius = Math.min(w, h) * 0.38;

        // Calculate average intensity
        const avgInt = data.reduce((s, d) => s + (d.intensity || 0), 0) / data.length;
        const maxInt = Math.max(...data.map(d => d.intensity || 0), 1);
        const pct = Math.min(avgInt / maxInt, 1);

        ctx.clearRect(0, 0, w, h);

        // Gauge segments
        const segments = [
            { color: '#28c76f', label: 'Low' },
            { color: '#ff9f43', label: 'Med' },
            { color: '#ea5455', label: 'High' },
        ];

        const startAngle = Math.PI;
        const endAngle = 2 * Math.PI;
        const totalArc = endAngle - startAngle;

        // Background arc
        ctx.lineWidth = 22;
        ctx.lineCap = 'round';

        segments.forEach((seg, i) => {
            const segStart = startAngle + (totalArc / segments.length) * i;
            const segEnd = startAngle + (totalArc / segments.length) * (i + 1);
            ctx.beginPath();
            ctx.arc(cx, cy, radius, segStart, segEnd);
            ctx.strokeStyle = seg.color + '30';
            ctx.lineWidth = 22;
            ctx.stroke();
        });

        // Active arc with gradient
        const gradient = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
        gradient.addColorStop(0, '#28c76f');
        gradient.addColorStop(0.5, '#ff9f43');
        gradient.addColorStop(1, '#ea5455');

        const needleAngle = startAngle + totalArc * pct;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, needleAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 22;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Needle dot
        const dotX = cx + radius * Math.cos(needleAngle);
        const dotY = cy + radius * Math.sin(needleAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = pct > 0.66 ? '#ea5455' : pct > 0.33 ? '#ff9f43' : '#28c76f';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Center text
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? '#d0d2d6' : '#444050';
        ctx.font = '700 36px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(avgInt.toFixed(1), cx, cy + 6);

        ctx.fillStyle = isDark ? '#6f7486' : '#a5a2ad';
        ctx.font = '500 12px Inter, sans-serif';
        ctx.fillText('AVG INTENSITY', cx, cy + 26);

        // Segment labels
        ctx.font = '600 10px Inter, sans-serif';
        segments.forEach((seg, i) => {
            const midAngle = startAngle + (totalArc / segments.length) * (i + 0.5);
            const lx = cx + (radius + 28) * Math.cos(midAngle);
            const ly = cy + (radius + 28) * Math.sin(midAngle);
            ctx.fillStyle = seg.color;
            ctx.fillText(seg.label, lx, ly);
        });

        // Min / Max labels
        ctx.fillStyle = isDark ? '#6f7486' : '#a5a2ad';
        ctx.font = '500 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('0', cx - radius - 5, cy + 20);
        ctx.textAlign = 'right';
        ctx.fillText(maxInt.toFixed(0), cx + radius + 5, cy + 20);

    }, [data]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default IntensityGauge;
