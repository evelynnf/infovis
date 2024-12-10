import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3";
import { forceSimulation, forceX, forceY, forceCollide } from "d3";

function ArtistBubble({ width, height, data, selectedYear}) {
    const [artists, setArtists] = useState([]);
    console.log("data", data);
    const filteredData = selectedYear ? data.filter((song) => song.year === selectedYear) : data;
    console.log(filteredData);

    useEffect(() => {
        // Group by genre and count
        const filteredData = selectedYear ? data.filter((song) => song.year === selectedYear) : data;
        const artistCounts = filteredData.reduce((acc, song) => {
            acc[song.artist] = (acc[song.artist] || 0) + 1;
            return acc;
        }, {});

        const artistArray = Object.entries(artistCounts).map(([artist, count]) => ({
            artist,
            count,
        }));

        setArtists(artistArray);
    }, [data, selectedYear]);

    const renderBubbles = () => {
        
        artists.sort((a, b) => a.count - b.count);

        // Define a scale for the radius of bubbles
        const radiusScale = scaleLinear()
            .domain([Math.min(...artists.map((d) => d.count)), Math.max(...artists.map((d) => d.count))])
            .range([2, width * 0.05]);

        // Initialize positions for singers
        artists.forEach((d) => {
            d.x = width / 2;
            d.y = height / 2;
        });

        // Run the D3 force simulation
        const simulation = forceSimulation(artists)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength((d) => {
                // if the bubble is large, makes its attraction strength stonger
                return d.r > radiusScale(Math.max(...artists.map(a => a.count))) * 0.6 ? 0.2 : 0.02;
            }))
            .force("y", forceY(height / 2).strength((d) => {
                return d.r > radiusScale(Math.max(...artists.map(a => a.count))) * 0.6 ? 0.2 : 0.02;
            }))
            .force("collide", forceCollide((d) => radiusScale(d.count)))
            .tick(200);

        // Render circles and text for singer
        return artists.map((d, idx) => {
            const isTopArtist = idx >= artists.length - 15; // Top 10 singer are the last 10 elements (sorted ascendingly)
            return (
                <g key={idx}>
                    <circle
                        cx={d.x}
                        cy={d.y}
                        r={radiusScale(d.count)}
                        fill={isTopArtist ? "#ADD8E6" : "#2a5599"}
                        stroke="black"
                        strokeWidth="2"
                    />
                    {isTopArtist && (
                        <text
                            x={d.x}
                            y={d.y}
                            style={{
                                textAnchor: "middle",
                                stroke: "pink",
                                strokeWidth: "0.2em",
                                fill: "#992a2a",
                                fontSize: 10,
                                fontFamily: "Times New Roman, serif",
                                paintOrder: "stroke",
                                strokeLinejoin: "round",
                            }}
                        >
                            {d.artist}
                        </text>
                    )}
                </g>
            );
        });
    };

    return (
        <svg width={width} height={height}>
            {artists.length > 0 && renderBubbles()}
        </svg>
    );
}

export {ArtistBubble};
