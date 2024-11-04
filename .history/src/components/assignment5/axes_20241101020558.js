import React from "react";

export { XAxis, YAxis };
//TODO: complete the YAxis
// 1.Draw the y-axis, using <line>;
// 2.Draw the ticks, using yScale.domain() to get the ticks (i.e., names of airlines);
// For each tick line, we set x1={-5}, x2={0}, y1 and y2 are the half of yScale.bandwidth()
// For the tick text, we set style={{textAnchor: 'start', fontSize:'10px'}}, x={-offsetX+10},y={yScale.bandwidth()/2}
function YAxis (props) {
    const { yScale, height, offsetX } = props;
    return <g>
        {<line x2={width} stroke='black'/>}
        {yScale.ticks(5).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} x={5} y={20}>
                    {tickValue}
                </text>
            </g>
        )}


        {/* <g ref={ref => {if (ref) {const axis = axisBottom(yScale).ticks(0);
                                    select(ref).call(axis);
                                    // select(ref).selectAll("line").remove();
                                    select(ref).selectAll("text")
                                        .attr("transform")
                                        .style("text-anchor", "start");
                                }
                            }}
                            transform={`translate(0, ${height})`}/>
                        <text
                            style={{ textAnchor: 'middle', fontSize: '15px' }}
                            x={yScale(yScale.domain()[0]) + yScale.bandwidth() / 2}
                            y={height + 20}>
                            {axisLable}
                        </text> */}
    </g>
}

function XAxis(props) {
    const { xScale, width, height} = props;

    return <g transform={`translate(${0}, ${height})`}>
        {<line x2={width} stroke='black'/>}
        {xScale.ticks(5).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} x={5} y={20}>
                    {tickValue}
                </text>
            </g>
        )}
    </g>
    
}