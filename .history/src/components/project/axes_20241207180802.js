import React from "react";

export { XAxis, YAxis };

function YAxis (props) {
    const { yScale, width, height} = props;
    return (
        <g>
            {/* y-axis */}
            <line x1={0} x2={0} y1={yScale(0)} y2={yScale(1)} stroke="black" />
            {/* 刻度线和文本 */}
            {yScale.ticks(5).map((tickValue) => (
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line x2={-5} stroke="black" />
                    <text
                        style={{ textAnchor: "end", fontSize: "10px" }}
                        x={-10}
                        dy="0.3em"
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
    // return <g transform={`translate(${0}, ${height})`}>
    //     {<line x2={width} stroke='black'/>}
    //     {xScale.ticks(5).map(tickValue => 
    //         <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
    //             <line y2={10} stroke='black' />
    //             <text style={{ textAnchor:'end', fontSize:'10px' }} x={5} y={20}>
    //                 {tickValue}
    //             </text>
    //         </g>
    //     )}
    // </g>
}

function XAxis(props) {
    const { xScale, height, offsetX } = props;
    return (
        <g transform={`translate(0, ${height})`}>
            {/* x-axis */}
            <line x1={xScale.range()[0]} x2={xScale.range()[1]} stroke="black" />
            {/* ticks and text */}
            {xScale.domain().map((tickValue) => (
                <g
                    key={tickValue}
                    transform={`translate(${xScale(tickValue)}, 0)`}
                >
                    <line y2={5} stroke="black" />
                    <text
                        style={{ textAnchor: "middle", fontSize: "10px" }}
                        dy="1em"
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
    // return <g>
    //     {<line x1={0} y1={0} x2={0} y2={height} stroke='black'/>}
    //     {yScale.domain().map(tickValue =>
    //         <g key={tickValue+'B'} transform={`translate(${0}, ${yScale(tickValue)})`}>
    //             <line x1={-5} x2={0} y1={yScale.bandwidth()/2} y2={yScale.bandwidth()/2} stroke='black' />
    //             <text style={{textAnchor: 'start', fontSize:'10px' }} x={-offsetX+10} y={yScale.bandwidth()/2}>
    //                 {tickValue}
    //             </text>
    //         </g>
    //     )}
    // </g>
}