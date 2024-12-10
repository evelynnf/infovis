import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { csv, json } from "d3";
import { Row, Col, Container } from "react-bootstrap";
import { groupByAirline, groupByAirport } from "../components/assignment6/utils";
import styles from "../styles/assignment5_styles.module.css";
import { HeatMap }  from "../components/project/heatMap";
import { LineChart } from "../components/project/lineChart";
import { GenreBubble} from "../components/project/genreBubble";


const csvUrl = 'https://gist.githubusercontent.com/hogwild/9367e694e12bd2616205e4b3e91285d5/raw/9b451dd6bcc148c3553f550c92096a1a58e1e1e5/airline-routes.csv';


function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.SourceLatitude = +d.SourceLatitude
                d.SourceLongitude = +d.SourceLongitude
                d.DestLatitude = +d.DestLatitude
                d.DestLongitude = +d.DestLongitude
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}


function SpotifyAnalysis(){
    const [selectedAirline, setSelectedAirline]=React.useState(null);
    const barchart_width = 400;
    const barchart_height = 400;
    const barchart_margin = { top: 10, bottom: 50, left: 130, right: 10 };
    const barchart_inner_width = barchart_width - barchart_margin.left - barchart_margin.right;
    const barchart_inner_height = barchart_height - barchart_margin.top - barchart_margin.bottom;
    const map_width = 600;
    const map_height = 400;
    const hub_width = 400;
    const hub_height = 400;

    const routes = useData(csvUrl);
    const map = useMap(mapUrl);
    
    if (!map || !routes) {
        return <pre>Loading...</pre>;
    };
    let airlines = groupByAirline(routes);
    let airports = groupByAirport(routes);
    // console.log(cities);
    // console.log(airports);

    return (<Container >
            <Row className={"justify-content-md-left"}>
                <Col lg={10} >
                    <h1 className={styles.h1Style}>Airlines Routes</h1> 
                </Col>
            </Row> 
            <Row className={"justify-content-md-left"}>
                <Col lg={4}>
                    <h2>Genres</h2>
                    <svg className={styles.svgStyle} id={"bubble"} width={hub_width} height={hub_height}>
                        <GenreBubble width={hub_width} height={hub_height} 
                            routes={routes} selectedAirline={selectedAirline}
                        />
                    </svg>
                    
                </Col>
                <Col lg={8}>
                    <h2>Singers</h2>
                    <svg className={styles.svgStyle} id={"bubble"} width={hub_width} height={hub_height}>
                        <GenreBubble width={hub_width} height={hub_height} 
                            routes={routes} selectedAirline={selectedAirline}
                        />
                    </svg>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <h2>Songs Data</h2>
                    <svg className={styles.svgStyle} id={"barchart"} width={barchart_width} height={barchart_height}>
                        <LineChart offsetX={barchart_margin.left} offsetY={barchart_margin.top} 
                            height={barchart_inner_height} width={barchart_inner_width} data={airlines}
                            selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline}
                        />
                    </svg>
                </Col>
                <Col lg={8}>
                    <h2>Mode and Tempo</h2>
                    <svg className={styles.svgStyle} id={"map"} width={map_width} height={map_height}>
                        <HeatMap width={map_width} height={map_height} 
                            countries={map} airports={airports} routes={routes}
                            selectedAirline={selectedAirline}
                        />
                    </svg>
                </Col>
            </Row> 
            </Container>)
}


export default SpotifyAnalysis