//import { useState, useEffect } from 'react';
import './App.css';
import './facultyColors.css';



export default function CardInfo({ info, faculty }){
    
    function routeUWFlow(){
        window.open(`https://uwflow.com/course/${info.code.replace(/\s/g, '')}`);
    }

    return(
        <div id="mainCard" className={faculty+"Card"}>
            <h1 id="cardCode" className={faculty+"text"} onClick={routeUWFlow}>{info.code}</h1>
            <div style={{display: "inline-block"}}>
                {info.ratings === "N/A" ? <div/>: <p id="cardRatings" className={faculty+"LightDarkText"}>{info.ratings} Ratings</p>}
            </div>            
            <div id="horizontalLine" className={faculty+"Card"}/>
            <h2 id="cardName" className={faculty + "text"}>{info.name}</h2>
            
            <h3 className={"cardHeaders " + faculty + "text"}><strong>Easiness:</strong> {info.easy}%</h3>
            <div key={info.name+1} className="meter">
                <span key={info.name+1} style={{width: Number(info.easy)+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
            </div>

            <h3 className={"cardHeaders " + faculty + "text"}>Usefulness: {info.useful}%</h3>
            <div key={info.name+2} className="meter">
                <span key={info.name+2} style={{width: Number(info.useful)+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
            </div>

            <h3 className={"cardHeaders " + faculty + "text"}>Liked: {info.liked}%</h3>
            <div key={info.name+3} className="meter">
                <span key={info.name+3} style={{width: Number(info.liked)+"%"}}><span className={"progress " + faculty+"Background"}></span><p>hihi</p></span>
            </div>            
        </div>
    );
}