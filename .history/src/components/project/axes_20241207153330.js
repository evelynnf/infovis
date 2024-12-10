import React from "react";

export { XAxis, YAxis };

function YAxis (props) {
    
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