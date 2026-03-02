export async function renderGeo(data){
  const svg=d3.select("#geoMap");
  svg.selectAll("*").remove();
  const width=720, height=320;

  try {
    const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
    const states = topojson.feature(us, us.objects.states);

    const projection=d3.geoAlbersUsa().fitSize([width,height], states);
    const path=d3.geoPath(projection);

    svg.append("g")
      .selectAll("path")
      .data(states.features)
      .join("path")
      .attr("class","map-state")
      .attr("d",path);

    const cityAgg=d3.rollups(data,v=>v.length,d=>`${d.city}|${d.lat}|${d.lon}`)
      .map(([key,value])=>{
        const [city,lat,lon]=key.split("|");
        return {city,lat:+lat,lon:+lon,value};
      });

    const r=d3.scaleSqrt().domain([0,d3.max(cityAgg,d=>d.value)||1]).range([3,14]);

    svg.append("g")
      .selectAll("circle")
      .data(cityAgg)
      .join("circle")
      .attr("class","geo-point")
      .attr("cx",d=>projection([d.lon,d.lat])?.[0])
      .attr("cy",d=>projection([d.lon,d.lat])?.[1])
      .attr("r",d=>r(d.value))
      .append("title")
      .text(d=>`${d.city}: ${d.value} issues`);
  } catch {
    svg.append("text")
      .attr("x", 16)
      .attr("y", 28)
      .attr("fill", "#64748b")
      .attr("font-size", "13px")
      .text("Unable to load US map data in this environment.");
  }
}
