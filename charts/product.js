import { products, uiState } from "../state.js";

export function renderProduct(data, onChange){
  const svg=d3.select("#productChart");
  svg.selectAll("*").remove();
  const m=50,w=350,h=260;

  const agg=d3.rollups(data,v=>v.length,d=>d.product)
    .map(d=>({key:d[0],value:d[1]}));

  const x=d3.scaleBand().domain(products).range([m,w-m]).padding(0.3);
  const y=d3.scaleLinear().domain([0,d3.max(agg,d=>d.value)||1]).nice().range([h-m,m]);

  svg.selectAll(".bar")
    .data(agg,d=>d.key)
    .enter().append("rect")
    .attr("class",d=>"bar"+(uiState.selectedProduct===d.key?" active":""))
    .attr("x",d=>x(d.key))
    .attr("width",x.bandwidth())
    .attr("y",h-m)
    .attr("height",0)
    .on("click",(e,d)=>{uiState.selectedProduct=uiState.selectedProduct===d.key?null:d.key;onChange();})
    .transition().duration(600)
    .attr("y",d=>y(d.value))
    .attr("height",d=>h-m-y(d.value));

  svg.append("g").attr("transform",`translate(0,${h-m})`).call(d3.axisBottom(x));
}
