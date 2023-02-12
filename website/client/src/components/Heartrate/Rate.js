/*import React, {useState, useEffect, Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{x: 1, y: 1}];
var xVal = 2;
var count = 0;

var updateInterval = 1000;
const Rate = () =>  {
  const [message, setMessage] = useState("aa");
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
      ++count;
      if (count >= 80) {
        updateChart();
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
	
	const updateChart = () => {
		dps.push({x: xVal,y: message});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
	}
	
		return (
		<div>
			<CanvasJSChart options = {{
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/ //}
		 /*</div>
		);
	
}
export default Rate;     */

 /* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
import ReactDOM from 'react-dom/client';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{x: 1, y: 1}];
var xVal = 2
var yVal = 1;
var updateInterval = 4000;
class Rate extends Component {
	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
	
		setInterval(this.updateChart, updateInterval);
		
		
	}
	updateChart() {
		fetch("http://localhost:5000/message")
		.then((res) => res.json())
		.then((data) => yVal = data.message);
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	render() {
		const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Rate;