import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import React from 'react';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';


function YAxis(props){
    const { yScale, height, axisLable } = props;
    const axisRef = useRef(null);

    // useEffect(() => {
    //     if (yScale && typeof yScale.ticks === 'function') {
    //         const yAxis = d3.axisLeft(yScale).ticks(10);
    //         d3.select(axisRef.current).call(yAxis);
    //     }
    // }, [yScale]);


    if(yScale){
        // return <g className="y-axis" transform={`translate(0, 0)`} ref={axisRef}>
            
        // {/* //the if(yScale){...} means when xScale is not null, the component will return the y-axis; otherwise, it returns <g></g>
        // //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
        // //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */}
   
        //     <text style={{ textAnchor:'middle', fontSize:'14px'}} 
        //     transform={`rotate(-90)`}//translate(20, 0)
        //     x={-height/2}
        //     y={-40}
        //     dy="1em">
        //         {axisLable}
        //     </text>
        // </g>
        return <g>
            
        {typeof yScale.domain()[0] === 'number' ? (<>
                    <g ref={ref => ref && select(ref).call(axisLeft(yScale))} />
                    <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(20, 0)rotate(-90)`}>
                        {axisLable}
                    </text>
                </>) : (<>
                    <g ref={ref => ref && select(ref).call(axisLeft(yScale))} />
                    <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(20, 0)rotate(-90)`}>
                        {axisLable}
                    </text>
                </>)}
        </g>
    } else {
        return <g></g>
    }

}

export default YAxis