import './App.css';
import background from './Images/Background-Bottom.png'
import Form from './form.js'

import { useState } from 'react';

function App() {
  return (
    <div id="everything">
      <div id="heading">
        <h1 id="title">UW Course Tracker<div id="stick-out"></div></h1>
      </div>
      <div>
        <img src={background} alt="Background" id="back-bottom"></img>
        <h2 id="subtitles"> Designed By: Kevin Lau | Data Source: UWFlow </h2>
      </div>
      
      <p id="info">Welcome To The UW Course Tracker! Enter your subject below, and we'll help you choose the best course!!!</p>
      
      <Form></Form>
      
    </div>
    
  );
}

export default App;
