import { severities, uiState } from "../state.js";

export function renderSeverity(data, onChange){
  const svg=d3.select("#severityChart");
  svg.selectAll("*").remove();
  const w=350,h=260,m={top:24,right:20,bottom:44,left:48};

  const counts=new Map(d3.rollup(data,v=>v.length,d=>d.severity));
  const series=severities.map(level=>({
    key:level,
    value:counts.get(level)||0
  }));

  const x=d3.scaleBand().domain(severities).range([m.left,w-m.right]).padding(0.25);
  const y=d3.scaleLinear().domain([0,d3.max(series,d=>d.value)||1]).nice().range([h-m.bottom,m.top]);

  svg.selectAll(".bar")
    .data(series,d=>d.key)
    .join("rect")
    .attr("class",d=>"bar"+(uiState.selectedSeverity===d.key?" active":""))
    .attr("x",d=>x(d.key))
    .attr("width",x.bandwidth())
    .attr("y",h-m.bottom)
    .attr("height",0)
    .on("click",(e,d)=>{
      uiState.selectedSeverity=uiState.selectedSeverity===d.key?null:d.key;
      onChange();
    })
    .transition()
    .duration(500)
    .attr("y",d=>y(d.value))
    .attr("height",d=>h-m.bottom-y(d.value));

  svg.append("g")
    .attr("transform",`translate(0,${h-m.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform",`translate(${m.left},0)`)
    .call(d3.axisLeft(y).ticks(4));

  svg.append("text")
    .attr("x",m.left)
    .attr("y",14)
    .attr("font-size","11px")
    .attr("fill","#64748b")
    .text("Issue Severity Distribution");
}
