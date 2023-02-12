import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rate from './components/Heartrate/Rate';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.querySelector("#root"));
ReactDOM.render(<Rate />, document.getElementById('moot'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
