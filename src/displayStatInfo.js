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

    function routeUWFlow(){
        if(course.code !== "Course Code" && course.code !== "N/A") window.open(`https://uwflow.com/course/${course.code.replace(/\s/g, '')}`);
    }

    return(
        <div id="facultyStatsCard" className={faculty+"Card"}>
            <div class="row" style={{marginTop:'auto', marginBottom:'auto'}}>
                <div id="facultyStatsInfo" className="col-xl-9">
                    <h1 id="facultyStatsCode" className={faculty+"text theFontBold "+faculty+"Hover"} onClick={routeUWFlow}>{course.code}</h1>
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
            clickCircle2();
        } else if (view === 2){
            clickCircle3();
        } else {
            clickCircle1();
        }
    }

    function changeViewLeft() {
        if (view === 3){
            clickCircle2();
        } else if (view === 1){
            clickCircle3();
        } else {
            clickCircle1();
        }
    }

    const [circle1, setCircle1] = useState("NavCircleFilled");
    const [circle2, setCircle2] = useState("NavCircle");
    const [circle3, setCircle3] = useState("NavCircle");

    function clickCircle1(){
        setCircle1("NavCircleFilled");
        setCircle2("NavCircle");
        setCircle3("NavCircle");
        setView(1);
        document.getElementById(prop+"1").scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    function clickCircle2(){
        setCircle1("NavCircle");
        setCircle2("NavCircleFilled");
        setCircle3("NavCircle");
        setView(2);
        document.getElementById(prop+"2").scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    function clickCircle3(){
        setCircle1("NavCircle");
        setCircle2("NavCircle");
        setCircle3("NavCircleFilled");
        setView(3);
        document.getElementById(prop+"3").scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    return (
        <>
            <div id="topStatsContainer">
                <div id="coursesButtonsContainer">
                    <button id="topStatsButtonLeft" onClick={changeViewLeft} className={faculty+"text topStatsButton btn theFont"}>〈</button>
                    <div id="threeCoursesContainer">
                        <div id={prop+"1"} className="child threeCoursesMargins"> <Display course={course1} faculty={faculty} prop={prop}/> </div>
                        <div id={prop+"2"} className="child threeCoursesMargins"> <Display course={course2} faculty={faculty} prop={prop}/> </div>
                        <div id={prop+"3"} className="child threeCoursesMargins"> <Display course={course3} faculty={faculty} prop={prop}/> </div>
                    </div>
                    <button id="topStatsButtonRight" onClick={changeViewRight} className={faculty+"text topStatsButton btn theFont"}>〉</button>
                </div>
                <div id="navCirclesContainer">
                    <button onClick={clickCircle1} class={faculty+"NavCircle navCircle "+faculty+circle1}/>
                    <button onClick={clickCircle2} class={faculty+"NavCircle navCircle "+faculty+circle2}/>
                    <button onClick={clickCircle3} class={faculty+"NavCircle navCircle "+faculty+circle3}/>
                </div>
            </div>
        </>
    );
}