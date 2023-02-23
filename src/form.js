import { useState } from 'react';
import { Courses } from './courselist.js';
import './App.css';
import Fuse from 'fuse.js';

function CoolButton ({ object }){
    return (
        <button>object.</button>
    );
}

export default function Form(){
    
    // Setting User Input
    const [userInput, setUserInput] = useState('');
    
    // Setting up the fuzzy search
    const options = {
        keys:['course'],
        includeScore:true,
        threshold: 1
    };
    const fuse = new Fuse(Courses, options);
    
    // Setting up the top searches
    const [results, setResults] = useState(fuse.search("A").slice(0,5));

    // Function to include results
    function MostRelevant(e){
        e.preventDefault();
        setUserInput(e.target.value);
        setResults(fuse.search(e.target.value).slice(0,5));
    }

    // Function to handle when they want to search
    function Submitted(e){
        e.preventDefault();
        //if ({userInput}.toLowerCase() !== )
    }
    
    return(
        <form id="form" class="d-flex container" role="search" onSubmit={Submitted}>
            <input onChange={MostRelevant} id="input" class="form-control me-2 d-flex" type="search" placeholder="Enter Subject Here" aria-label="Search"></input>
            <button id="inputbutton" class="btn btn-outline-success" type="submit">🔎︎</button>
            <ul>
                
                <button key={results[0].course}>{results[0].faculty}</button>
                {results.map((result) => (

                <button key={result.item.course}>{result.item.course}</button>
                
                ))}
            </ul>
        </form>

    );

}