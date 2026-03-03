# Changelog

## Unreleased

### Added
- Added `ARCHITECTURE.md` to document module boundaries, data flow, and extension points.
- Added issue severity to generated data (`Critical`, `High`, `Medium`, `Low`).
- Added severity filter control in the dashboard toolbar.
- Added `charts/severity.js` for severity count visualization.

### Changed
- Updated filtering pipeline to include severity in `getFiltered()`.
- Updated KPI active-filter text to include severity selection.
- Updated layout to include a dedicated severity chart card.
- Updated README data model and feature list for severity support.
