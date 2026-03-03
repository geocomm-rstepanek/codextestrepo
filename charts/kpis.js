import { uiState } from "../state.js";

export function updateKPIs(data){
  d3.select("#totalIssues").text(data.length);
  d3.select("#avgTTR").text(data.length?d3.mean(data,d=>d.ttrHours).toFixed(1):"-");

  let filters=[];
  if(uiState.selectedTech!=="All") filters.push(uiState.selectedTech);
  if(uiState.selectedProduct) filters.push(uiState.selectedProduct);
  if(uiState.selectedCustomer) filters.push(uiState.selectedCustomer);
  if(uiState.selectedSeverity) filters.push(uiState.selectedSeverity);
  if(uiState.brushedRange) filters.push("Custom Range");
  d3.select("#activeFilters").text(filters.length?filters.join(" | "):"None");
}
