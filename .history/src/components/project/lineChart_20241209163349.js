import React from "react";
import {scalePoint, scaleLinear} from "d3";
import * as d3 from "d3";
import { XAxis, YAxis } from "./axes_linechart";

export function LineChart (props) {
    // Sort data by popularity and select top 5 and bottom 5
    const {data, width, height, top, right, bottom, left, selectedYear }= props;
    // console.log("Original Data:", data);

    if (selectedYear){
        let selectedSongs = routes.filter(a => a.song === selectedYear);
        let songs = groupByY(selectedSongs);

    } else {

    }


    // ensure popularity is a number
    data.forEach(d => {
        d.popularity = parseFloat(d.popularity);
      });
    
    // const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);
    const sortedData = [...data].sort((a, b) => {
        // console.log("Comparing:", b.popularity, "and", a.popularity);
        return Number(b.popularity) - Number(a.popularity);
      });
    console.log("sorted:", sortedData)

    const selectedData = [...sortedData.slice(0, 10)];
    console.log("selected:", selectedData)  

    // Scales
    const xScale = d3
    .scaleBand().range([left, width - right])
    .domain(selectedData.map(d => d.song)) // 歌名
    .padding(0.2);

    const yScale = scaleLinear().domain([0, 1]).range([height - bottom, top]); // y轴从下到上

    // Line generator
    const lineGenerator = (key) =>
        d3.line().x(d => xScale(d.song)).y(d => yScale(d[key]))
        .curve(d3.curveMonotoneX);

    // const lineGenerator = d3
    //     .line()
    //     .x(d => xScale(d.song))
    //     .y(d => yScale(d.popularity)) // 或其他字段
    //     .curve(d3.curveMonotoneX); // 添加平滑曲线
    
    return (
        <svg width={width} height={height}>
            {/* Axes */}
            <XAxis xScale={xScale} height={height - bottom} />
            <YAxis yScale={yScale} width={left} />

            {/* Lines */}
            <path
                d={lineGenerator("popularity")(selectedData)}
                fill="none"
                stroke="blue"
                strokeWidth={2}
            />
            <path
                d={lineGenerator("danceability")(selectedData)}
                fill="none"
                stroke="green"
                strokeWidth={2}
            />
            <path
                d={lineGenerator("energy")(selectedData)}
                fill="none"
                stroke="red"
                strokeWidth={2}
            />

            {/* Points */}
            {selectedData.map((d, i) => (
                <>
                    {/* Popularity points */}
                    <circle
                        key={`popularity-${i}`}
                        cx={xScale(d.song)}
                        cy={yScale(d.popularity)}
                        r={4}
                        fill="blue"
                    />
                    {/* Danceability points */}
                    <circle
                        key={`danceability-${i}`}
                        cx={xScale(d.song)}
                        cy={yScale(d.danceability)}
                        r={4}
                        fill="green"
                    />
                    {/* Energy points */}
                    <circle
                        key={`energy-${i}`}
                        cx={xScale(d.song)}
                        cy={yScale(d.energy)}
                        r={4}
                        fill="red"
                    />
                </>
            ))}
        </svg>
    );
}
