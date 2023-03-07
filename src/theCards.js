import { useState, useEffect } from 'react';
import './App.css';
import './Cards.css';

export default function CardInfo({ info, faculty }){

    return(
        <div id="mainCard" class={faculty}>
            <h1 id="cardCode" class={faculty + "text"} style={{display: "inline-block"}}>{info.code}</h1>
            <p id="cardRatings" style={{display: "inline-block"}} class={faculty + "lighttext"}>{info.ratings} Ratings</p>
            <div id="horizontalLine" class={faculty}/>
            <h2 id="cardName" class={faculty + "text"}>{info.name}</h2>
        </div>
    );
}