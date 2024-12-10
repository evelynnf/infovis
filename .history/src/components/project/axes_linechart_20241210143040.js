import React from "react";


function YAxis(props) {
    const { yScale, width } = props;
    return (
        <g>
            {/* y-axis */}
            <line x1={50} x2={50} y1={yScale.range()[0]} y2={yScale.range()[1]-10} stroke="black" />
            {/* ticks and text */}
            {yScale.ticks(4).map((tickValue) => (
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)-10})`}>
                    <line x1={40} x2={50} stroke="black" />
                    <text style={{ textAnchor: "end", fontSize: "10px" }} x={30} dy="0.32em">
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}

function XAxis(props) {
    const { xScale, height } = props;
    return (
        <g transform={`translate(0, ${height})`}>
            {/* x-axis */}
            <line x1={xScale.range()[0]} x2={xScale.range()[1]} stroke="black" />
            {/* ticks and text */}
            {xScale.domain().map((tickValue) => (
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                    <line y2={10} stroke="black" />
                    <text style={{ textAnchor: "middle", fontSize: "12px" }} x={10} y={5}>
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}


export { XAxis, YAxis };