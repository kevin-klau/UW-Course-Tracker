import { useState } from 'react';
import { Courses } from './courselist.js';
import { useEffect } from 'react';
import Stats from './stats.js';
import './App.css';
import './button-colours.css';
import Fuse from 'fuse.js';


/*function CoolButton ({ prop }){
    let classInfo = prop.faculty;
    return (
        <button id="SearchResults" class={classInfo+" btn btn-outline-success"} style={{borderWidth:"3px"}}>{prop.course}</button>
    );
}*/



export default function Form(){
    
    // Setting if the graphs and stuff should be revealed
    const [revealInfo, setRevealInfo] = useState(false);

    // Setting User Input
    const [userInput, setUserInput] = useState('');
    
    // Checking whether or not to reveal alert
    const [alert, setAlert] = useState(false);

    // Setting up the fuzzy search
    const options = {
        keys:['course', 'name'],
        includeScore:true,
        threshold: 1
    };
    const fuse = new Fuse(Courses, options);
    
    // Setting up the top searches
    const [results, setResults] = useState(fuse.search("A").slice(0,5));

    // Function to include results
    function MostRelevant(e){
        e.preventDefault();
        setAlert(false);
        setUserInput(e.target.value);
        if (e.target.value !== ""){
            setResults(fuse.search(e.target.value).slice(0,5));
        }
    }

    // Function to handle when they want to search
    function Submitted(e){
        e.preventDefault();

        if (userInput.toUpperCase() !== results[0].item.course){
            setAlert(true);
        }else{
            setAlert(false);
            Selected(results[0].item);
        }
    }
    
    const [selectedCourse, setSelectedCourse] = useState({});

    // Function to handle when they finally choose a subject
    function Selected({ prop }){
        setRevealInfo(true);
        setSelectedCourse ({prop});
    }


    
    return(
        <div>
            <form id="form" class="d-flex container" role="search" onSubmit={Submitted} style={{position:'relative'}}>
                <input onChange={MostRelevant} id="input" class="form-control me-2 d-flex clear" type="search" placeholder="Enter Subject Here" aria-label="Search"></input>
                <button id="inputbutton" class="btn btn-outline-success" type="submit">🔎︎</button>
                <div className={`fade ${alert ? 'show' : 'hide'}`} style={{ position: 'absolute', top: 5, left: -40, display:'flex', textAlign:'Center'}}>
                        <div id="alert" class="alert alert-danger" role="alert">
                            Invalid Course Subject
                        </div>
                </div>
            </form>
            <div class="container">
                {results.map((result) => (
                <button id="SearchResults" class={result.item.faculty+" btn btn-outline-success"} style={{borderWidth:"3px"}} onclick={() => Selected(result.item)}>{result.item.course}</button>
                ))}
            </div>

        <div>
            {revealInfo ? <Stats props={selectedCourse}></Stats> : <div/>}
        </div>
            

        </div>

    );

}