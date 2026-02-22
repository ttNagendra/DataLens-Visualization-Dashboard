import { useRef, useEffect } from 'react';

// Custom heatmap — correlation between regions and sectors
function RegionHeatmap({ data }) {
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

        // Get top regions and sectors
        const regionCount = {};
        const sectorCount = {};
        data.forEach(d => {
            if (d.region) regionCount[d.region] = (regionCount[d.region] || 0) + 1;
            if (d.sector) sectorCount[d.sector] = (sectorCount[d.sector] || 0) + 1;
        });

        const regions = Object.entries(regionCount).sort((a, b) => b[1] - a[1]).slice(0, 7).map(e => e[0]);
        const sectors = Object.entries(sectorCount).sort((a, b) => b[1] - a[1]).slice(0, 8).map(e => e[0]);

        // Build matrix
        const matrix = {};
        let maxVal = 0;
        regions.forEach(r => {
            matrix[r] = {};
            sectors.forEach(s => { matrix[r][s] = 0; });
        });
        data.forEach(d => {
            if (d.region && d.sector && matrix[d.region] && matrix[d.region][d.sector] !== undefined) {
                matrix[d.region][d.sector]++;
                maxVal = Math.max(maxVal, matrix[d.region][d.sector]);
            }
        });

        ctx.clearRect(0, 0, w, h);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const labelColor = isDark ? '#b4b7bd' : '#6f6b7d';
        const mutedColor = isDark ? '#6f7486' : '#a5a2ad';

        const leftMargin = 100;
        const topMargin = 60;
        const cellW = (w - leftMargin - 20) / sectors.length;
        const cellH = (h - topMargin - 20) / regions.length;

        // Column headers (sectors)
        ctx.font = '500 9px Inter, sans-serif';
        ctx.fillStyle = mutedColor;
        ctx.textAlign = 'center';
        sectors.forEach((s, i) => {
            const x = leftMargin + i * cellW + cellW / 2;
            ctx.save();
            ctx.translate(x, topMargin - 8);
            ctx.rotate(-0.5);
            const label = s.length > 10 ? s.slice(0, 9) + '…' : s;
            ctx.fillText(label, 0, 0);
            ctx.restore();
        });

        // Row labels (regions) & cells
        regions.forEach((r, ri) => {
            const y = topMargin + ri * cellH;

            ctx.font = '500 10px Inter, sans-serif';
            ctx.fillStyle = labelColor;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            const regionLabel = r.length > 14 ? r.slice(0, 13) + '…' : r;
            ctx.fillText(regionLabel, leftMargin - 8, y + cellH / 2);

            sectors.forEach((s, si) => {
                const x = leftMargin + si * cellW;
                const val = matrix[r][s];
                const intensity = maxVal > 0 ? val / maxVal : 0;

                // Color interpolation: low=light → high=deep purple
                const r1 = isDark ? 47 : 248;
                const g1 = isDark ? 51 : 247;
                const b1 = isDark ? 73 : 250;
                const r2 = 115, g2 = 103, b2 = 240;

                const cr = Math.round(r1 + (r2 - r1) * intensity);
                const cg = Math.round(g1 + (g2 - g1) * intensity);
                const cb = Math.round(b1 + (b2 - b1) * intensity);
                const alpha = 0.15 + intensity * 0.85;

                ctx.beginPath();
                ctx.roundRect(x + 1.5, y + 1.5, cellW - 3, cellH - 3, 4);
                ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
                ctx.fill();

                // Show value if > 0
                if (val > 0) {
                    ctx.fillStyle = intensity > 0.5 ? '#ffffff' : labelColor;
                    ctx.font = '600 10px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(val, x + cellW / 2, y + cellH / 2);
                }
            });
        });

        // Legend
        const legW = 120;
        const legH = 8;
        const legX = w - legW - 16;
        const legY = 14;
        const gradient = ctx.createLinearGradient(legX, 0, legX + legW, 0);
        gradient.addColorStop(0, isDark ? 'rgba(47,51,73,0.3)' : 'rgba(248,247,250,0.5)');
        gradient.addColorStop(1, 'rgba(115,103,240,0.9)');
        ctx.beginPath();
        ctx.roundRect(legX, legY, legW, legH, 4);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.font = '500 9px Inter, sans-serif';
        ctx.fillStyle = mutedColor;
        ctx.textAlign = 'left';
        ctx.fillText('Low', legX, legY + legH + 12);
        ctx.textAlign = 'right';
        ctx.fillText('High', legX + legW, legY + legH + 12);
        ctx.textAlign = 'center';
        ctx.fillText('Density', legX + legW / 2, legY - 2);

    }, [data]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

export default RegionHeatmap;
