import React, { useState } from 'react';

function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, setSelectedStation} = props;

    // Define state to track the station name of the hovered bar
    // const [selectedStation, setSelectedStation] = useState(null);
    // handle mouse enter, changes the selected station
    const handleMouseEnter = (station) => {
        setSelectedStation(station);
    };

    // handle mouse out, resets the selected station
    const handleMouseOut = () => {
        setSelectedStation(null);
    };

    // Get color based on whether the bar is selected
    const getColor = (selectedStation, station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
            {/* {task:
                    1. remove this comments and put your code here
                    2. pay attention to the height of the bars, it should be height-yScale(d.start)} */}
            {data.map((d, i) => (
                    <rect
                        key={i}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}  // Ensure the width fits within the scale
                        height={height - yScale(d.start)}
                        fill={getColor(selectedStation, d.station)}  // color
                        stroke="black"
                        strokeWidth={1}
                        onMouseEnter={() => handleMouseEnter(d.station)}  // Mouse enter handler
                        onMouseOut={handleMouseOut}  // Mouse out handler
                    />
                ))}
            
            </g>
    } else {
        return <g></g>
    }
}

export default Bars