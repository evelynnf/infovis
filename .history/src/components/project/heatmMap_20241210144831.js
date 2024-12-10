import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

function Heatmap({ width, height, data, selectedYear}) {
  const svgRef = useRef();
  const [mode, key] = useState([]);
  const selectedSongs = selectedYear ? data.filter((song) => song.year === selectedYear) : data;

  // const svgRef = useRef();

  useEffect(() => {

    selectedSongs.forEach(d => {
      d.popularity = parseFloat(d.popularity); // Ensure it's a number
    });

    // Convert mode and key to integers
    selectedSongs.forEach(d => {
      d.mode = +d.mode;
      d.key = +d.key;
    });


    const counts = d3.rollups(
      selectedSongs,
      v => v.length,
      d => d.key, // Group by key
      d => d.mode // Group by mode
    );

    const heatmapData = [];
    counts.forEach(([key, modeCounts]) => {
      modeCounts.forEach(([mode, count]) => {
        heatmapData.push({ key, mode, count });
      });
    });

    // 添加确保每个key和mode组合都被显示（即使count为零）
    const allKeys = [...new Set(heatmapData.map(d => d.key))];
    const allModes = [0, 1]; // Minor (0) and Major (1)
  
    // 为每个key和mode组合填充数据
    allKeys.forEach((key) => {
      allModes.forEach((mode) => {
          const existingData = heatmapData.find(d => d.key === key && d.mode === mode);
          if (!existingData) {
            heatmapData.push({ key, mode, count: 0 }); // Add zero count for missing combinations
          }
        });
      });

    drawHeatmap(heatmapData);
  }, [data, selectedYear]); // Redraw when data changes

  const drawHeatmap = (heatmapData) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content


    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg
      .attr("width", width)
      .attr("height", height);

    const modeMap = {
      0: "Minor",
      1: "Major"
    };

    const keyMap = {
      0: "C",
      1: "C♯",
      2: "D",
      3: "D♯",
      4: "E",
      5: "F",
      6: "F♯",
      7: "G",
      8: "G♯",
      9: "A",
      10: "A♯",
      11: "B"
    };


    // Define scales for x (key) and y (mode)
    const x = d3.scaleBand()
      .domain([...new Set(heatmapData.map(d => d.key))].sort((a, b) => a - b)) // Get unique keys
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleBand()
      //.domain([...new Set(heatmapData.map(d => d.mode))].map(mode => modeMap[mode])) // Get unique modes
      .domain(["Minor", "Major"])
      .range([0, innerHeight])
      .padding(0.1);

    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(heatmapData, d => d.count)]);

    // Add x and y axes
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top + innerHeight})`)
      .call(d3.axisBottom(x).tickFormat((d) => keyMap[d]));

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y))
      .style("fontsize", "12px");

    // Draw the heatmap cells
    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll(".cell")
      .data(heatmapData)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", d => x(d.key))
      .attr("y", d => y(modeMap[d.mode]))
      .attr("width", x.bandwidth()) // Width of each cell
      .attr("height", y.bandwidth()) // Height of each cell
      .style("fill", d => colorScale(d.count)) // Color based on count
      .style("font-family", "Times New Roman")
      .style("stroke", "white")
      .style("stroke-width", 0.5);
  };

  return <svg ref={svgRef}></svg>;
};

export {Heatmap};
