import React, { Component } from 'react';
class ShortTermManual extends Component{
    constructor(props) {
        super(props)
        this.state = {
            time: '',
            humidity:'',
            temperature:'',
            prediction: 0
        }
    }
    handleChange =(event)=>{
     this.setState({
         [event.target.name] : event.target.value
     })
    }
    validateResponse = (response)=>{
     if(!response.ok) {
         throw new Error('An error occurs', response.statusText)
     }
     console.log(response)
     return response;
    }
    responseAsJson = (response) => {
     return response.json()
    }
    showPrediction = (jsonResponse)=>{
     console.log(jsonResponse)
     this.setState({prediction:jsonResponse.prediction})
     alert('Your prediction is:', this.state.prediction)
    }

    handleForm =(e)=>{
        e.preventDefault();
      const dateTime = this.state.time.split('-');
      const dayHour = dateTime[2].split('T');
      const day = parseInt(dayHour[0]);
      const month = parseInt(dateTime[1]);
      const hour = parseInt(dayHour[1].split(':')[0])
      const humidity = parseFloat(this.state.humidity);
      const temperature = parseFloat(this.state.temperature)
      const forecastData = {
        day:day,
        month:month,
        hour:hour,
        temperature:temperature,
        humidity:humidity
     }
     this.props.postData(forecastData)
      .then(this.validateResponse)
      .then(this.responseAsJson)
      .then(this.showPrediction)
      .catch( err => {
          console.error(err)
      })


    }
   render() {
    
       return (
           <div className='shortTerm-manual'>
               <div className='shortTerm-form'>
               <h2 tabIndex='-1'>Short Term Load Forecasting</h2>
               <form onSubmit={this.handleForm}>
                   <div>
                   <label htmlFor='time'>Select date and time </label>
                    <input type='datetime-local' name="time" placeholder='select date and time'
                    value={this.state.time} id='time' onChange={this.handleChange} required/>
                    
                   </div>
                   <div>
                   <label htmlFor='humidity'>Humidity </label>
                    <input type='number' placeholder='Enter humidity' id='humidity'
                    name='humidity' value={this.state.humidity} onChange={this.handleChange} required/>
                     
                   </div>
                    <div>
                    <label htmlFor='temperature'>Temperature </label>
                    <input type='number' value={this.state.temperature}  name='temperature' 
                     placeholder='Enter Temperature' id='temperature' onChange={this.handleChange} required/>
                    
                    </div>
                   <button id='submit-shorterm'>Submit</button>
               </form>
               </div>
           </div>
       )
   }
}
export default ShortTermManual;