import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3";
import { forceSimulation, forceX, forceY, forceCollide } from "d3";

function GenreBubble({ width, height, data, selectedYear}) {
    const [genres, setGenres] = useState([]);
    const [hoveredGenre, setHoveredGenre] = useState(null);
    const filteredData = selectedYear ? data.filter((song) => song.year === selectedYear) : data;

    useEffect(() => {
            // Group by genre and count
        const genreCounts = filteredData.reduce((acc, song) => {
            acc[song.genre] = (acc[song.genre] || 0) + 1;
            return acc;
        }, {});
        const genreArray = Object.entries(genreCounts).map(([genre, count]) => ({
            genre,
            count,
        }));

        setGenres(genreArray);
    }, [data, selectedYear]);

    const renderBubbles = () => {
        // Sort genres by count ascendingly
        genres.sort((a, b) => a.count - b.count);

        // Define a scale for the radius of bubbles
        const radiusScale = scaleLinear()
            .domain([Math.min(...genres.map((d) => d.count)), Math.max(...genres.map((d) => d.count))])
            .range([2, width * 0.15]);
    
        // Adjust radius dynamically if hovered
        genres.forEach((d) => {
            d.r = hoveredGenre === d.genre 
                ? radiusScale(d.count) * 2 // Increase size by 1.5x for hovered bubble
                : radiusScale(d.count); // Default size for others
        });


        // Run the D3 force simulation
        const simulation = forceSimulation(genres)
            .velocityDecay(0.2)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide((d) => (hoveredGenre === d.genre ? d.r * 1.5 : d.r) + 4))
            .tick(800);

        // Render circles and text for genres
        return genres.map((d, idx) => {
            const isTopGenre = idx >= genres.length - 5; // Top 5 genres are the last 5 elements (sorted ascendingly)
            const isHovered = hoveredGenre === d.genre; 
            const bubbleSize = isHovered 
            ? scaleLinear().domain([0, Math.max(...genres.map(g => g.count))]).range([2, width * 0.3])(d.count) 
            : scaleLinear().domain([0, Math.max(...genres.map(g => g.count))]).range([2, width * 0.15])(d.count);

            return (
                <g key={idx}>
                    <circle
                        cx={d.x}
                        cy={d.y}
                        r={bubbleSize}
                        fill={isTopGenre ? "#ADD8E6" : "#2a5599"}
                        stroke="black"
                        strokeWidth="2"
                        onMouseEnter={() => setHoveredGenre(d.genre)} // Set hovered genre on mouse enter
                        onMouseLeave={() => setHoveredGenre(null)} // Reset on mouse leave
                    />
                    {isTopGenre && (
                        <text
                            x={d.x}
                            y={d.y}
                            onMouseEnter={() => setHoveredGenre(d.genre)}
                            onMouseLeave={() => setHoveredGenre(null)}
                            style={{
                                textAnchor: "middle",
                                stroke: "pink",
                                strokeWidth: "0.4em",
                                fill: "#992a2a",
                                fontSize: 12,
                                fontFamily: "cursive",
                                paintOrder: "stroke",
                                strokeLinejoin: "round",
                            }}
                        >
                            {d.genre}
                        </text>
                    )}
                </g>
            );
        });
    };

    return (
        <svg width={width} height={height}>
            {genres.length > 0 && renderBubbles()}
        </svg>
    );
}

export {GenreBubble};
