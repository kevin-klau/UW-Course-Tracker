/*import './App.css';
import background from './Images/Background-Bottom.png'
import Form from './form.js'


function App() {
  return (
    <div id="everything">
      <div id="heading" className="theFontUltraBold">
        <h1 id="title">UW Course Tracker<div id="stick-out"></div></h1>
      </div>
      <div>
        <img src={background} alt="Background" id="back-bottom"></img>
        <h2 id="subtitles" className="theFontBold"> Designed By: Kevin Lau | Data Source: UWFlow </h2>
      </div>
      
      <p id="info" className="theFont">Welcome To The UW Course Tracker! Enter your subject below, and we'll help you choose the best course!!!</p>
      
      <Form></Form>
      
  </div>
    
  );
}

export default App;*/

import { useState } from 'react';
import { Courses } from './courselist.js';
import Stats from './stats.js';
import './App.css';
import './facultyColors.css';
import Fuse from 'fuse.js';
;


function App() {

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
          Selected(results[0].item.course, results[0].item.faculty, results[0].item.name);
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
      setTimeout(function() {
        document.getElementById('secondPageInfo').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 100);
      setSelectedCourse ({course:course, faculty:faculty, name:name});
  }

  function routeUWFlowHome(){
    window.open("https://uwflow.com/");
}

  return (
    <div id="background">
        <div id="contain">
          <div id="innerContainer">
            <div id='thing' className="child">
              <div><h1 id="title" className="theFontUltraBold">UW Course Tracker</h1>
              <p id="info" className="theFont">Welcome! Enter your subject below, and we'll help you pick a course!!!</p>
              <form id="form" className="row" role="search" onSubmit={Submitted}>
                  <div className={`fade ${alert ? 'show' : 'hide'} col-lg-3`} style={{display:'flex', textAlign:'Center', alignItems:'Center', justifyContent:'center'}}>
                          <div id="alert" className="theFont" role="alert">
                              Invalid Subject
                          </div>
                  </div>
                  <div className="col-lg-6 d-flex" style={{display:"flex", marginTop:'5px'}}>
                      <input onChange={MostRelevant} id="input" aria-autocomplete="list" className="form-control me-2 d-flex clear theFont" type="search" placeholder="Enter Subject (ie. MATH)" aria-label="Search"></input>
                      <button id="inputbutton" className="btn" type="submit">🔎︎</button>
                  </div>
              </form>
              <div id="Buttons" className="container">
                  {results.map((result) => (
                  <button id="SearchResults" key={result.item.course} className={result.item.faculty+"Button btn theFont"} style={{borderWidth:"3px"}} onClick={() => Selected(result.item.course, result.item.faculty, result.item.name)}>{result.item.course}</button>
                  ))}
              </div></div>
            </div>
            <div className="child"><Stats id="stat" key={selectedCourse.course} props={selectedCourse}></Stats></div>
          </div>
          <div style={{marginTop: 'auto', paddingLeft: '20px', paddingRight:'20px', paddingTop: '15px'}} className="row">
            <div className="col-sm-4"><h1 class="theFont personal">Designed By: Kevin Lau</h1></div>
            <div className="col-sm-4"><h1 class="theFont personal" style={{textAlign:'center'}}>Data Updated: 02-23-2023</h1></div>
            <div className="col-sm-4" style={{display: 'flex', justifyContent:'right'}}><h1 class="theFont personal" style={{paddingRight:'4px'}}>Data Source: </h1><h1 class="theFont personal normHover" style={{textDecoration:'underline'}} onClick={routeUWFlowHome}>https://uwflow.com/</h1></div>
          </div>
        </div>
    </div>
    
  );
}

export default App;
