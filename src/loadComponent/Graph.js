import React, {Component} from 'react'
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];
class Graph extends Component {
 
	render() {	
		const options = {
			theme: "light2",
			title: {
				text: "Load Forecasting For december 2019"
			},
			axisY: {
				title: "Predictions",
				suffix: "MW",
			},
			axisX: {
				title: "Hour of The Day",
				prefix: "hr",
			},
			data: [{
				type: "line",
				toolTipContent: "hour {x}: {y}MW",
				dataPoints: dataPoints
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
	
	componentDidMount(){
		var chart = this.chart;
		fetch('https://load-demand-forecast.herokuapp.com/api/hourly/predictions/2020/5/26')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            
			for(let i = 0; i < data.hours.length; i++) {
				dataPoints.push({x:data.hours[i], y:data.predictions[i]})
			}
			/*
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: new Date(data[i].x),
					y: data[i].y
				}); 
			}*/
			
			chart.render();
		});

		fetch('')
	}
}

export default Graph;                  