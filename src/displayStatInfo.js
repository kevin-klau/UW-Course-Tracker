//import { useState, useEffect} from 'react';
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
            value={theInfo} 
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

export default function VerticalDisplay ({ course1, course2, course3, faculty, prop }){

    return (
        <>
            <div id="facultyStatsCard" className={faculty+"Card"}>
                <div class="row" style={{marginTop:'auto', marginBottom:'auto'}}>
                    <div id="facultyStatsInfo" className="col-xl-9">
                        <h1 id="facultyStatsCode" className={faculty+"text theFontBold"}>{course1.code}</h1>
                        <h4 id="facultyStatsName" className={faculty+"text"}> {course1.name}</h4>
                    </div>
                    <div id="theCircle" className="col-xl-3">
                        <TheCircle course={course1} prop={prop} faculty={faculty} />
                    </div>
                </div>
            </div>
        </>
    );
}