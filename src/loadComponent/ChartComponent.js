import React from "react";
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartComponent extends React.Component{
  render() {
    const options = {
			theme: "light2",
			title: {
				text: "Load Forecasting For december 2019"
			},
			axisY:[{ 
				title: "Predictions",
        suffix: "MW",
        scales: {
              ticks: {
                  max: 24,
                  min: 0,
                  step:1
              }
          
      },

      }],
			axisX: {
				title: "Hour of The Day",
				prefix: "hr",
      },
			data: [{
				type: "line",
				toolTipContent: "hour {x}: {y}MW",
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
