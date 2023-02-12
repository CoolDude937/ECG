import React from 'react';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import {useState, useEffect} from 'react'


const Heartrate =() =>{
    
    const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {message} 
      </header>
      <button >blue</button>
    </div>
  );
    
}
export default Heartrate;