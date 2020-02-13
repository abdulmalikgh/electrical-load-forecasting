import React, { Component } from 'react';
class ShortTerm extends Component {
    render(){
      return (
          <div className='load-forecasting'>
           <div className='forecasting-header'>
              <h2>hourly forecasting</h2>
           </div>
           <div className='forecasting-forecast'>
             <p className='time'>6:00AM</p>
             <p className='actual-load-forecasted'>18.45 MW/H </p>
             <p className='description'>forecast for today,</p> 
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