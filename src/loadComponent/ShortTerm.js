import React, {Component} from "react";
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class ShortTerm extends Component {
  //loading = true
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
        chart.render();//
    
		});


	}
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
      }]}
      /*
      if(this.state.loading) {
        return (
          <div className="container"> 
            <div className="row my-5">
              <div className="col-12">
                <div className="card">
                    <div className="row justify-content-center m-5 p-5">
                       <div className="col-12 m-auto">
                          <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only text-center">Loading...</span>
                          </div>
                       </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
      }*/
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card">
             <CanvasJSChart options = {options} 
				      onRef={ref => this.chart = ref}
		        	/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortTerm;
