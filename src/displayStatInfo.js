//import { useState, useEffect} from 'react';
import './App.css';


export default function VerticalDisplay ({ course, faculty }){

    return (
        <>
            <div id="facultyStatsCard" className={faculty+"Card"}>
                <h1 className={faculty+"text"}>{course.code}</h1>
                <h4 className={faculty+"text"}> {course.name}</h4>
            </div>
        </>
    );
}