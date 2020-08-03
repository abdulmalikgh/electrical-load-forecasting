import React, { Component } from 'react';

class MediumTermManual extends Component{
    constructor(props) {
        super(props)
        this.state = {
            time: '',
            humidity:'',
            temperature:'',
            prediction: 0,
            pressure:'',
            loading:false,
        }
    }
    handleChange =(event)=>{
     this.setState({
         [event.target.name] : event.target.value
     })
    }
    validateResponse = (response)=>{
     if(!response.ok) {
        this.setState({loading:true})
         throw new Error('An error occurs', response.statusText)
     }
     return response;
    }
    responseAsJson = (response) => {
     return response.json()
    }
    showPrediction = (jsonResponse)=>{
     this.setState({prediction:jsonResponse.prediction})
     this.setState({loading:false})
    }
    postData(forecastData) {
        return fetch(
          "https://load-demand-forecast.herokuapp.com/api/predict/daily",
          {
            method: "post",
            mode: "cors",
            body: JSON.stringify(forecastData),
            headers: {
              "content-type": "application/json",
            },
          }
        );
      }
    handleForm =(e)=>{
        e.preventDefault();
        this.setState({loading:true})
      const dateTime = this.state.time.split('-');
      const dayHour = dateTime[2].split('T');
      const day = parseInt(dayHour[0]);
      const month = parseInt(dateTime[1]);
      const humidity = parseFloat(this.state.humidity);
      const temperature = parseFloat(this.state.temperature)
      const pressure = parseFloat(this.state.pressure)

      const forecastData = {
        day:day,
        month:month,
        pressure:pressure,
        temperature:temperature,
        humidity:humidity
     }
     console.log('day', forecastData)
     
     this.postData(forecastData)
      .then(this.validateResponse)
      .then(this.responseAsJson)
      .then(this.showPrediction)
      .catch( err => {
        this.setState({loading:true})
          console.error(err)
      }) 


    }
   render() {
       let spinner;
       let valuePredicted;
    if(this.state.loading) {
        spinner = 
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only">Loading...</span>
       </div>
    }

    if(this.state.prediction) {
        valuePredicted = <div className="container"> 
            <div className="row justify-content-center">
                <div className="col-12 value-predicted ">
                    <p className="text-center p-3"> Your Prediction:  {parseFloat(this.state.prediction).toFixed()} MW </p>
                </div>
            </div>
        </div>
    }
       return (
           <div className='container'>
               <div className='row mt-5'>
                   <div className="col-12 ">
                       <div className='card'>
                           { valuePredicted }
                            <h2 tabIndex='-1' className='text-center pt-2 pb-5'>Daily Load Forecasting</h2>

                                <div className="row justify-content-center ">
                                    <div className="col-lg-8 col-md-10 col-sm-11 mb-5">
                                    
                                        <form onSubmit={this.handleForm}>
                                        <div className="form-group">
                                        <label htmlFor='time' className='form-label'>Select Day and Month</label>
                                            <input className="form-control" type='date' name="time" placeholder='select date and time'
                                            value={this.state.time} id='time' onChange={this.handleChange} required/>
                                            
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor='humidity'>Humidity </label>
                                            <input type='number' className="form-control" placeholder='Enter humidity' id='humidity'
                                            name='humidity' value={this.state.humidity} onChange={this.handleChange} required/>
                                            
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor='temperature'>Temperature </label>
                                            <input className="form-control" type='number' value={this.state.temperature}  name='temperature' 
                                            placeholder='Enter Temperature' id='temperature' onChange={this.handleChange} required/>
                                            
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor='pressure'>Pressure</label>
                                            <input className="form-control" type='number' value={this.state.pressure}  name='pressure' 
                                            placeholder='Enter pressure' id='pressure' onChange={this.handleChange} required/>
                                            
                                        </div>
                                        <button className='btn btn-primary'>Submit
                                            {spinner}
                                        </button>
                                    </form>
                                   
                                </div>
                                </div>
                            </div>
                    </div>
               </div>
           </div>
       )
   }
}
export default MediumTermManual;