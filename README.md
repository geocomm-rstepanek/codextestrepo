# Support Team Issue Resolution Dashboard

Interactive D3-based analytics dashboard visualizing:

- Issue Volume
- Time to Resolution (TTR)
- Product Distribution
- Severity Distribution
- Technician Performance
- Geographic Distribution (US map + city bubbles across 30 continental US cities)
- Time Filtering (YTD, Quarter, Month, Custom Range)

## Tech Stack

- D3 v7
- Vanilla JavaScript (ES modules)
- HTML/CSS
- GeoJSON/TopoJSON (US Map)

## Architecture Overview

The dashboard follows a modular chart architecture:

- `state.js` manages global UI state + sample data generation
- `filters.js` manages data filtering logic
- `charts/` contains isolated chart modules
- `dashboard.js` orchestrates control wiring + rendering
- `styles.css` contains shared styles
- `ARCHITECTURE.md` documents component responsibilities and data flow

## Data Model

Each issue object contains:

```js
{
  id: number,
  technician: string,
  product: string,
  customer: string, // city name
  city: string,
  lat: number,
  lon: number,
  severity: "Critical" | "High" | "Medium" | "Low",
  creationDate: Date,
  resolutionDate: Date,
  ttrHours: number
}
```

## Run locally

```bash
npm start
```

Then open `http://localhost:3000/dashboard.html` (requires Python 3 for the local static server).

## Goals

- Modular D3 charts
- Coordinated filtering
- Animation transitions
- Clean SaaS aesthetic
- Extensible architecture
