import React, { Component } from 'react';
import Clock from './Clock';

class ShortTerm extends Component {
    render(){
      const localDate = this.props.date;
      const date = localDate.toDateString();
      
      return (
          <div className='load-forecasting'>
           <div className='forecasting-header'>
              <h2>hourly forecasting</h2>
           </div>
           <div className='forecasting-forecast'>
             <Clock time={this.props.time}/>
             <p className='actual-load-forecasted'>18.45 MW/H </p>
             <p className='description'>{`Forecast for,${date}`}</p> 
           </div>
           <div className='forecasting-type'>
               <button className='hourly'>this hour</button>
               <button className='daily'>today</button>
               <button className='monthly'>this month</button>
           </div>
          </div>
      )
    }
}

export default ShortTerm;