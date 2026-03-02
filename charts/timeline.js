import { issueData, uiState } from "../state.js";

export function renderTimeline(onBrush){
  const svg=d3.select("#timeline");
  svg.selectAll("*").remove();
  const m=40,w=1000,h=120;

  const x=d3.scaleTime()
    .domain(d3.extent(issueData,d=>d.creationDate))
    .range([m,w-m]);

  const monthly=d3.rollups(issueData,v=>v.length,d=>d3.timeMonth(d.creationDate))
    .map(d=>({date:d[0],value:d[1]}))
    .sort((a,b)=>a.date-b.date);

  const y=d3.scaleLinear().domain([0,d3.max(monthly,d=>d.value)]).range([h-m,m]);

  svg.append("path")
    .datum(monthly)
    .attr("fill","none")
    .attr("stroke","#6366f1")
    .attr("stroke-width",2)
    .attr("d",d3.line().x(d=>x(d.date)).y(d=>y(d.value)));

  svg.append("g").attr("transform",`translate(0,${h-m})`).call(d3.axisBottom(x));

  const brush=d3.brushX()
    .extent([[m,m],[w-m,h-m]])
    .on("end",(event)=>{
      if(!event.selection){uiState.brushedRange=null;onBrush();return;}
      const [x0,x1]=event.selection.map(x.invert);
      uiState.brushedRange=[x0,x1];
      onBrush();
    });

  svg.append("g").attr("class","brush").call(brush);

  d3.select("#resetBrush").on("click",()=>{
    uiState.brushedRange=null;
    d3.select("#timeline").select(".brush").call(brush.move,null);
    onBrush();
  });
}
