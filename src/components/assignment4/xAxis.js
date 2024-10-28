//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate

import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import React from 'react';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';


function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    const xAxisRef = useRef()
    const [isLinear, setIsLinear] = useState(true);
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    // useEffect(() => {
    //     setIsLinear(typeof xScale.domain()[0] === "number");
    //     const axis = d3.axisBottom(xScale);
    //     const xAxis = d3.select(xAxisRef.current).call(axis);

    //     if (!isLinear) {
    //         xAxis.selectAll(".tick text")
    //             .style("text-anchor", "start")
    //             .attr("dx", "1em")
    //             .attr("dy", "-0.45em")
    //             .attr("transform", "rotate(80)");
    //     }
    // }, [xScale, isLinear]);
            

    if (xScale)//{return (
        // <g className="x-axis" transform={`translate(0, ${height})`} ref={xAxisRef}>
        //     {axisLable && (
        //         <text x={width/2} y={isLinear? 30:50} 
        //         textAnchor="end" style={{fontSize:"14px", fill:"#000"}}>
        //             {axisLable}
        //         </text>
        //     )}
        return <g>
        {/* //the if(xScale){...} means when xScale is not null, the component will return the x-axis; otherwise, it returns <g></g>
        //         //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
        //         //all your code should be put in this block. Remember to use typeof check if the xScale is linear or discrete. */}
        {typeof xScale.domain()[0] === 'number' ? (
            <>
                <g ref={ref => ref && select(ref).call(axisBottom(xScale))} transform={`translate(0, ${height})`} />
                <text
                    style={{ textAnchor:'end', fontSize:'15px' }}
                    x={width} 
                    y={height - 10} 
                    dy="-0.5em">
                    {axisLable}
                </text>
                    </>) : (
            <>
                <g ref={ref => {
                                if (ref) {
                                    const axis = axisBottom(xScale).ticks(0);
                                    select(ref).call(axis);
                                    select(ref).selectAll("line").remove();
                                    select(ref).selectAll("text")
                                        .attr("transform", "rotate(80)")
                                        .style("text-anchor", "start");
                                }
                            }}
                            transform={`translate(0, ${height})`}/>
                        <text
                            style={{ textAnchor: 'middle', fontSize: '15px' }}
                            x={xScale(xScale.domain()[0]) + xScale.bandwidth() / 2}
                            y={height + 20}>
                            {axisLable}
                        </text>
            </>
        )}
        </g>
    
    else {
        return <g></g>
    }
}

export default XAxis