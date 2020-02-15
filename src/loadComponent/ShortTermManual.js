import React, { Component } from 'react';
class ShortTermManual extends Component{
   render() {
       return (
           <div className='shortTerm-manual'>
               <div className='shortTerm-form'>
               <h2>Short Term Load Forecasting</h2>
               <form>
                   <div>
                   <label for='date'>Date: </label> 
                    <input type='date' placeholder='Enter date' id='date'/>
                   </div>
                   <div>
                   <label for='time'>Time:</label> 
                    <input type='time' placeholder='Enter time' id='time'/>
                   </div>
                   <div>
                   <label for='humidity'>Humidity: </label> 
                    <input type='number' placeholder='Enter humidity' id='humidity'/>
                   </div>
                    <div>
                    <label for='temperature'>Temperature: </label> 
                    <input type='number' placeholder='Enter Temperature' id='temperature'/>
                    </div>
                   <button>Submit</button>
               </form>
               </div>
           </div>
       )
   }
}
export default ShortTermManual;