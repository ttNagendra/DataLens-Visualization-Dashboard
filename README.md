# 📊 DataLens — Data Visualization Dashboard

A full-stack analytics dashboard built with **React**, **Node.js**, **MongoDB**, and **Chart.js**. Explore 1000+ global insights with 12 interactive charts, real-time filters, and a glassmorphism-inspired premium UI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000?logo=vercel&logoColor=white)](https://github.com/ttNagendra/DataLens-Visualization-Dashboard)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

### 🔐 Authentication
- Login & Signup with form validation
- Demo account for instant access
- Session persistence via `localStorage`
- User avatar & logout in the navbar

### 📈 12 Visualizations

#### 🎯 5 Custom Canvas Visualizations
| Chart | Description |
|---|---|
| **Intensity Gauge** | Semicircular meter showing overall average intensity |
| **Topics Treemap** | Proportional area rectangles for topic distribution |
| **Region × Sector Heatmap** | Density matrix across regions and sectors |
| **Topics Over Time** | Stacked area — top 5 topics trending across years |
| **PESTLE Scatter** | Unique marker shapes per PESTLE category |

#### 📊 7 Chart.js Visualizations
| Chart | Type | Visualizes |
|---|---|---|
| Intensity by Sector | Bar | Avg intensity per sector |
| Likelihood by Region | Radar | Regional likelihood scores |
| Relevance vs Likelihood | Bubble | Multi-dimensional analysis |
| Records by Year | Line | Temporal data distribution |
| Top Countries | Horizontal Bar | Country-level record counts |
| Top Sources | Bar | Most referenced data sources |
| Sector Distribution | Grouped Bar | Count & avg intensity |

### 🎛️ 9 Filter Controls
`End Year` · `Topic` · `Sector` · `Region` · `PESTLE` · `Source` · `SWOT` · `Country` · `City`

### 🎨 Premium UI
- **Glassmorphism navbar** with `backdrop-filter` blur
- **Animated auth page** with floating purple orbs
- **KPI cards** with colored left accent bars & icon hover animations
- **Chart cards** with gradient top-border reveal on hover
- **Theme Modes** — Light ☀️ / Dark 🌙 / System 🖥️
- **Collapsible sidebar** with smooth easing transitions
- **Fully responsive** — desktop, tablet, mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6, Chart.js 4, react-chartjs-2, Axios |
| Backend | Node.js, Express 4, Mongoose |
| Database | MongoDB Atlas |
| Styling | Vanilla CSS — glassmorphism / gradient design system |
| Font | Inter (Google Fonts) |
| Deployment | Vercel (client) + Render (server) |

---

## 🚀 Getting Started (Local)

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- MongoDB Atlas URI **or** [MongoDB Community](https://www.mongodb.com/try/download/community) on `localhost:27017`

### 1 — Clone & Install

```bash
git clone https://github.com/ttNagendra/DataLens-Visualization-Dashboard.git
cd DataLens-Visualization-Dashboard

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2 — Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here
CLIENT_URL=http://localhost:5173
```

### 3 — Seed the Database

```bash
cd server
node seed.js
# ✓ Seeded 1000 records
```

### 4 — Run

```bash
# Terminal 1 — Backend
cd server
node server.js
# → Server running on http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173** and log in with the demo account.

**Demo credentials:**
- Email: `demo@blackcoffer.com`
- Password: `demo123`

---

## ☁️ Deploy to Vercel + Render

### Backend → Render

1. Go to [render.com](https://render.com) → **New → Web Service**
2. Connect this repo, set **Root Directory** to `server`
3. Build: `npm install` · Start: `node server.js`
4. Add environment variables:
   - `MONGO_URI` — your Atlas URI
   - `CLIENT_URL` — your Vercel URL (add after frontend deploy)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import this repo
2. Set **Root Directory** to `client`
3. Add environment variable:
   - `VITE_API_URL` — your Render service URL

> **Tip:** Render's free tier sleeps after 15 min of inactivity. Use [UptimeRobot](https://uptimerobot.com) to ping every 10 min.

---

## 📁 Project Structure

```
DataLens-Visualization-Dashboard/
├── server/
│   ├── models/
│   │   └── Data.js                 # Mongoose schema
│   ├── server.js                   # Express API
│   ├── seed.js                     # DB seeder
│   ├── .env                        # Environment variables (not committed)
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── IntensityGauge.jsx    ★ Custom canvas gauge
│   │   │   │   ├── TopicsTreemap.jsx     ★ Custom canvas treemap
│   │   │   │   ├── RegionHeatmap.jsx     ★ Custom canvas heatmap
│   │   │   │   ├── StackedAreaChart.jsx  ★ Stacked area chart
│   │   │   │   ├── PestleScatter.jsx     ★ Scatter with shapes
│   │   │   │   ├── IntensityChart.jsx
│   │   │   │   ├── LikelihoodChart.jsx
│   │   │   │   ├── RelevanceChart.jsx
│   │   │   │   ├── YearChart.jsx
│   │   │   │   ├── CountryChart.jsx
│   │   │   │   ├── SourceChart.jsx
│   │   │   │   └── SectorChart.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── KPICards.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # Premium design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── jsondata.json                   # Source data (1000 records)
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/data` | All records (optional filters via query params) |
| `GET` | `/api/filters` | Distinct values for all filter dropdowns |

**Query Parameters for `/api/data`:**
`end_year` · `topic` · `sector` · `region` · `pestle` · `source` · `swot` · `country` · `city`

**Example:**
```
GET /api/data?sector=Energy&region=Northern+America
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
