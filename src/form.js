import { useState } from 'react';
import { Courses } from './courselist.js';
import './App.css';

export default function Form(){
    
    const [userInput, setUserInput] = useState('');
    
    
    return(
        <form id="form" class="d-flex container" role="search">
            <input value={userInput} onChange={e => setUserInput(e.target.value)} id="input" class="form-control me-2 d-flex" type="search" placeholder="Enter Subject Here" aria-label="Search"></input>
            <button id="inputbutton" class="btn btn-outline-success" type="submit">🔎︎</button>
            <p>{Courses.MATH}</p>
        </form>

    );

}