import React from "react";
import {scalePoint, scaleLinear} from "d3";
import * as d3 from "d3";
import { XAxis, YAxis } from "./axes_linechart";
import { groupByYear } from "./utils";

export function LineChart (props) {
    // Sort data by popularity and select top 5 and bottom 5
    const {data, width, height, top, right, bottom, left, selectedYear }= props;
    // console.log("Original Data:", data);

    if (selectedYear){
        let selectedSongs = routes.filter(a => a.song === selectedYear);
        let songs = groupByYear(selectedSongs);

        // ensure popularity is a number
        songs.forEach(d => {
            d.popularity = parseFloat(d.popularity);
          });
        
        // const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);
        const sortedData = [...songs].sort((a, b) => {
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


        
    } else {

    }
    

    
}
