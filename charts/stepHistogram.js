export function renderStepHistogram(data){
  const svg = d3.select("#stepHistogram");
  svg.selectAll("*").remove();

  const width = 1000;
  const height = 260;
  const m = { top: 44, right: 28, bottom: 44, left: 56 };
  svg.attr("viewBox", `0 0 ${width} ${height}`);

  if(!data.length) return;

  const [minDate, maxDate] = d3.extent(data, d => d.creationDate);
  const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
  const useDaily = totalDays < 60;
  const timeBin = useDaily ? d3.timeDay : d3.timeWeek;

  const bins = d3.rollups(
    data,
    v => v.length,
    d => timeBin.floor(d.creationDate)
  ).map(([date, count]) => ({ date, count })).sort((a,b) => a.date - b.date);

  const windowSize = useDaily ? 7 : 2;
  bins.forEach((d,i) => {
    const start = Math.max(0, i - windowSize + 1);
    const subset = bins.slice(start, i + 1);
    d.rolling = d3.mean(subset, s => s.count);
  });

  const x = d3.scaleTime().domain([minDate, maxDate]).range([m.left, width - m.right]);
  const xBars = d3.scaleBand()
    .domain(bins.map(d => d.date.getTime()))
    .range([m.left, width - m.right])
    .padding(0.18);

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => Math.max(d.count, d.rolling))])
    .nice()
    .range([height - m.bottom, m.top]);

  svg.append("g")
    .attr("transform", `translate(${m.left},0)`)
    .call(d3.axisLeft(y).tickSize(-(width - m.left - m.right)).tickFormat(""))
    .selectAll("line")
    .attr("stroke", "#e5e7eb")
    .attr("stroke-dasharray", "3 3");

  svg.append("g")
    .attr("transform", `translate(0,${height - m.bottom})`)
    .call(d3.axisBottom(x).ticks(useDaily ? d3.timeWeek.every(1) : d3.timeMonth.every(1)))
    .selectAll("text")
    .attr("fill", "#6b7280");

  svg.append("g")
    .attr("transform", `translate(${m.left},0)`)
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("fill", "#6b7280");

  svg.selectAll(".bar")
    .data(bins)
    .join("rect")
    .attr("class","bar")
    .attr("x", d => xBars(d.date.getTime()))
    .attr("y", height - m.bottom)
    .attr("width", xBars.bandwidth())
    .attr("height", 0)
    .attr("rx", 5)
    .attr("fill", "#6366f1")
    .attr("opacity", 0.75)
    .transition()
    .duration(700)
    .ease(d3.easeCubicOut)
    .attr("y", d => y(d.count))
    .attr("height", d => height - m.bottom - y(d.count));

  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.rolling))
    .curve(d3.curveMonotoneX);

  const path = svg.append("path")
    .datum(bins)
    .attr("fill","none")
    .attr("stroke","#10b981")
    .attr("stroke-width",2.5)
    .attr("d", line);

  const totalLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(900)
    .ease(d3.easeCubicOut)
    .attr("stroke-dashoffset", 0);

  svg.append("text")
    .attr("x", m.left)
    .attr("y", 20)
    .attr("font-size", "13px")
    .attr("fill", "#9ca3af")
    .text(useDaily ? "Daily Volume with 7-Day Trend" : "Weekly Volume with 2-Week Trend");
}
