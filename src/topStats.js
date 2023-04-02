import { useState, useEffect} from 'react';
import './App.css';
import VerticalDisplay from './displayStatInfo.js';
import data from './datafull.json';


export default function TopStats ({ course, faculty, lightColor, darkColor }){
    let theDataFiltered;

    let theFinalData = ([{
        code: "Course Code",
        name: "Course Name",
        faculty: "NAFac",
        liked: "N/A",
        easy: "N/A",
        useful: "N/A",
        ratings: "N/A",
    }]);
    if (course !== "Course Code"){
        theDataFiltered = ((data.filter(item => item.code.substring(0, course.length+1) === (course+" "))));
        theFinalData = theDataFiltered.map(item => (Number(item.ratings) >= 5 && {
            code: item.code,
            name: item.name,
            faculty: item.faculty,
            liked: (Number(item.liked.substring(0,item.liked.length-1)) >= 0 && Number(item.liked.substring(0,item.liked.length-1)) <= 100) ? Number(item.liked.substring(0,item.liked.length-1)) : 0,
            easy: (Number(item.easy.substring(0,item.easy.length-1)) >= 0 && Number(item.easy.substring(0,item.easy.length-1)) <= 100) ? Number(item.easy.substring(0,item.easy.length-1)) : 0,
            useful: (Number(item.useful.substring(0,item.useful.length-1)) >= 0 && Number(item.useful.substring(0,item.useful.length-1)) <= 100) ? Number(item.useful.substring(0,item.useful.length-1)) : 0,
            ratings: Number(item.ratings)}));
            
    }


    let mostLiked = [...theFinalData];
    let leastLiked = [...theFinalData];
    let mostUseful = [...theFinalData];
    let leastUseful = [...theFinalData];
    let mostEasy = [...theFinalData];
    let leastEasy = [...theFinalData];

    if (course !== "Course Code"){
        mostLiked.sort((a, b) => (b.liked - a.liked));
        leastLiked.sort((a, b) => (a.liked - b.liked));
        mostUseful.sort((a, b) => (b.useful - a.useful));
        leastUseful.sort((a, b) => (a.useful - b.useful));
        mostEasy.sort((a, b) => (b.easy - a.easy));
        leastEasy.sort((a, b) => (a.easy - b.easy));

        console.log(mostUseful)
    }
    
    
    

    return (
        <>
            <div id="facultyStatsHeading">
                <h1 id="facultyStatsTitle" className={faculty+"text"}> <strong>Faculty Stats</strong></h1>
                <div id="facultyStatsHeaderLine" style= {{borderColor: darkColor, boxShadow: `0px 0px .5px .5px ${lightColor}`}}/>
            </div>

            <div id="facultyStatsRow1" className="row">
                <div className="col-lg-6 d-flex flex-column  justify-content-center align-items-center">
                    <h1 className={`facultyStatsTitle ${faculty+"text"}`}> Easiest Courses</h1>
                    <VerticalDisplay course={mostEasy[0]} faculty={faculty} lightColor={lightColor} darkColor={darkColor}></VerticalDisplay>
                </div>
                <div className="col-lg-6 d-flex flex-column  justify-content-center align-items-center">
                    <h1 className={`facultyStatsTitle ${faculty+"text"}`}> Most Useful Courses</h1>
                    <VerticalDisplay course={mostUseful[0]} faculty={faculty} lightColor={lightColor} darkColor={darkColor}></VerticalDisplay>
                </div>
            </div>
        </>
    );
}