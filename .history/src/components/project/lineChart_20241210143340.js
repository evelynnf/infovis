import React from "react";
import { scaleBand, scaleLinear } from "d3";
import * as d3 from "d3";
import { XAxis, YAxis } from "./axes_linechart";

export function LineChart(props) {
  const { data, width, height, top, right, bottom, left, selectedYear } = props;

  // 如果有选定年份，只过滤出对应年份的数据
  const filteredData = selectedYear
    ? data.filter((d) => d.year === selectedYear)
    : data;

  // 获取 x 轴的所有 popularity_group
  const popularityGroups = Array.from(
    new Set(data.map((d) => d.popularity_group))
  );

  // 按年份分组
  const groupedByYear = d3.group(filteredData, (d) => d.year);

  // 定义 scales
  const xScale = scaleBand()
    .domain(popularityGroups) // x 轴是 popularity_group
    .range([left, width - right])
    .padding(0.2);

  const yScale = scaleLinear()
    .domain([0.2, 1]) // y 轴适用于所有指标
    .range([height - bottom, top+10]);

  // 定义线生成器
  const lineGenerator = (key) =>
    d3
      .line()
      .defined((d) => d[key] !== null && d[key] !== undefined && d[key] !== 0) // 跳过无效数据点
      .x((d) => xScale(d.popularity_group))
      .y((d) => yScale(d[key]))
      .curve(d3.curveMonotoneX);

  return (
    <svg width={width} height={height}>
      {/* Axes */}
      <XAxis xScale={xScale} height={height - bottom-10} />
      <YAxis yScale={yScale} width={left} />

      {/* 根据年份动态生成曲线 */}
      {Array.from(groupedByYear).map(([year, groupData], index) => (
        <React.Fragment key={index}>
          {/* avg_danceability 的曲线 */}
          <path
            d={lineGenerator("avg_danceability")(groupData)}
            fill="none"
            stroke="blue"
            strokeWidth={2}
          />
          {/* avg_energy 的曲线 */}
          <path
            d={lineGenerator("avg_energy")(groupData)}
            fill="none"
            stroke="green"
            strokeWidth={2}
          />
          {/* avg_tempo 的曲线 */}
          <path
            d={lineGenerator("avg_tempo")(groupData)}
            fill="none"
            stroke="red"
            strokeWidth={2}
          />

          {/* 数据点 */}
          {groupData.map((d, i) => (
            <React.Fragment key={`${year}-${i}`}>
              {/* avg_danceability 点 */}
              {d.avg_danceability !== null && d.avg_danceability !== undefined && (
                <circle
                  cx={xScale(d.popularity_group)}
                  cy={yScale(d.avg_danceability)}
                  r={4}
                  fill="blue"
                />
              )}
              {/* avg_energy 点 */}
              {d.avg_energy !== null && d.avg_energy !== undefined && (
                <circle
                  cx={xScale(d.popularity_group)}
                  cy={yScale(d.avg_energy)}
                  r={4}
                  fill="green"
                />
              )}
              {/* avg_tempo 点 */}
              {d.avg_tempo !== null && d.avg_tempo !== undefined && (
                <circle
                  cx={xScale(d.popularity_group)}
                  cy={yScale(d.avg_tempo)}
                  r={4}
                  fill="red"
                />
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    <g transform={`translate(${width - right - 80}, ${top})`}>
        {/* avg_danceability 图例 */}
        <rect x={0} y={0} width={10} height={10} fill="blue" />
        <text x={20} y={10} fontSize={10} alignmentBaseline="middle">
          Danceability
        </text>

        {/* avg_energy 图例 */}
        <rect x={0} y={20} width={10} height={10} fill="green" />
        <text x={20} y={30} fontSize={10} alignmentBaseline="middle">
          Energy
        </text>

        {/* avg_tempo 图例 */}
        <rect x={0} y={40} width={10} height={10} fill="red" />
        <text x={20} y={50} fontSize={10} alignmentBaseline="middle">
          Tempo
        </text>
      </g>
      <text
        x={width - right -150} 
        y={height - bottom + 20} 
        fontSize={14}
        textAnchor="middle"
      >
        Popularity
      </text>
    </svg>
  );
}