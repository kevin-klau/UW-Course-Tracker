import { useState, useEffect} from 'react';
import './App.css';

export default function TopStats ({ data, lightColor, darkColor }){

    return (
        <>
        <div id="facultyStatsHeading">
            <h1 id="facultyStatsTitle" style={{color: darkColor}}> <strong>Faculty Stats</strong></h1>
            <div id="facultyStatsHeaderLine" style= {{borderColor: darkColor, boxShadow: `0px 0px .5px .5px ${lightColor}`}}/>
        </div>

        <div id="facultyStatsRow1" class="row" style={{justifyContent:"center", textAlign: "center"}}>
            <div class="col-lg-6">
                <h1 class="facultyStatsTitle" style={{color: darkColor}}> Easiest Courses</h1>
            </div>
            <div class="col-lg-6">
                <h1 class="facultyStatsTitle" style={{color: darkColor}}> Most Useful Courses</h1>
            </div>
        </div>
        </>
    );
}