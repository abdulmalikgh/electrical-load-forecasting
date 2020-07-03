import React, {Component} from "react";
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var dataPoints =[];
class MediumTerm extends Component {
  state = {
    loading: true
  }
	componentDidMount(){
    let $this = this
  //	var chart = this.chart;
  
  const currentDate = new Date();
      const day = currentDate.getDate()
      const month = parseInt(currentDate.getMonth() + 1)
      const year = currentDate.getFullYear()

		fetch(`https://load-demand-forecast.herokuapp.com/api/daily/predictions/${year}/${month}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
      
			for(let i = 0; i < data.days.length; i++) {
				dataPoints.push({x:data.days[i], y:data.predictions[i]})
      }
       // chart.render();//
      $this.state.loading = false;
      console.log('data, ',dataPoints)
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
				title: "Day of The Month",
				prefix: "day",
			},
			data: [{
				type: "line",
				toolTipContent: "day {x}: {y}MW",
				dataPoints: dataPoints
      }]}
      
      if(this.state.loading) {
        return (
          <div className="container"> 
            <div className="row my-5">
              <div className="col-12">
                <div className="card">
                    <div className="row justify-content-center m-5 p-5">
                       <div className="col-12 m-auto">
                          <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only text-center">Loading...</span>
                          </div>
                       </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
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

export default MediumTerm;
