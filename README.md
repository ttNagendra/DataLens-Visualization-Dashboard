# 📊 Blackcoffer — Data Visualization Dashboard

A full-stack analytics dashboard built with **React**, **Node.js**, **MongoDB**, and **Chart.js**. Explore 1000+ global insights with interactive charts, real-time filters, and a premium Vuexy-inspired UI.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs&logoColor=white)

---

## ✨ Features

### 🔐 Authentication
- Login & Signup pages with form validation
- Session persistence via localStorage
- User avatar & logout in navbar

### 📈 12 Visualizations (5 Custom + 7 Chart.js)

#### 🎯 Custom Unique Visualizations
| Chart | Type | Description |
|-------|------|------------|
| Intensity Gauge | Canvas Gauge | Semicircular meter with green→red gradient |
| Topics Treemap | Canvas Treemap | Proportional area rectangles for topic distribution |
| Region × Sector Heatmap | Canvas Heatmap | Density matrix across regions and sectors |
| Topics Over Time | Stacked Area | Layered trend of top 5 topics across years |
| PESTLE Scatter | Scatter + Shapes | Unique point shapes per PESTLE category |

#### 📊 Chart.js Visualizations
| Chart | Type | Visualizes |
|-------|------|-----------|
| Intensity by Sector | Bar | Avg intensity across sectors |
| Likelihood by Region | Radar | Regional likelihood scores |
| Relevance vs Likelihood | Bubble | Multi-dimensional analysis |
| Records by Year | Line | Temporal distribution |
| Top Countries | Horizontal Bar | Country-level counts |
| Top Sources | Bar | Most referenced sources |
| Sector Distribution | Grouped Bar | Count & avg intensity |

### 🎛️ 9 Filter Controls
End Year · Topic · Sector · Region · PESTLE · Source · SWOT · Country · City

### 🎨 UI Features
- **Theme Modes**: Light ☀️ / Dark 🌙 / System 🖥️
- **Collapsible Sidebar**: Toggle open/close with smooth animation
- **KPI Cards**: Total Records, Avg Intensity, Avg Likelihood, Avg Relevance
- **Responsive Design**: Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Chart.js, react-chartjs-2, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Styling | Vanilla CSS (Vuexy-inspired theme) |
| Font | Inter (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running on `localhost:27017`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Dashboard

# Install backend dependencies
cd server
npm install

# Seed the database
node seed.js

# Install frontend dependencies
cd ../client
npm install
```

### Running the App

```bash
# Terminal 1 — Start backend
cd server
node server.js
# → Server running on http://localhost:5000
# → MongoDB connected successfully

# Terminal 2 — Start frontend
cd client
npm run dev
# → http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
Dashboard/
├── server/
│   ├── models/
│   │   └── Data.js              # Mongoose schema
│   ├── server.js                 # Express API server
│   ├── seed.js                   # MongoDB data seeder
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── IntensityGauge.jsx    ★ Custom canvas gauge
│   │   │   │   ├── TopicsTreemap.jsx     ★ Custom canvas treemap
│   │   │   │   ├── RegionHeatmap.jsx     ★ Custom canvas heatmap
│   │   │   │   ├── StackedAreaChart.jsx  ★ Stacked area
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
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── jsondata.json                  # Source data (1000 records)
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/data` | Fetch all records (supports query filters) |
| `GET` | `/api/data?sector=Energy` | Filtered results example |
| `GET` | `/api/filters` | Distinct values for all filter fields |

**Supported query params:** `end_year`, `topic`, `sector`, `region`, `pestle`, `source`, `swot`, `country`, `city`

---

## 🌗 Theme Modes

| Mode | Description |
|------|-------------|
| ☀️ Light | White cards on light gray background |
| 🌙 Dark | Dark navy background with darker cards |
| 🖥️ System | Follows your OS preference automatically |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
