import { products, customers, uiState } from "../state.js";

export function renderHeatmap(data, onChange){
  const svg=d3.select("#heatmap");
  svg.selectAll("*").remove();
  const m=60,w=720,h=300;

  const matrix=[];
  products.forEach(p=>{
    customers.forEach(c=>{
      matrix.push({
        product:p,
        customer:c,
        value:data.filter(d=>d.product===p && d.customer===c).length
      });
    });
  });

  const x=d3.scaleBand().domain(products).range([m,w-m]).padding(0.05);
  const y=d3.scaleBand().domain(customers).range([m,h-m]).padding(0.05);
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

  svg.append("g").attr("transform",`translate(0,${m})`).call(d3.axisLeft(y));
  svg.append("g").attr("transform",`translate(0,${h-m})`).call(d3.axisBottom(x));
}
