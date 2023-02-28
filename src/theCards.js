import { useState, useEffect } from 'react';
import './App.css';

export default function CardInfo({ info }){

    return(
        <div id="mainCard">
            <p>{info.code}</p>
            <p>{info.name}</p>
            <p>{info.faculty}</p>
            <p>{info.useful}</p>
            <p>{info.easy}</p>
            <p>{info.liked}</p>
            <p>{info.ratings}</p>
            <p>{info.description}</p>
        </div>
    );
}