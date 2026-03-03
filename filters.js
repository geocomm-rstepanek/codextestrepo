import { issueData, uiState } from "./state.js";

export function timeFilter(d){
  if(uiState.brushedRange){
    return d.creationDate>=uiState.brushedRange[0] && d.creationDate<=uiState.brushedRange[1];
  }

  const date=d.creationDate;
  if(uiState.timeGranularity==="ytd") return date.getFullYear()===2025;

  if(uiState.timeGranularity==="quarter"){
    return Math.floor(date.getMonth()/3)+1===+uiState.timeSelection;
  }

  if(uiState.timeGranularity==="month"){
    return date.getMonth()===+uiState.timeSelection;
  }

  return true;
}

export function getFiltered(){
  return issueData.filter(d=>
    (uiState.selectedTech==="All"||d.technician===uiState.selectedTech) &&
    (!uiState.selectedProduct||d.product===uiState.selectedProduct) &&
    (!uiState.selectedCustomer||d.customer===uiState.selectedCustomer) &&
    (!uiState.selectedSeverity||d.severity===uiState.selectedSeverity) &&
    timeFilter(d)
  );
}
