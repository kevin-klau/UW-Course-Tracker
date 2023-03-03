import { useState, useEffect } from 'react';
import './App.css';

export default function CardInfo({ info }){

    return(
        <div id="mainCard">
            <p>{info.code}</p>
            <p>{info.name}</p>
            <p>{info.faculty}</p>
            <p>Useful: {info.useful}</p>
            <p>Easiness: {info.easy}</p>
            <p>Liked: {info.liked}</p>
            <p>Ratings: {info.ratings}</p>
            <p>{info.description}</p>
        </div>
    );
}