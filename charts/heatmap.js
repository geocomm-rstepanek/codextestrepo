import { products, uiState } from "../state.js";

export function renderHeatmap(data, onChange){
  const svg=d3.select("#heatmap");
  svg.selectAll("*").remove();
  const m={top:25,right:20,bottom:35,left:120};
  const w=720,h=420;

  const cityAgg=d3.rollups(data,v=>v.length,d=>d.customer)
    .map(([city,value])=>({city,value}))
    .sort((a,b)=>b.value-a.value);

  const visibleCities=cityAgg.slice(0,12).map(d=>d.city);
  if(uiState.selectedCustomer && !visibleCities.includes(uiState.selectedCustomer)){
    visibleCities[visibleCities.length-1]=uiState.selectedCustomer;
  }

  const matrix=[];
  products.forEach(p=>{
    visibleCities.forEach(c=>{
      matrix.push({
        product:p,
        customer:c,
        value:data.filter(d=>d.product===p && d.customer===c).length
      });
    });
  });

  const x=d3.scaleBand().domain(products).range([m.left,w-m.right]).padding(0.06);
  const y=d3.scaleBand().domain(visibleCities).range([m.top,h-m.bottom]).padding(0.06);
  const color=d3.scaleSequential(d3.interpolateBlues)
    .domain([0,d3.max(matrix,d=>d.value)||1]);

  svg.selectAll(".heat-cell")
    .data(matrix)
    .enter().append("rect")
    .attr("class","heat-cell")
    .attr("x",d=>x(d.product))
    .attr("y",d=>y(d.customer))
    .attr("width",x.bandwidth())
    .attr("height",y.bandwidth())
    .attr("fill",d=>color(d.value))
    .on("click",(e,d)=>{
      uiState.selectedProduct=d.product;
      uiState.selectedCustomer=d.customer;
      onChange();
    });

  svg.append("g").attr("transform",`translate(${m.left},0)`).call(d3.axisLeft(y));
  svg.append("g").attr("transform",`translate(0,${h-m.bottom})`).call(d3.axisBottom(x));

  svg.append("text")
    .attr("x",m.left)
    .attr("y",14)
    .attr("font-size","11px")
    .attr("fill","#64748b")
    .text("Product vs Top 12 Cities");
}
