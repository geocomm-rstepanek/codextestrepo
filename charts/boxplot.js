export function renderBox(data){
  const svg=d3.select("#boxPlot");
  svg.selectAll("*").remove();
  const m=50,w=350,h=260;

  const grouped=d3.groups(data,d=>d.technician);

  const stats=grouped.map(([tech,values])=>{
    const ttrs=values.map(d=>d.ttrHours).sort(d3.ascending);
    if(!ttrs.length) return null;
    return {
      tech,
      q1:d3.quantile(ttrs,0.25),
      median:d3.quantile(ttrs,0.5),
      q3:d3.quantile(ttrs,0.75),
      min:d3.min(ttrs),
      max:d3.max(ttrs)
    };
  }).filter(Boolean);

  const x=d3.scaleBand().domain(stats.map(d=>d.tech)).range([m,w-m]).padding(0.4);
  const y=d3.scaleLinear().domain([0,d3.max(stats,d=>d.max)||1]).nice().range([h-m,m]);

  svg.append("g").attr("transform",`translate(0,${h-m})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform","rotate(-30)")
    .style("text-anchor","end");

  svg.append("g").attr("transform",`translate(${m},0)`).call(d3.axisLeft(y));

  stats.forEach(d=>{
    const cx=x(d.tech)+x.bandwidth()/2;
    svg.append("line").attr("class","whisker")
      .attr("x1",cx).attr("x2",cx)
      .attr("y1",y(d.min)).attr("y2",y(d.max));

    svg.append("rect").attr("class","box")
      .attr("x",x(d.tech))
      .attr("y",y(d.q3))
      .attr("width",x.bandwidth())
      .attr("height",y(d.q1)-y(d.q3));

    svg.append("line").attr("class","median")
      .attr("x1",x(d.tech))
      .attr("x2",x(d.tech)+x.bandwidth())
      .attr("y1",y(d.median))
      .attr("y2",y(d.median));
  });
}
