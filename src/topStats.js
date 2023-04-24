//import { useState, useEffect} from 'react';
import './App.css';
import VerticalDisplay from './displayStatInfo.js';
import data from './datafull.json';


export default function TopStats ({ course, faculty }){
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
        theDataFiltered = ((data.filter(item => item.code.substring(0, course.length+1) === (course+" ") && Number(item.ratings) >= 5)));
        theFinalData = theDataFiltered.map(item => ({
            code: item.code,
            name: item.name,
            faculty: item.faculty,
            liked: (Number(item.liked.substring(0,item.liked.length-1)) >= 0 && Number(item.liked.substring(0,item.liked.length-1)) <= 100) ? Number(item.liked.substring(0,item.liked.length-1)) : 0,
            easy: (Number(item.easy.substring(0,item.easy.length-1)) >= 0 && Number(item.easy.substring(0,item.easy.length-1)) <= 100) ? Number(item.easy.substring(0,item.easy.length-1)) : 0,
            useful: (Number(item.useful.substring(0,item.useful.length-1)) >= 0 && Number(item.useful.substring(0,item.useful.length-1)) <= 100) ? Number(item.useful.substring(0,item.useful.length-1)) : 0,
            ratings: Number(item.ratings)
        }));       
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
    }

    let easy1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })
    let easy2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })
    let easy3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })
    let hard1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })
    let hard2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })
    let hard3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        easy: "N/A"
    })

    let useful1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })
    let useful2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })
    let useful3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })
    let useless1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })
    let useless2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })
    let useless3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        useful: "N/A"
    })

    let liked1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })
    let liked2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })
    let liked3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })
    let unliked1 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })
    let unliked2 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })
    let unliked3 = ({
        code: "N/A",
        name: "Not Enough Courses",
        liked: "N/A"
    })

    console.log(mostEasy.length);

    if (mostEasy.length >= 1){
        easy1 = mostEasy[0];
        useful1 = mostUseful[0];
        liked1 = mostLiked[0];
        hard1 = leastEasy[0];
        useless1 = leastUseful[0];
        unliked1 = leastLiked[0];
    }

    if (mostEasy.length >= 2){
        easy2 = mostEasy[1];
        useful2 = mostUseful[1];
        liked2 = mostLiked[1];
        hard2 = leastEasy[1];
        useless2 = leastUseful[1];
        unliked2 = leastLiked[1];
    }
    if (mostEasy.length >= 3){
        easy3 = mostEasy[2];
        useful3 = mostUseful[2];
        liked3 = mostLiked[2];
        hard3 = leastEasy[2];
        useless3 = leastUseful[2];
        unliked3 = leastLiked[2];
    }

    
    return (
        <>
        <div style={{width:'80vw', marginRight:'0px'}}>
            <div id="facultyStatsHeading">
                <h1 id="facultyStatsTitle" className={faculty+"text theFont"}> <strong>Faculty Stats</strong></h1>
                <div id="facultyStatsHeaderLine" className={faculty+"Card"}/>
            </div>

            <div id="facultyStatsRow1" className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h1 className={`facultyStatsTitle theFontBold ${faculty+"text"}`}> Easiest Courses</h1>
                    <VerticalDisplay course1={easy1} course2={easy2} course3={easy3} faculty={faculty} prop="easy"></VerticalDisplay>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h1 className={`facultyStatsTitle theFontBold ${faculty+"text"}`}> Most Useful Courses</h1>
                    <VerticalDisplay course1={useful1} course2={useful2} course3={useful3} faculty={faculty} prop="useful"></VerticalDisplay>
                </div>
            </div>
            
            <div id="facultyStatsRow2" className="row">
                <div className="col-lg-8 d-flex">
                    <h1 className={`facultyStatsTitle theFontBold ${faculty+"text"}`}> Most Liked Courses</h1>
                    <VerticalDisplay course1={liked1} course2={liked2} course3={liked3} faculty={faculty} prop="easy"></VerticalDisplay>
                </div>
                <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                    
                </div>
            </div>
         </div>
        </>
    );
}