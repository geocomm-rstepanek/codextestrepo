# Support Team Issue Resolution Dashboard

Interactive D3-based analytics dashboard visualizing:

- Issue Volume
- Time to Resolution (TTR)
- Product Distribution
- Technician Performance
- Geographic Distribution
- Time Filtering (YTD, Quarter, Month, Custom Range)

## Tech Stack

- D3 v7
- Vanilla JavaScript
- HTML/CSS
- GeoJSON (US Map)

## Architecture Overview

The dashboard follows a modular chart architecture:

- `state.js` manages global UI state
- `filters.js` manages data filtering logic
- `charts/` contains isolated chart modules
- `dashboard.js` orchestrates rendering

## Data Model

Each issue object contains:

{
id: number,
technician: string,
product: string,
customer: string,
city: string,
lat: number,
lon: number,
creationDate: Date,
resolutionDate: Date,
ttrHours: number
}


## Goals

- Modular D3 charts
- Coordinated filtering
- Animation transitions
- Clean SaaS aesthetic
- Extensible architecture
