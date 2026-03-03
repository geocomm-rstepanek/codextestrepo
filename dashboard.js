import { technicians, severities, uiState } from "./state.js";
import { getFiltered } from "./filters.js";
import { renderTimeline } from "./charts/timeline.js";
import { updateKPIs } from "./charts/kpis.js";
import { renderProduct } from "./charts/product.js";
import { renderCustomer } from "./charts/customer.js";
import { renderHeatmap } from "./charts/heatmap.js";
import { renderBox } from "./charts/boxplot.js";
import { renderStepHistogram } from "./charts/stepHistogram.js";
import { renderGeo } from "./charts/geo.js";
import { renderSeverity } from "./charts/severity.js";

const techFilter=d3.select("#techFilter");
technicians.forEach(t=>techFilter.append("option").attr("value",t).text(t));

const severityFilter=d3.select("#severityFilter");
severityFilter.append("option").attr("value","All").text("All Severities");
severities.forEach(level=>severityFilter.append("option").attr("value",level).text(level));

const granSel=d3.select("#timeGranularity");
const timeSel=d3.select("#timeSelection");

function updateTimeSelector(){
  timeSel.html("");
  if(uiState.timeGranularity==="ytd"){
    timeSel.style("display","none");
    uiState.timeSelection=null;
    return;
  }
  timeSel.style("display","inline-block");
  if(uiState.timeGranularity==="quarter"){
    ["1","2","3","4"].forEach(q=>timeSel.append("option").attr("value",q).text("Q"+q));
  }
  if(uiState.timeGranularity==="month"){
    d3.range(12).forEach(m=>timeSel.append("option").attr("value",m)
      .text(d3.timeFormat("%B")(new Date(2025,m,1))));
  }
  uiState.timeSelection=timeSel.node().value;
}

granSel.on("change",()=>{
  uiState.timeGranularity=granSel.node().value;
  uiState.brushedRange=null;
  updateTimeSelector();
  render();
});

timeSel.on("change",()=>{
  uiState.timeSelection=timeSel.node().value;
  render();
});

techFilter.on("change",()=>{
  uiState.selectedTech=techFilter.node().value;
  render();
});

severityFilter.on("change",()=>{
  uiState.selectedSeverity=severityFilter.node().value==="All"?null:severityFilter.node().value;
  render();
});

async function render(){
  const data=getFiltered();
  updateKPIs(data);
  renderProduct(data, render);
  renderCustomer(data, render);
  renderSeverity(data, render);
  renderHeatmap(data, render);
  renderBox(data);
  renderStepHistogram(data);
  await renderGeo(data);
}

updateTimeSelector();
renderTimeline(render);
render();
