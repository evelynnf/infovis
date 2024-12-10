import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3";
import { forceSimulation, forceX, forceY, forceCollide } from "d3";

function SingerBubble({ width, height, data, selectedYear}) {
    const [singers, setSingers] = useState([]);
    console.log("data", data);
    const filteredData = data.filter((song) => song.year === selectedYear);
    console.log(filteredData);

    useEffect(() => {
        // Group by genre and count
        const filteredData = data.filter((song) => song.year === selectedYear);
        const singerCounts = filteredData.reduce((acc, song) => {
            acc[song.singer] = (acc[song.singer] || 0) + 1;
            return acc;
        }, {});

        const singerArray = Object.entries(singerCounts).map(([singer, count]) => ({
            singer,
            count,
        }));

        setSingers(singerArray);
    }, [data, selectedYear]);

    const renderBubbles = () => {
        
        singers.sort((a, b) => a.count - b.count);

        // Define a scale for the radius of bubbles
        const radiusScale = scaleLinear()
            .domain([Math.min(...singers.map((d) => d.count)), Math.max(...singers.map((d) => d.count))])
            .range([2, width * 0.15]);

        // Initialize positions for singers
        singers.forEach((d) => {
            d.x = width / 2;
            d.y = height / 2;
        });

        // Run the D3 force simulation
        const simulation = forceSimulation(singers)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => radiusScale(d.count)))
            .tick(200);

        // Render circles and text for singer
        return singers.map((d, idx) => {
            const isTopSinger = idx >= singers.length - 10; // Top 5 singer are the last 5 elements (sorted ascendingly)
            return (
                <g key={idx}>
                    <circle
                        cx={d.x}
                        cy={d.y}
                        r={radiusScale(d.count)}
                        fill={isTopSinger ? "#ADD8E6" : "#2a5599"}
                        stroke="black"
                        strokeWidth="2"
                    />
                    {isTopSinger && (
                        <text
                            x={d.x}
                            y={d.y}
                            style={{
                                textAnchor: "middle",
                                stroke: "pink",
                                strokeWidth: "0.5em",
                                fill: "#992a2a",
                                fontSize: 20,
                                fontFamily: "cursive",
                                paintOrder: "stroke",
                                strokeLinejoin: "round",
                            }}
                        >
                            {d.singer}
                        </text>
                    )}
                </g>
            );
        });
    };

    return (
        <svg width={width} height={height}>
            {singers.length > 0 && renderBubbles()}
        </svg>
    );
}

export {SingerBubble};
