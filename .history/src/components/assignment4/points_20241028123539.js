import React from 'react';
function Points(props) {
    const {data, xScale, yScale, height, width, selectedStation, setSelectedStation, setTooltipX, setTooltipY, setTooltipData } = props;
    // const [selectedStation, setSelectedStation] = useState(null);
    const getColor = (station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const getRadius = (station) => {
        return station === selectedStation ? 10 : 5;
    };

    const handleMouseEnter = (event, station) => {
        setSelectedStation(station.station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
        setTooltipData(station);
    };
    
    const handleMouseOut = () => {
        setSelectedStation(null);
        setTooltipX(null);
        setTooltipY(null);
        setTooltipData(null);
    };
    
    if (data) {
        const points = data.map((d, i) => {
            return (
                <circle
                    key={i}
                    cx={xScale(d.tripdurationS)}
                    cy={yScale(d.tripdurationE)}
                    r={getRadius(d.station)}
                    fill={getColor(d.station)}
                    stroke="black"
                    strokeWidth={1}
                    onMouseEnter={(event) => handleMouseEnter(event, d)}
                    onMouseOut={handleMouseOut}
                />
            );
        });

        return (
            <g>
                {points}
                {selectedStation && (
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="yellow"
                        opacity={0.5}
                        pointerEvents="none"
                    />
                )}

                {selectedStation && data.map((d, i) => {
                    if (d.station === selectedStation) {
                        return (
                            <circle
                                key={`highlight-${i}`}
                                cx={xScale(d.tripdurationS)}
                                cy={yScale(d.tripdurationE)}
                                r={10}
                                fill="red"
                                stroke="black"
                                strokeWidth={1}
                                pointerEvents= 'none'
                            />
                        );
                    }
                    return null;
                })}
            </g>
        );
    }  else {
        return <g></g>
    }
}

export default Points