import { useState, useEffect} from 'react';
import './App.css';
import './facultyColors.css';
import data from './datafull.json';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell} from "recharts";
import CardInfo from './theCards.js';
import './facultyColors.css';
import TopStats from './topStats.js';
import ToolTip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';



let fillColor='white';
let lightFillColor='grey';
let notDefault = false;

function DataChart ({ data, faculty, onClick, fillColor, lightFillColor }){


    if (!notDefault && faculty !== "NAFac"){
        notDefault=true
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div id={payload[0].payload.faculty+"box"}>
              <p id={payload[0].payload.faculty+"code"} className="theFont"><strong>{payload[0].payload.code}</strong></p>
              <p id={payload[0].payload.faculty+"name"} className="theFont"><strong>{payload[0].payload.name}</strong></p>
            </div>
          );
        }
      
        return null;
    };


    return(
        <ScatterChart width={450} height={380} margin={{top: 20, right: 20, bottom: 35, left: 20}}>
            <CartesianGrid strokeDasharray="10 0" stroke={lightFillColor} />
            <XAxis stroke={fillColor} label={{ value: "Easiness", dy:25, fontFamily:'Anderson Grotesk Bold', fill:fillColor }} dataKey="easy" type="number" name="Easiness" unit="%" tick={{ fontFamily: 'Anderson Grotesk Bold'}} tickCount={6}/>
            <YAxis stroke={fillColor} label={{ value: 'Usefulness', angle: -90, position: 'insideLeft', offset:'-8', fontFamily:'Anderson Grotesk Bold', dy:37, fill:fillColor}} dataKey="useful" type="number" name="Usefulness" unit="%" tick={{ fontFamily: 'Anderson Grotesk Bold' }} tickCount={6}/>
            <ZAxis dataKey="liked" type="number" range={[75, 250]} name="Ratings" unit="" />
            <Tooltip 
                className="chart" 
                cursor={{ strokeDasharray: '12 12', strokeWidth: 1.5, stroke: fillColor}} 
                animationDuration={1000} 
                animationEasing={'ease'} 
                itemStyle={{fontFamily: 'Anderson Grotesk'}}
                content={CustomTooltip}
            />
            <Scatter data={data} onClick={({ payload }) => onClick(payload)}>
                    {data?.map((entry) => (
                        <Cell key={entry.code} className="fade show" fill={entry.color ?? fillColor} stroke={entry.color ?? fillColor} />
                    ))}
            </Scatter>
        </ScatterChart>
    );
}

export default function Stats({ props, potentialCourse }){
    
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

    //const [result, setResult] = useState("Insert Course Description");
    
    const [userCourseChoice, setUserCourseChoice] = useState("");

    const handleRequest = async (user_input) => {
       /* fetch('http://127.0.0.1:5000/', {
            method: 'OPTIONS',
             headers: {
                'Access-Control-Request-Method': 'GET', // replace with the actual HTTP method
                'Access-Control-Request-Headers': 'Content-Type', // replace with the actual headers
            },
            body: JSON.stringify("math136")
          })
            .then(response => {
                if (!response.ok) {
                    console.log(data)
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
            })
            .then(data => console.log(data.output))
            .catch(error => console.error(error));*/

            
    }

    let faculty = props.faculty;
    if (faculty === "ART"){
        lightFillColor='rgb(231, 129, 0)';
        fillColor='rgb(251 175 0)';
    } else if (faculty === "ENG"){
        lightFillColor='rgb(129 0 180)';
        fillColor='rgb(190 51 218)';
    } else if (faculty === "ENV"){
        lightFillColor='rgb(180, 190, 0)';
        fillColor='rgb(208 234 120)';
    } else if (faculty === "HEA"){
        lightFillColor='rgb(0 152 165)';
        fillColor='rgb(0 190 208)';
    } else if (faculty === "MAT"){
        lightFillColor='rgb(223 36 152)';
        fillColor='rgb(255 99 170)';
    } else if (faculty === "REN"){
        lightFillColor='rgb(19, 145, 36)';
        fillColor='rgb(169, 226, 176)';
    } else if (faculty === "SCI"){
        lightFillColor='rgb(0,115,206)';
        fillColor='rgb(99 160 255)';
    } else if (faculty === "VPA"){
        lightFillColor='rgb(77, 67, 215)';
        fillColor='rgb(139, 135, 204)';
    } else if (faculty === "WLU"){
        lightFillColor='rgb(139, 28, 167)';
        fillColor='rgb(201, 120, 221)';
    }

    
    const [oldData, setOldData] = useState();
    function submitCourseSearch(e){
        e.preventDefault();

        for (let i = 0; i < scatterPlotData.length; i++){
            const theCode = scatterPlotData[i].code.toUpperCase()
            const theCodeLength = theCode.length;
            let userCode = userCourseChoice.toUpperCase()
            const theUserLength = userCode.length;
            if (faculty === "WLU"){
                userCode = userCode + "W";
            }

            if (userCode.substring(theUserLength - 1, theUserLength) >= "A" && userCode.substring(theUserLength - 1, theUserLength) <= "Z"){
                if (theCode.substring(theCodeLength - 4, theCodeLength) === userCode.substring(theUserLength - 4, theUserLength)){
                    handlePointClick(scatterPlotData[i]);
                    const data = [...oldData];
                    data[i]={...data[i], color: lightFillColor}
                    setScatterPlotData(data);
                    document.getElementById('mainCard').scrollIntoView();
                    break;
                }
            }else if (theCode === userCode || theCode.substring(theCodeLength - 3, theCodeLength) === userCode.substring(theUserLength - 3, theUserLength)){
                handlePointClick(scatterPlotData[i]);
                const data = [...oldData];
                data[i]={...data[i], color: lightFillColor}
                setScatterPlotData(data);
                document.getElementById('mainCard').scrollIntoView();
                break;
            }
        } 
       
    }

    
    
    useEffect(() => {
        setFilteredInfo(data.filter(item => item.code.substring(0, props.course.length+1) === (props.course+" ") && Number(item.ratings) >= 5));
    }, [props]);

    const [scatterPlotData, setScatterPlotData] = useState (null);

    useEffect(()=> {
        let item = filteredInfo.map(item => ({
            code: item.code,
            name: item.name,
            liked: (Number(item.liked.substring(0,item.liked.length-1)) >= 0 && Number(item.liked.substring(0,item.liked.length-1)) <= 100) ? Number(item.liked.substring(0,item.liked.length-1)) : 0,
            easy: (Number(item.easy.substring(0,item.easy.length-1)) >= 0 && Number(item.easy.substring(0,item.easy.length-1)) <= 100) ? Number(item.easy.substring(0,item.easy.length-1)) : 0,
            useful: (Number(item.useful.substring(0,item.useful.length-1)) >= 0 && Number(item.useful.substring(0,item.useful.length-1)) <= 100) ? Number(item.useful.substring(0,item.useful.length-1)) : 0,
            ratings: Number(item.ratings),
            faculty: props.faculty,
            color: fillColor
        }))

        setScatterPlotData(item);
        setOldData(item)
    }, [filteredInfo, props.faculty])

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
        handleRequest(code);
        for (let i = 0; i < scatterPlotData.length; i++){
            if (code === scatterPlotData[i].code){
                const data = [...oldData];
                data[i]={...data[i], color: lightFillColor}
                setScatterPlotData(data);      
            }
        }  
        //document.getElementById('mainCard').scrollIntoView();
    }

    function clickSearchAgain (){
        document.getElementById('title').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
    }

    function moveToFacultyStats() {
        document.getElementById('facultyInfo').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });;
    }

    function moveToBaseStats() {
        document.getElementById('statisticsContainer').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
    }

    if (props.course === '' && props.name === ''){
        props.course = 'Course Code';
        props.name = 'Course Name';
        props.faculty = 'NAFac';
    }

    const CustomToolTip = styled(({ className, ...props }) => (
        <ToolTip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.arrow}`]: {
                color: fillColor
            },
            [`& .${tooltipClasses.tooltip}`]: {
                border:'2px solid '+fillColor,
                backgroundColor: "rgb(14, 14, 37, 0.9)",
                color: fillColor,
                boxShadow: theme.shadows[1],
                fontSize: 17,
                fontFamily:'Anderson Grotesk',
                maxHeight: '300px',
                overflowY:'scroll',
                maxWidth: '300px',
                scrollbarWidth: 'thin', 
                    scrollBehavior: 'smooth', 
                    ...{
                      '::-webkit-scrollbar': {
                        width: '7px',
                      },
                      '::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(0,0,0,0)'
                      },
                      '::-webkit-scrollbar-thumb': {
                        backgroundColor: fillColor,
                        borderRadius: '100px',
                      },
                      '::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: lightFillColor
                      }
                    }
                
            },
        }));
    

    // Printing excluded Courses
    let excludedCourses = [];

    // Putting all the excluded courses to sort the array
    for (let i = 0; i < data.length; i++){
        if (data[i].code.substring(0, props.course.length+1) === (props.course+" ") && data[i].ratings < 5){
            let codeStart = 0;
            for (let j = 0; j < data[i].code.length; j++){
                if (data[i].code.charAt(j) === " "){
                    codeStart = j + 1;
                    break;
                }
            }
            excludedCourses.push(data[i].code.substring(codeStart, data[i].code.length))
        }
    }
    excludedCourses.sort();

    // Putting all the excluded courses in a string to be printed (with commas and spacing)
    let printExcluded = "";
    for (let i = 0; i < excludedCourses.length; i++){
        printExcluded += ", " + props.course + " " + excludedCourses[i];
    }
    printExcluded = printExcluded.substring(2, printExcluded.length)

    const titleContent = `<h4>Courses with <5 Ratings Aren't Included. These Include:</h4> <h5><strong>${printExcluded}</strong></h5>`;

    return(
        <>
        <div id="secondPageContainer" style={{display: 'flex'}}>
            <button id="buttonLeft" onClick={moveToBaseStats}  className="btn theFont sideButton">〈</button>
            <div id="secondPageInfo">
                <div id="statisticsContainer" className="child">
                    <div id="courseTitles">
                        <div className='row' style={{textAlign:'center', marginBottom:'-5px', width:'84vw'}}>
                            <div className='col-xl-3' id='returnButton'>
                                <button onClick={() => clickSearchAgain()} id='backUpButton' className = {props.faculty +"SideButton btn"}>Search Again</button>
                            </div>
                            <h1 id="courseHeading" className={`col-xl-6 ${faculty+"text"} theFont`}> {props.course} </h1>
                            <form className='col-xl-3 container' id='searchButton' onSubmit={submitCourseSearch}>
                                <input type="text" id='searchCourseButton' className = {props.faculty +"Button btn"} autocomplete="off" placeholder="Search Course!" onChange={(e) => setUserCourseChoice(e.target.value)}></input>
                                <button id="searchCourseButtonEnter" className = {props.faculty +"SideButton btn"} type="submit">🔎︎</button>
                            </form>
                        </div>
                        <div id="courseHeadingName">
                            <h2 className={faculty + "text theFont"}> {props.name}</h2> 
                            <CustomToolTip TransitionComponent={Zoom} title={<span dangerouslySetInnerHTML={{ __html: titleContent }} />} arrow>
                                <h2 className={faculty+"text theFont"} style={{paddingLeft:'10px', paddingRight:'10px', fontSize:'25px'}}> ⓘ</h2>
                            </CustomToolTip>
                            
                        </div>
                    </div>
                    <div id="displayedInfo">
                        <DataChart id="theChart" data={scatterPlotData} faculty={props.faculty} onClick={handlePointClick} fillColor={fillColor} lightFillColor={lightFillColor} className='col-lg-6'/> 
                        <CardInfo key={selectedCourse.code} info={selectedCourse} faculty={props.faculty} className='col-lg-6'></CardInfo>  
                        {/*<p>{result}</p>*/}
                    </div>
                </div>
                <div id="facultyInfo" className="child">
                    <TopStats course={props.course} faculty={props.faculty}></TopStats>
                </div>
            </div>
            <button id="buttonRight" onClick={moveToFacultyStats} className="btn theFont sideButton">〉</button>
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