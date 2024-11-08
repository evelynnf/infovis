import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID} = props;
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>
    const maxCount = max(data, d => d.count);

    // Define xScale (linear) and yScale (band)
    const xScale = scaleLinear()
        .domain([0, maxCount])
        .range([0, width]);

    const yScale = scaleBand()
        .domain(data.map(d => d.airline))
        .range([0, height])
        .padding(0.2);


    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {/* <Bars data={data} xScale={xScale} yScale={yScale} height={height} selectedAirlineID={selectedAirlineID} setSelectedAirlineID={setSelectedAirlineID}/> */}
        {/* Plot horizontal bars */}
        {data.map((d, i) => (
                <rect
                    key={i}
                    x={0}
                    y={yScale(d.airline)}
                    width={xScale(d.count)}
                    height={yScale.bandwidth()}
                    fill="#2a5599"
                    onClick={() => setSelectedAirlineID(d.id)}
                    style={{ cursor: 'pointer' }}
                />
            ))}

        <XAxis scale={xScale} transform={`translate(0, ${height})`} />
        <YAxis scale={yScale} />
    </g>
}