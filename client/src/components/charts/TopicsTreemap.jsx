import { useRef, useEffect } from 'react';

// Custom canvas-drawn treemap — unique, no external library
function TopicsTreemap({ data }) {
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

        // Aggregate topics
        const topicMap = {};
        data.forEach(d => {
            const t = d.topic || '';
            if (t) topicMap[t] = (topicMap[t] || 0) + 1;
        });
        const items = Object.entries(topicMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 16)
            .map(([name, value]) => ({ name, value }));

        const total = items.reduce((s, i) => s + i.value, 0);

        const COLORS = [
            '#7367f0', '#28c76f', '#00cfe8', '#ff9f43',
            '#ea5455', '#9e95f5', '#4bc98b', '#3dd5f3',
            '#ffb976', '#f08182', '#5a50e0', '#1fa85c',
            '#0bb8d0', '#e68a38', '#d44748', '#8b7ef0',
        ];

        ctx.clearRect(0, 0, w, h);

        // Simple squarified treemap layout
        function layoutRow(items, x, y, w, h) {
            if (items.length === 0) return [];
            const rects = [];
            const rowTotal = items.reduce((s, i) => s + i.value, 0);
            const isHorizontal = w >= h;
            let offset = 0;

            items.forEach(item => {
                const frac = item.value / rowTotal;
                if (isHorizontal) {
                    rects.push({ ...item, x: x + offset, y, w: w * frac, h });
                    offset += w * frac;
                } else {
                    rects.push({ ...item, x, y: y + offset, w, h: h * frac });
                    offset += h * frac;
                }
            });
            return rects;
        }

        // Split items into two halves and layout recursively
        function treemap(items, x, y, w, h) {
            if (items.length === 0) return [];
            if (items.length === 1) return [{ ...items[0], x, y, w, h }];
            if (items.length <= 4) return layoutRow(items, x, y, w, h);

            const mid = Math.ceil(items.length / 2);
            const left = items.slice(0, mid);
            const right = items.slice(mid);
            const leftTotal = left.reduce((s, i) => s + i.value, 0);
            const allTotal = items.reduce((s, i) => s + i.value, 0);
            const frac = leftTotal / allTotal;

            if (w >= h) {
                return [
                    ...treemap(left, x, y, w * frac, h),
                    ...treemap(right, x + w * frac, y, w * (1 - frac), h),
                ];
            } else {
                return [
                    ...treemap(left, x, y, w, h * frac),
                    ...treemap(right, x, y + h * frac, w, h * (1 - frac)),
                ];
            }
        }

        const rects = treemap(items, 2, 2, w - 4, h - 4);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        rects.forEach((r, i) => {
            const pad = 1.5;
            const rx = r.x + pad;
            const ry = r.y + pad;
            const rw = r.w - pad * 2;
            const rh = r.h - pad * 2;
            const cornerR = 6;

            // Draw rounded rect
            ctx.beginPath();
            ctx.roundRect(rx, ry, rw, rh, cornerR);
            ctx.fillStyle = COLORS[i % COLORS.length] + 'cc';
            ctx.fill();

            // Hover effect line
            ctx.beginPath();
            ctx.roundRect(rx, ry, rw, rh, cornerR);
            ctx.strokeStyle = COLORS[i % COLORS.length];
            ctx.lineWidth = 1;
            ctx.stroke();

            // Label
            if (rw > 50 && rh > 30) {
                ctx.fillStyle = '#ffffff';
                const fontSize = Math.max(Math.min(rw / 8, rh / 3, 14), 9);
                ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Truncate name
                let name = r.name;
                if (ctx.measureText(name).width > rw - 10) {
                    while (name.length > 3 && ctx.measureText(name + '…').width > rw - 10) {
                        name = name.slice(0, -1);
                    }
                    name += '…';
                }

                ctx.fillText(name, rx + rw / 2, ry + rh / 2 - 6);
                ctx.font = `500 ${Math.max(fontSize - 2, 8)}px Inter, sans-serif`;
                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                ctx.fillText(r.value + ' records', rx + rw / 2, ry + rh / 2 + 10);
            }
        });

    }, [data]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default TopicsTreemap;
