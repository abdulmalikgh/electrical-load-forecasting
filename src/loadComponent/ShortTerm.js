import React, {Component} from "react";
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


let dataPoints = []
class ShortTerm extends Component {
  
state = {
      date : '',
      loading: true,
      month: '',
      year:'',
      day:'',
      
    }
    
    handleChange = (date)=>{
     
      this.setState(
        {date}
      )
      this.handleSubmit(date)
    }
   handleSubmit=(date)=>{
     const $this = this
    $this.setState({ loading: true})
    const dateTime = date.split('-');
    const dayHour = dateTime[2].split('T');
    const day = parseInt(dayHour[0]);
    const month = parseInt(dateTime[1]);
    const year = parseInt(dateTime[0]);
    console.log('month', month)

    fetch(`https://load-demand-forecast.herokuapp.com/api/hourly/predictions/${year}/${month}/${day}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            
			for(let i = 0; i < data.hours.length; i++) {
        dataPoints.push({x:data.hours[i], y:data.predictions[i]})
        //$this.setState({dataPoints:{x:data.hours[i], y:data.predictions[i]}})
      }
       $this.setState({loading: false})
    })
}
	componentDidMount(){
     let $this = this
    //var chart = this.chart;
     const currentDate = new Date();
      const day = currentDate.getDate()
      const month = parseInt(currentDate.getMonth() + 1)
      const year = currentDate.getFullYear()
      console.log('day', day, 'month', month, 'year', year)
      
		 fetch(`https://load-demand-forecast.herokuapp.com/api/hourly/predictions/${year}/${month}/${day}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            
			for(let i = 0; i < data.hours.length; i++) {
        dataPoints.push({x:data.hours[i], y:data.predictions[i]})
        //$this.setState({dataPoints:{x:data.hours[i], y:data.predictions[i]}})
      }
       $this.setState({loading: false})
        //chart.render();//
    
		});


	}
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
				dataPoints: dataPoints
      }]}
      
      if(this.state.loading) {
        return (
          <div className="container"> 
            <div className="row my-5">
              <div className="col-12">
                <div className="card">
                    <div className="row justify-content-center m-5 p-5">
                       <div className="col-12">
                          <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
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
        <div className="row mt-2">
          <div className="col-12"> 
              <form onSubmit={this.handleSubmit}>
                  <div className="form-row align-items-center">
                  <div className="col-auto">
                      <label htmlFor='time' className='form-label text-light'>Select date for prediction </label>
                        <input className="form-control" type='datetime-local' 
                            name='date' placeholder='select date and time'
                            value={this.state.date} id='time' onChange = { (event)=> {this.handleChange(event.target.value)}} required/>
                                                    
                      </div>
                      <div className="col-auto pt-4">
                          <button className="btn btn-primary my-auto">submit</button>
                      </div>
                  </div>
              </form>
             </div>
          </div>
    
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
