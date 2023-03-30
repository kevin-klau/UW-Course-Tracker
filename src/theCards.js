import { useState, useEffect } from 'react';
import './App.css';
import './Cards.css';



export default function CardInfo({ info, faculty }){
    let fillColor = 'black';
    let lightFillColor = 'black'
    let lightTextColor = 'gray'
    if (faculty === "ART"){
        fillColor='rgb(231, 129, 0)';
        lightFillColor='rgb(255, 213, 165)';
        lightTextColor='rgb(239, 164, 67)';
    } else if (faculty === "ENG"){
        fillColor='rgb(87,5,139)';
        lightFillColor='rgb(208, 180, 239)';
        lightTextColor='rgb(132, 66, 173)';
    } else if (faculty === "ENV"){
        fillColor='rgb(180, 190, 0)';
        lightFillColor='rgb(208, 234, 120)';
        lightTextColor='rgb(225, 233, 82)';
    } else if (faculty === "HEA"){
        fillColor='rgb(0, 152, 165)';
        lightFillColor='rgb(151, 223, 239)';
        lightTextColor='rgb(78, 197, 207)';
    } else if (faculty === "MAT"){
        fillColor='rgb(198, 0, 120)';
        lightFillColor='rgb(255, 190, 239)';
        lightTextColor='rgb(222, 72, 162)';
    } else if (faculty === "REN"){
        fillColor='rgb(19, 145, 36)';
        lightFillColor='rgb(169, 226, 176)';
        lightTextColor='rgb(72, 187, 88)';
    } else if (faculty === "SCI"){
        fillColor='rgb(0,115,206)';
        lightFillColor='rgb(180, 213, 255)';
        lightTextColor='rgb(58, 152, 230)';
    } else if (faculty === "VPA"){
        fillColor='rgb(9, 0, 131)';
        lightFillColor='rgb(139, 135, 204)';
        lightTextColor='rgb(63, 57, 157)';
    } else if (faculty === "WLU"){
        fillColor='rgb(139, 28, 167)';
        lightFillColor='rgb(201, 120, 221)';
        lightTextColor='rgb(184, 81, 209)';
    }

    if (faculty === 'NAFac'){
        faculty = 'NA';
    }
    

    return(
        <div id="mainCard" className={faculty}>
            <h1 id="cardCode" style={{display: "inline-block", color: fillColor}}>{info.code}</h1>
            <div style={{display: "inline-block", color: lightFillColor}}>
                {info.ratings === "N/A" ? <div/>: <p id="cardRatings" style={{color: lightTextColor}}>{info.ratings} Ratings</p>}
            </div>            
            <div id="horizontalLine" className={faculty}/>
            <h2 id="cardName" style={{color: fillColor}}>{info.name}</h2>
            
            <h3 className={"cardHeaders"} style={{color: fillColor}}><strong>Difficulty:</strong> {info.easy}%</h3>
            <div key={info.name+1} className="meter" style={{display: "inline-block"}}>
                <span key={info.name+1} style={{width: Number(info.easy)+"%"}}><span className="progress" style={{backgroundColor: fillColor}}></span><p>hihi</p></span>
            </div>

            <h3 className={"cardHeaders"} style={{color: fillColor}}>Usefulness: {info.useful}%</h3>
            <div key={info.name+2} className="meter" style={{display: "inline-block"}}>
                <span key={info.name+2} style={{width: Number(info.useful)+"%"}}><span className="progress" style={{backgroundColor: fillColor}}></span><p>hihi</p></span>
            </div>

            <h3 className={"cardHeaders"} style={{color: fillColor}}>Liked: {info.liked}%</h3>
            <div key={info.name+3} className="meter" style={{display: "inline-block"}}>
                <span key={info.name+3} style={{width: Number(info.liked)+"%"}}><span className="progress" style={{backgroundColor: fillColor}}></span><p>hihi</p></span>
            </div>
            
        </div>
    );
}