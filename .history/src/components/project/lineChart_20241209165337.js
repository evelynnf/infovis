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
        let selectedSongs = data.filter(a => a.year === selectedYear);
        
        // ensure popularity is a number
        selectedSongs.forEach(d => {
            d.popularity = parseFloat(d.popularity);
          });

        console.log("songs:", selectedSongs)
        
        // const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);
        const sortedData = [...selectedSongs].sort((a, b) => {
            // console.log("Comparing:", b.popularity, "and", a.popularity);
            return Number(b.popularity) - Number(a.popularity);
          });
        console.log("sorted:", sortedData)

        const selectedData = [...sortedData.slice(0, 10)];
        console.log("selected:", selectedData) 
    
    } else {
        data.forEach(d => {
            d.popularity = parseFloat(d.popularity);
          });

        console.log("all songs:", data)
        
        // const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);
        const sortedData = [...data].sort((a, b) => {
            // console.log("Comparing:", b.popularity, "and", a.popularity);
            return Number(b.popularity) - Number(a.popularity);
          });
        
        const selectedData = [...sortedData.slice(0, 10)];
        console.log("selected:", selectedData) 
    }
    
        
    
}
