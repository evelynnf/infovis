import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { csv, json } from "d3";
import { Row, Col, Container } from "react-bootstrap";
import { groupByGenre, groupByYear } from "../components/project/utils";
import styles from "../styles/assignment6_styles.module.css";
import { GenreBubble} from "../components/project/genreBubble";
import { BarChart } from "../components/project/barChart";
import { LineChart } from "../components/project/lineChart";
import { Heatmap } from "../components/project/heatmMap";
import { ArtistBubble} from "../components/project/artistBubble";

const csvUrl = 'https://gist.githubusercontent.com/QianweiYu/fc87a7a40655abe00c3bdf80cc313df5/raw/d629ceddfed864ef724848e286192a760d6776e4/spotify_data.csv';
const secondUrl = 'https://gist.githubusercontent.com/QianweiYu/e9efade3ce9c8b22b8deb61ad4521a6b/raw/23b7c55dfbba2e3ba23c2b354b13a00dcaf7b854/avgpop.csv';

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);

    React.useEffect(() => { 
        csv(csvPath).then(data => {
            setData(data);
        });
    }, []);

    return dataAll;
};

function useData2(csvPath){
    const [dataAll, setData] = React.useState(null);

    React.useEffect(() => {
        if (csvPath) {
           csv(csvPath).then(data => setData(data));
       }
   }, [csvPath]); // Dependency array ensures consistent behavior

   return dataAll;

};


function SpotifyAnalysis() {
    const [selectedYear, setSelectedYear] = React.useState(null);
    const barchart_width = 400;
    const barchart_height = 400;
    const barchart_margin = { top: 10, bottom: 30, left: 50, right: 10 };
    const barchart_inner_width = barchart_width - barchart_margin.left - barchart_margin.right;
    const barchart_inner_height = barchart_height - barchart_margin.top - barchart_margin.bottom;
    const genre_width = 400;
    const genre_height = 400;
    const heat_width = 400;
    const heat_height = 400;
    const linechart_width = 400;
    const linechart_height = 400;
    const linechart_margin = { top: 20, right:20, bottom: 60, left:50 };
    const artist_width = 1060;
    const artist_height = 600;

    // Load data from both URLs
    const songs = useData(csvUrl);
    const songs2 = useData2(secondUrl);

    if (songs == null || songs2 == null) {
        return <>Loading data...</>;
    }

    let genres = groupByGenre(songs);
    let years = groupByYear(songs);

    return (
        <Container>
            {/* Page Header */}
            <Row className={"justify-content-md-left"}>
                <Col lg={10}>
                    <h1 className={styles.h1Style} style={{ fontFamily: 'Georgia, serif', fontSize: '46px' }}>Analysis of Hit Songs from 2000 to 2019 on Spotify</h1>
                </Col>
            </Row>

            {/* Bar Chart and Year Filter */}
            <Row className={"center"}>
                <Col lg={6}>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Number of Hit Songs Every Year</h2>
                    <svg className={styles.svgStyle} id={"barchart"} width={barchart_width} height={barchart_height}>
                        <BarChart offsetX={barchart_margin.left} offsetY={barchart_margin.top} 
                            height={barchart_inner_height} width={barchart_inner_width} data={years}
                            selectedYear={selectedYear} setSelectedYear={setSelectedYear}
                        />
                    </svg>
                </Col>

                {/* Genre Bubble and Year Filter */}
                <Col lg={6}>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Popular Genres of Every Year</h2>
                    <svg className={styles.svgStyle} id={"bubble"} width={genre_width} height={genre_height}>
                        <GenreBubble width={genre_width} height={genre_height} 
                            data={songs} selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            </Row>

            {/* Line Chart */}
            <Row>
                <Col lg={6}>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Linechart</h2>
                    <svg className={styles.svgStyle} id={"line-chart"} width={linechart_width} height={linechart_height}>
                        <LineChart width={linechart_width} height={linechart_height} data={songs2} 
                        top={linechart_margin.top} right={linechart_margin.right} 
                        bottom={linechart_margin.bottom} left={linechart_margin.left}
                        selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            
                {/* Heatmap */}
                <Col lg={6}>
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px' }}>What Keys and Modes are More Likely to Produce Hits?</h2>
                    <svg className={styles.svgStyle} id={"heatmap"} width={heat_width} height={heat_height}>
                        <Heatmap width={heat_width} height={heat_height} data={songs} selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            </Row>

            <Row>
            <Col lg={6}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Artist Bubble</h2>
                    <svg className={styles.svgStyle} id={"artistbubble"} width={artist_width} height={artist_height}>
                        <ArtistBubble width={artist_width} height={artist_height} 
                            data={songs} selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            </Row>

        </Container>
    );
}

export default SpotifyAnalysis;


