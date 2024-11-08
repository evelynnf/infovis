import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirlineID} = props;
    //TODO: 
    // 1.Define a projection which is geoMercator; 
    // set .scale(97), and .translate([width/2, height/2+20]); 
    // 2. Define a path generator using geoPath();
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 

    // let projection;//TODO: define a projection of Mercator.
    
    const projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // Define the path generator for the projection
    const pathGenerator = geoPath().projection(projection);


    return <g>
        {countries.features.map((country, index) => (
                <path
                    key={`country-${index}`}
                    d={pathGenerator(country)}
                    fill="#eee"
                    stroke="#ccc"
                />
            ))}

            {/* Step 4: Plot the airports */}
            {airports.map((airport, index) => {
                const [x, y] = projection([airport.longitude, airport.latitude]);
                return (
                    <circle
                        key={`airport-${index}`}
                        cx={x}
                        cy={y}
                        r={1}
                        fill="#2a5599"
                    />
                );
            })}
            
        <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID}/>
    </g>
}

export { AirportMap }