//import { useState, useEffect } from 'react';
import './App.css';
import './facultyColors.css';
import { useState } from 'react';
import ReactCardFlip from "react-card-flip";

export default function CardInfo({ info, faculty }){
    
    const [flip, setFlip] = useState(false);

    function routeUWFlow(){
        if(info.code !== "Click on a Course!") window.open(`https://uwflow.com/course/${info.code.replace(/\s/g, '')}`);
    }

    return(
    <ReactCardFlip isFlipped={flip} flipDirection='horizontal'>
        <div id="mainCard1" className={faculty+"Card theFont"} onClick={() => setFlip(!flip)}>
            <div id="courseNumbers">
                <h1 id="cardCode" className={faculty+"text theFontBold " + faculty+"Hover"} onClick={routeUWFlow}>{info.code}</h1>
                <div style={{display: "inline-block"}}>
                    {info.ratings === "N/A" ? <div/>: <p id="cardRatings" className={faculty+"LightDarkText theFontBold"}>{info.ratings} Ratings</p>}
                </div>            
                <div id="horizontalLine" className={faculty+"Card"}/>
                <h2 id="cardName" className={faculty + "text theFontBold"}>{info.name}</h2>
                
                <h3 className={"cardHeaders " + faculty + "text"}><strong>Easiness:</strong> {info.easy}%</h3>
                <div key={info.name+1} className="meter">
                    <span key={info.name+1} style={{width: Number(info.easy)+1+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
                </div>

                <h3 className={"cardHeaders " + faculty + "text"}>Usefulness: {info.useful}%</h3>
                <div key={info.name+2} className="meter">
                    <span key={info.name+2} style={{width: Number(info.useful)+1+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
                </div>

                <h3 className={"cardHeaders " + faculty + "text"}>Liked: {info.liked}%</h3>
                <div key={info.name+3} className="meter">
                    <span key={info.name+3} style={{width: Number(info.liked)+1+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
                </div>   
            </div>
            <h4 id="ClickOnMe" class={faculty+"LightDarkText theFont"}>Click The Card To Find Out More Info!!!</h4>
        </div>
        
        <div id="mainCard2" className={faculty+"Card theFont"} onClick={() => setFlip(!flip)}>
            <div id="courseDescriptionContainer">
                <h1 id="courseDescriptionHeader" className={faculty+"text theFontBold"}>Course Description</h1> 
                <div id="horizontalLineDesc" className={faculty+"Card"}/>
                <p id="courseDescription" className={faculty+"text theFont"}>Course description will be added here!</p>
            </div>
            <h1 id="recommendedTeacher" className={faculty+"text theFontBold"}> Recommended Professor</h1>
            <div id="horizontalLineDesc" className={faculty+"Card"}/>
            <p id="courseDescription" className={faculty+"text theFont"}>Professor will be added here!!!</p>
        </div>
    </ReactCardFlip>
    );
}