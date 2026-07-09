const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  console.log("DNS set to Google DNS.");
} catch (e) {
  console.log("Failed to set DNS servers:", e.message);
}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./models/Data');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dashboard';

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
}));
app.use(express.json());


// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// ─── GET /api/data ── Fetch data with optional filters ───────────────────────
app.get('/api/data', async (req, res) => {
    try {
        const filter = {};

        if (req.query.end_year) filter.end_year = Number(req.query.end_year);
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;
        if (req.query.city) filter.city = req.query.city;

        // SWOT filter — maps to pestle values conceptually
        if (req.query.swot) {
            const swotMap = {
                'Strength': ['Technological', 'Organization'],
                'Weakness': ['Healthcare', 'Lifestyles'],
                'Opportunity': ['Economic', 'Industries'],
                'Threat': ['Political', 'Environmental'],
            };
            const pestleValues = swotMap[req.query.swot];
            if (pestleValues) {
                filter.pestle = { $in: pestleValues };
            }
        }

        const data = await Data.find(filter).lean();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ─── GET /api/filters ── Return distinct filter values ───────────────────────
app.get('/api/filters', async (req, res) => {
    try {
        const [
            endYears, topics, sectors, regions,
            pestles, sources, countries, cities
        ] = await Promise.all([
            Data.distinct('end_year', { end_year: { $ne: null } }),
            Data.distinct('topic', { topic: { $ne: '' } }),
            Data.distinct('sector', { sector: { $ne: '' } }),
            Data.distinct('region', { region: { $ne: '' } }),
            Data.distinct('pestle', { pestle: { $ne: '' } }),
            Data.distinct('source', { source: { $ne: '' } }),
            Data.distinct('country', { country: { $ne: '' } }),
            Data.distinct('city', { city: { $ne: '' } }),
        ]);

        res.json({
            endYears: endYears.sort((a, b) => a - b),
            topics: topics.sort(),
            sectors: sectors.sort(),
            regions: regions.sort(),
            pestles: pestles.sort(),
            sources: sources.sort(),
            countries: countries.sort(),
            cities: cities.sort(),
            swot: ['Strength', 'Weakness', 'Opportunity', 'Threat'],
        });
    } catch (err) {
        console.error('Error fetching filters:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
