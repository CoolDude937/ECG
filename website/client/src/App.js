import React, { useState, useEffect } from 'react';
import './app.scss';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

import Profile from './components/Profile/Profile';
import Head from './components/Head';
import Footer from './components/Footer/Footer';

function App() {
  const [angry, setAngry] = useState(0);
  const [happy, setHappy] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [sad, setSad] = useState(0);
  const [surprised, setSurprised] = useState(0);
  return (
      <div>
          <Head />

      </div>
  )
  
}

export default App;
