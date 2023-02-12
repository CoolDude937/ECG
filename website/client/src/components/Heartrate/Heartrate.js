import React from 'react';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import {useState, useEffect} from 'react'
import './heartrate.scss'


const Heartrate =() =>{
    const [level, setLevel] = useState(0);
    
    const [message, setMessage] = useState("aa");
/*
useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
      
    }, 50);
    return () => clearInterval(interval);
  }, []);*/
  return (
    <div className="rate">
      
     <h1> Average BPM: {message}</h1>
     <div className='status'>

     </div>
    </div>
  );
    
}
export default Heartrate;

