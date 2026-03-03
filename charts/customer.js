import { uiState } from "../state.js";

export function renderCustomer(data, onChange){
  const svg=d3.select("#customerChart");
  svg.selectAll("*").remove();
  const m={top:20,right:20,bottom:115,left:48};
  const w=350,h=260;

  const agg=d3.rollups(data,v=>v.length,d=>d.customer)
    .map(([key,value])=>({key,value}))
    .sort((a,b)=>b.value-a.value);

  const topCities=agg.slice(0,10);

  if(uiState.selectedCustomer && !topCities.some(d=>d.key===uiState.selectedCustomer)){
    const selectedRow=agg.find(d=>d.key===uiState.selectedCustomer);
    if(selectedRow){
      topCities[topCities.length-1]=selectedRow;
    }
  }

  const x=d3.scaleBand().domain(topCities.map(d=>d.key)).range([m.left,w-m.right]).padding(0.2);
  const y=d3.scaleLinear().domain([0,d3.max(topCities,d=>d.value)||1]).nice().range([h-m.bottom,m.top]);

  svg.selectAll(".bar")
    .data(topCities,d=>d.key)
    .enter().append("rect")
    .attr("class",d=>"bar"+(uiState.selectedCustomer===d.key?" active":""))
    .attr("x",d=>x(d.key))
    .attr("width",x.bandwidth())
    .attr("y",h-m.bottom)
    .attr("height",0)
    .on("click",(e,d)=>{
      uiState.selectedCustomer=uiState.selectedCustomer===d.key?null:d.key;
      onChange();
    })
    .transition().duration(600)
    .attr("y",d=>y(d.value))
    .attr("height",d=>h-m.bottom-y(d.value));

  svg.append("g").attr("transform",`translate(0,${h-m.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform","rotate(-45)")
    .style("text-anchor","end");

  svg.append("g")
    .attr("transform",`translate(${m.left},0)`)
    .call(d3.axisLeft(y).ticks(4));

  svg.append("text")
    .attr("x",m.left)
    .attr("y",12)
    .attr("font-size","11px")
    .attr("fill","#64748b")
    .text("Top 10 Cities by Issue Volume");
}
