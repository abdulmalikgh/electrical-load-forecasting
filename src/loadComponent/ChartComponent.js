import React from "react";
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartComponent extends React.Component{
  render() {
    const hour = this.props.hour ? 'Hour' : 'Day'
    const day = this.props.hour ? 'Day' : 'Month'
    const prefix = this.props.hour ? 'hr' : 'day'
    const options = {
			theme: "light2",
			title: {
				text: this.props.title
			},
			axisY:{ 
				title: "Predictions",
                suffix: "MW "
            },
			axisX: {
				title: `${hour} of The ${day}`,
                prefix: prefix,
                maximum: this.props.max ? this.props.max : 31,
                interval:1
                },
			data: [{
				type: "line",
				toolTipContent: `${hour} {x}: {y}MW`,
				dataPoints: this.props.data
      }]}
  
      
    return (
      <CanvasJSChart options = {options} 
			onRef={ref => this.chart = ref}
		   />
        
    );
  }
}


export default ChartComponent;
