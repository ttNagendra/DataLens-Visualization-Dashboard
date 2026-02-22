const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Data = require('./models/Data');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dashboard';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Data.deleteMany({});
        console.log('Cleared existing data');

        // Read JSON file
        const jsonPath = path.join(__dirname, '..', 'jsondata.json');
        const rawData = fs.readFileSync(jsonPath, 'utf-8');
        const jsonData = JSON.parse(rawData);

        // Normalize data — convert empty strings to null for numeric fields
        const normalized = jsonData.map(item => ({
            ...item,
            end_year: item.end_year === '' || item.end_year === null ? null : Number(item.end_year),
            start_year: item.start_year === '' || item.start_year === null ? null : Number(item.start_year),
            intensity: item.intensity || 0,
            likelihood: item.likelihood || 0,
            relevance: item.relevance || 0,
            impact: item.impact === '' ? null : item.impact,
            city: item.city || '',
        }));

        // Insert in batches
        const batchSize = 200;
        for (let i = 0; i < normalized.length; i += batchSize) {
            const batch = normalized.slice(i, i + batchSize);
            await Data.insertMany(batch);
            console.log(`Inserted ${Math.min(i + batchSize, normalized.length)} / ${normalized.length} records`);
        }

        console.log(`\nSeeding complete! Total records: ${normalized.length}`);
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
