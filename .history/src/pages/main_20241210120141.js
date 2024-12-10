import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { csv, json } from "d3";
import { Row, Col, Container } from "react-bootstrap";
import { groupByGenre, groupByYear } from "../components/project/utils";
import styles from "../styles/assignment6_styles.module.css";
import { GenreBubble} from "../components/project/genreBubble";
import { BarChart } from "../components/project/barChart";
import { LineChart } from "../components/project/lineChart";
import { Heatmap } from "../components/project/heatmap";
import { ArtistBubble} from "../components/project/artistBubble";

const csvUrl = 'https://gist.githubusercontent.com/QianweiYu/50c69d324102ce70376ad5ff4430126f/raw/10fe93073d79a555cca15688caf44270b4e6b225/filtered_songs_final.csv';
const secondUrl = 'https://gist.githubusercontent.com/QianweiYu/ae429bd46dac58e7fdc3799c965d1404/raw/4a24ca784e22273e6e02afcd99debe0b7fe99445/avg_pop.csv';

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);

    React.useEffect(() => { 
        csv(csvPath).then(data => {
            setData(data);
        });
    }, []);

    return dataAll;
};


// function useData2(csvPath){
//     const [dataAll, setData] = React.useState(null);

//     React.useEffect(() => { 
//         csv(csvPath).then(data => {
//             setData(data);
//         });
//     }, []);

//     return dataAll;
// };

const useData2 = (csvPath) => {
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
    const linechart_margin = { top: 20, right:20, bottom: 40, left:50 };
    const artist_width = 1060;
    const artist_height = 600;

    const songs = useData(csvUrl);
    if(songs==null){
        return <>Loading data</>
    }
    const songs2 = useData2(secondUrl);
    if(songs2==null){
        return <>Loading data</>
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
                    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>Heatmap</h2>
                    <svg className={styles.svgStyle} id={"heatmap"} width={heat_width} height={heat_height}>
                        <Heatmap width={heat_width} height={heat_height} data={songs} selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            </Row>

            <Row>
            <Col lg={6}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}>ArtistBubble</h2>
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


