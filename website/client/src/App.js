import React, { useState, useEffect } from 'react';
import './App.css';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import Heartrate from './components/Heartrate/Heartrate';
import Profile from './components/Profile/Profile';
import Head from './components/Head';
function App() {
  return (
      <div>
        <Head />
      </div>
  )
  
}

export default App;
