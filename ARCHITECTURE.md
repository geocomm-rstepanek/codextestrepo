# Architecture

## Overview
The dashboard is a static, client-side analytics app built with D3 v7 and ES modules.

- `dashboard.html`: Layout shell and chart mount points.
- `dashboard.js`: UI wiring, filter control handlers, and render orchestration.
- `state.js`: Sample data generation and globally shared UI state.
- `filters.js`: Time + dimension filtering pipeline.
- `charts/`: Isolated renderers for each visualization.
- `styles.css`: Shared visual styling and layout.

## Data Flow
1. `state.js` creates `issueData` and initializes `uiState`.
2. User interactions mutate `uiState` in `dashboard.js` or chart callbacks.
3. `getFiltered()` in `filters.js` derives currently visible records.
4. `dashboard.js` re-renders all chart modules from filtered data.
5. Chart click interactions can set cross-chart filters and trigger render.

## Current Chart Modules
- `charts/timeline.js`: Monthly trend + brush for custom date range.
- `charts/product.js`: Product distribution bar chart.
- `charts/customer.js`: Top city distribution bar chart.
- `charts/severity.js`: Severity count bar chart.
- `charts/heatmap.js`: Product-by-city heatmap.
- `charts/boxplot.js`: TTR distribution by technician.
- `charts/stepHistogram.js`: Ticket volume bars + rolling trend.
- `charts/geo.js`: US map with city bubble counts.
- `charts/kpis.js`: KPI number updates and active-filter label.

## Extensibility Notes
- Add new dimensions in `state.js` and augment `uiState` with a selected value.
- Add associated filter logic in `filters.js`.
- Add a dedicated chart module in `charts/` and call it from `dashboard.js`.
- Keep chart modules stateless apart from `uiState` interactions.
