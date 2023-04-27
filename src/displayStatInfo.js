import { useState, useEffect} from 'react';
import './App.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TheCircle ({ course , prop, faculty }){
    
    let theInfo = "N/A";
    if (prop === "easy"){
        theInfo = course.easy;
    } else if (prop === "useful"){
        theInfo = course.useful;
    } else {
        theInfo = course.liked;
    }

    let color = "white";
    if (faculty === "ART") color='rgb(251 175 0)';
    else if (faculty === "ENG") color='rgb(190 51 218)';
    else if (faculty === "ENV") color='rgb(208 234 120)';
    else if (faculty === "HEA") color='rgb(0 190 208)';
    else if (faculty === "MAT") color='rgb(255 99 170)';
    else if (faculty === "REN") color='rgb(169, 226, 176)';
    else if (faculty === "SCI") color='rgb(99 160 255)';
    else if (faculty === "VPA") color='rgb(139, 135, 204)';
    else if (faculty === "WLU") color='rgb(201, 120, 221)';
    
    return(
        <CircularProgressbar 
            value={theInfo * 0.99 + 1} 
            text={`${theInfo}%`}
            strokeWidth={7}

            styles={{
                path:{
                    stroke:color,
                },
                trail:{
                    stroke:'none',
                },
                text:{
                    fill: color,
                    fontSize:'25px',
                    fontFamily:'Anderson Grotesk',
                }
            }}
        />
    );
}

function Display ({ course, faculty, prop }){
    return(
        <div id="facultyStatsCard" className={faculty+"Card"}>
            <div class="row" style={{marginTop:'auto', marginBottom:'auto'}}>
                <div id="facultyStatsInfo" className="col-xl-9">
                    <h1 id="facultyStatsCode" className={faculty+"text theFontBold"}>{course.code}</h1>
                    <h4 id="facultyStatsName" className={faculty+"text"}> {course.name}</h4>
                </div>
                <div id="theCircle" className="col-xl-3">
                    <TheCircle course={course} prop={prop} faculty={faculty} />
                </div>
            </div>
        </div>
    );
}

export default function VerticalDisplay ({ course1, course2, course3, faculty, prop }){

    const [view, setView] = useState(1);

    function changeViewRight() {
        if (view === 1){
            console.log("change")
            setView(2);
            document.getElementById(prop+"2").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        } else if (view === 2){
            console.log("change")
            setView(3);
            document.getElementById(prop+"3").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        } else {
            console.log("change")
            setView(1);
            document.getElementById(prop+"1").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        }
    }

    function changeViewLeft() {
        if (view === 3){
            console.log("change")
            setView(2);
            document.getElementById(prop+"2").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        } else if (view === 1){
            console.log("change")
            setView(3);
            document.getElementById(prop+"3").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        } else {
            console.log("change")
            setView(1);
            document.getElementById(prop+"1").scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                 
              });;
        }
    }

    return (
        <>
            <div id="topStatsContainer">
                <button id="topStatsButtonLeft" onClick={changeViewLeft} className={faculty+"text topStatsButton btn theFont"}>〈</button>
                <div id="threeCoursesContainer">
                    <div id={prop+"1"} className="child" style={{marginTop:'auto', marginBottom:'auto'}}> <Display course={course1} faculty={faculty} prop={prop}/> </div>
                    <div id={prop+"2"} className="child" style={{marginTop:'auto', marginBottom:'auto'}}> <Display course={course2} faculty={faculty} prop={prop}/> </div>
                    <div id={prop+"3"} className="child" style={{marginTop:'auto', marginBottom:'auto'}}> <Display course={course3} faculty={faculty} prop={prop}/> </div>
                </div>
                <button id="topStatsButtonRight" onClick={changeViewRight} className={faculty+"text topStatsButton btn theFont"}>〉</button>
            </div>
        </>
    );
}