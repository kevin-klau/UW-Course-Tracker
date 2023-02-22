import './App.css';
import background from './Background-Bottom.png'

function App() {
  return (
    <div>
      <div id="heading">
        <h1 id="title">UW Course Tracker<div id="stick-out"></div></h1>
      </div>
      <div>
        <img src={background} alt="Background" id="back-bottom"></img>
        <h2 id="subtitles"> Designed By: Kevin Lau | Data Source: UWFlow </h2>
      </div>
      
      <div class="bd-search">

      </div>
      
    </div>
    
  );
}

export default App;
