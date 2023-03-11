import { useState, useEffect} from 'react';
import './App.css';
import './chartColors.css'
import data from './datafull.json';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip} from "recharts";
import CardInfo from './theCards.js';
import './button-colours.css';

let theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'black' };
let fillColor='black';
let lightFillColor='grey';

function DataChart ({ data, faculty, onClick }){

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div id={payload[0].payload.faculty+"box"}>
              <p id={payload[0].payload.faculty+"code"}><strong>{payload[0].payload.code}</strong></p>
              <p id={payload[0].payload.faculty+"name"} style={{width:"240px"}}><strong>{payload[0].payload.name}</strong></p>
            </div>
          );
        }
      
        return null;
      };

    const chartStyle={
        fontFamily: 'Anderson Grotesk',
    };
    
    if (faculty === "ART"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(231, 129, 0)' };
        fillColor='rgb(231, 129, 0)';
        lightFillColor='rgb(255, 213, 165)';
    } else if (faculty === "ENG"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(87,5,139)' };
        fillColor='rgb(87,5,139)';
        lightFillColor='rgb(208, 180, 239)';
    } else if (faculty === "ENV"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(180, 190, 0)' };
        fillColor='rgb(180, 190, 0)';
        lightFillColor='rgb(208, 234, 120)';
    } else if (faculty === "HEA"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(0, 152, 165)' };
        fillColor='rgb(0, 152, 165)';
        lightFillColor='rgb(151, 223, 239)';
    } else if (faculty === "MAT"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(198, 0, 120)' };
        fillColor='rgb(198, 0, 120)';
        lightFillColor='rgb(255, 190, 239)';
    } else if (faculty === "REN"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(19, 145, 36)' };
        fillColor='rgb(19, 145, 36)';
        lightFillColor='rgb(169, 226, 176)';
    } else if (faculty === "SCI"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(0,115,206)' };
        fillColor='rgb(0,115,206)';
        lightFillColor='rgb(180, 213, 255)';
    } else if (faculty === "VPA"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(9, 0, 131)' };
        fillColor='rgb(9, 0, 131)';
        lightFillColor='rgb(139, 135, 204)';
    } else if (faculty === "WLU"){
        theColor={ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: 'rgb(139, 28, 167)' };
        fillColor='rgb(139, 28, 167)';
        lightFillColor='rgb(201, 120, 221)';
    }


    return(
        <ScatterChart
            width={500}
            height={450}
            margin={{
                top: 20,
                right: 20,
                bottom: 35,
                left: 20,
            }}
            >
            <CartesianGrid strokeDasharray="10 0" stroke={lightFillColor} />
            <XAxis stroke={fillColor} label={{ value: "Easiness", dy:25, fontFamily:'Anderson Grotesk Bold', fill:fillColor }} dataKey="easy" type="number" name="Easiness" unit="%" tick={{ fontFamily: 'Anderson Grotesk Bold'}} tickCount={6}/>
            <YAxis stroke={fillColor} label={{ value: 'Usefulness', angle: -90, position: 'insideLeft', offset:'-8', fontFamily:'Anderson Grotesk Bold', dy:37, fill:fillColor}} dataKey="useful" type="number" name="Usefulness" unit="%" tick={{ fontFamily: 'Anderson Grotesk Bold' }} tickCount={6}/>
            <ZAxis dataKey="liked" type="number" range={[100, 300]} name="Ratings" unit="" />
            <Tooltip 
                class="chart" 
                cursor={ theColor } 
                animationDuration={1000} 
                animationEasing={'ease'} 
                itemStyle={chartStyle}
                content={CustomTooltip}
            />
            <Scatter data={data} fill={fillColor} onClick={({ payload }) => onClick(payload)} />
        </ScatterChart>
    );
}

export default function Stats({ props }){
    const [filteredInfo, setFilteredInfo] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState({
        code: "Click on a Course!",
        name: "Course Name",
        faculty: "Faculty",
        liked: "N/A",
        useful: "N/A",
        easy: "N/A",
        ratings: "N/A",
        description:"Course Description"
    });

    useEffect(() => {
        setFilteredInfo(data.filter(item => item.code.substring(0, props.course.length+1) ===(props.course+" ")));
    }, [props]);

    const scatterPlotData = filteredInfo.map(item => (Number(item.ratings) >= 5 && {
        code: item.code,
        name: item.name,
        liked: (Number(item.liked.substring(0,item.liked.length-1)) >= 0 && Number(item.liked.substring(0,item.liked.length-1)) <= 100) ? Number(item.liked.substring(0,item.liked.length-1)) : 0,
        easy: (Number(item.easy.substring(0,item.easy.length-1)) >= 0 && Number(item.easy.substring(0,item.easy.length-1)) <= 100) ? Number(item.easy.substring(0,item.easy.length-1)) : 0,
        useful: (Number(item.useful.substring(0,item.useful.length-1)) >= 0 && Number(item.useful.substring(0,item.useful.length-1)) <= 100) ? Number(item.useful.substring(0,item.useful.length-1)) : 0,
        ratings: Number(item.ratings),
        faculty: props.faculty,
    }));

    function handlePointClick ({code, name, faculty, liked, useful, easy, ratings}){
        setSelectedCourse({
            code: code,
            name: name,
            faculty: faculty,
            liked: liked,
            useful: useful,
            easy: easy,
            ratings: ratings,
            description: "Updated Course Description" // Use the correct key name
        });
    }

    if (props.course === '' && props.name === ''){
        props.course = 'Course Code';
        props.name = 'Course Name';
        props.faculty = 'NAFac';
    }

    return(
        <>
        
            <div id='returnButton'><button id='backUpButton' className = {props.faculty +" btn btn-outline-success"}>Search Again</button></div>
            <div id="courseTitles">
                    <h1 style={{fontSize:'80px', marginBottom:'0px', color:fillColor}}> {props.course}  </h1>
                    <h2 style={{fontSize: '40px', color:fillColor}}> {props.name}</h2>   
            </div>
            <div id="displayedInfo" style={{marginLeft:'20px'}}>
                <DataChart data={scatterPlotData} faculty={props.faculty} onClick={handlePointClick}/> 
                <CardInfo key={selectedCourse.code} info={selectedCourse} faculty={props.faculty}></CardInfo>   
            </div>
        </>

    );

}

/*{filteredInfo.map(item => (
                <div key={item.code}>
                    <h2>{item.code}</h2>
                    <p>{item.name}</p>
                    <p>Ratings: {item.ratings}</p>
                    <p>Useful: {item.useful}</p>
                    <p>Easy: {item.easy}</p>
                    <p>Liked: {item.liked}</p>
                </div>
            ))}*/