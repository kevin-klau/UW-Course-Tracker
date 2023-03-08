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
    const [results, setResults] = useState(fuse.search("EC").slice(0,5));

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
            Selected(results[0].item.course,results[0].item.faculty,results[0].item.name);
        }
    }
    
    const [selectedCourse, setSelectedCourse] = useState({
        course:"",
        faculty:"",
        name:""
    });

    // Function to handle when they finally choose a subject
    function Selected(course, faculty, name){
        // Set revealInfo to true and update the selected course
        setRevealInfo(true);
        window.location.hash = "#nextInfo";
        setSelectedCourse ({course:course, faculty:faculty, name:name});
    }


    
    return(
        <div>
            <form id="form" className="d-flex container" role="search" onSubmit={Submitted} style={{position:'relative'}}>
                <div className={`fade ${alert ? 'show' : 'hide'}`} style={{ position: 'absolute', top: 5, left: -40, display:'flex', textAlign:'Center'}}>
                        <div id="alert" className="alert alert-danger" role="alert">
                            Invalid Course Subject
                        </div>
                </div>
                <input onChange={MostRelevant} id="input" className="form-control me-2 d-flex clear" type="search" placeholder="Enter Subject Here" aria-label="Search"></input>
                <button id="inputbutton" className="btn btn-outline-success" type="submit">🔎︎</button>
            </form>
            <div id="Buttons" className="container">
                {results.map((result) => (
                <button id="SearchResults" divKey={result.item.course} className={result.item.faculty+" btn btn-outline-success"} style={{borderWidth:"3px"}} onClick={() => Selected(result.item.course, result.item.faculty, result.item.name)}>{result.item.course}</button>
                ))}
            </div>
                <div key={selectedCourse.code} id = "nextInfo" >
                    {revealInfo ? (
                        <Stats key={selectedCourse.code} props={selectedCourse}></Stats> 
                    ): <div/>}
                </div>
            

        </div>

    );

}