import { useState, useEffect } from 'react';
import './App.css';
import data from './datafull.json';

export default function Stats({ props }){
    const [filteredInfo, setFilteredInfo] = useState(data.filter(item => item.code.substring(0, props.course.length+1) ===(props.course+" ")));
    

    return(
        <div>
            <h1>{props.course}</h1>
            <h2>{props.name}</h2>
            {filteredInfo.map(item => (
                <div key={item.code}>
                    <h2>{item.code}</h2>
                    <p>{item.name}</p>
                    <p>Ratings: {item.ratings}</p>
                    <p>Useful: {item.useful}</p>
                    <p>Easy: {item.easy}</p>
                    <p>Liked: {item.liked}</p>
                </div>
            ))}
        </div>

    );

}

/*//const lengthCourse = course.length;
    //const [relevantCourses, setRelevantCourses] = useState([]);
    //data.filter(courseCode => (courseCode).code.substring(0,lengthCourse) === (course).substring(0,lengthCourse))

    return(
        <div>
            <h1>{course}</h1>
            <h2>{name}</h2>
            <h3>{faculty}</h3>
            
        </div>

    );*/