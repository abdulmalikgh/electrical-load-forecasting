import React, {Component} from "react";
import ChartComponent from './ChartComponent'

class PastHourly extends Component{
    constructor(props) {
        super(props)
        this.state = {
            time: '',
            loading:true,
            data:[],
            title:''
        }
    }
    handleChange =(event)=>{
     this.setState({
         [event.target.name] : event.target.value
     })
     
    }

    handleForm =(e)=>{
        e.preventDefault();
        const $this = this
        $this.setState({ loading: true})
      const dateTime = this.state.time.split('-');
      const dayHour = dateTime[2].split('T');
      const day = parseInt(dayHour[0]);
      const month = parseInt(dateTime[1]);
      let year = parseInt(dateTime[0])
       
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = parseInt(currentDate.getMonth() + 1 )
      const currentDay = currentDate.getDate()
      const date = new Date(year,month - 1,day)
      
      const monthname = date.toLocaleDateString('default',{ month: 'long' })
      const yearname = date.toLocaleDateString('defualt', { year:'numeric'})
      const dayname = date.toLocaleDateString('defualt', { weekday:'long'})
      
     
      
      $this.state.loadding = true
      fetch(`https://load-demand-forecast.herokuapp.com/api/hourly/predictions/${year}/${month}/${day}`)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
        
          if(data.hours.length === 0)  {
              alert('There is no Data Available for this date, make sure the date is not less than april and the hour is not greater than the current hour')
              
          } else {
          $this.setState({title: `Hourly Load Forecast for Sunyani on ${dayname} ${monthname} ${yearname}`})
          let dataPoints = []
          for(let i = 0; i < data.hours.length; i++) {
            dataPoints.push({x:data.hours[i], y:data.predictions[i]})
          $this.setState({data:dataPoints})
          }
    }
     $this.setState({loading: false})
      //chart.render();//
  
      });
      
      
    }
    componentDidMount(){
          let $this = this
          const currentDate = new Date();
          const day = currentDate.getDate()
          const month = parseInt(currentDate.getMonth() + 1)
          const year = currentDate.getFullYear();
          const monthname = currentDate.toLocaleString('default', { month: 'long' })
          const yearname = currentDate.toLocaleString('defualt', { year:'numeric'})
          const dayname = currentDate.toLocaleString('defualt', { weekday:'long'})
            console.log('currentDate', currentDate)
         $this.setState({title: `Hourly Load Forecast for Sunyani on ${dayname} ${monthname} ${yearname}`})
          
             fetch(`https://load-demand-forecast.herokuapp.com/api/hourly/predictions/${year}/${month}/${day}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let dataPoints = []
                for(let i = 0; i < data.hours.length; i++) {
                 dataPoints.push({x:data.hours[i], y:data.predictions[i]})
                $this.setState({data:dataPoints})
          }
           $this.setState({loading: false})
            //chart.render();//
        
            }).catch(err => {
                this.setState({loading:false}) 
               });
    
    }
    
   render() {
    let nodata;

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
      if(!this.state.loading && this.state.data.length == 0 ) {
        nodata =
          <div className="container">
            <div className="card m-5 p-5">
                <div className="row justify-content-center p-5 mt-5">
                    <p style={{fontSize:1.6 + 'em'}}> Network Error. No Data Available. Try Again </p>
                </div>
            </div>
          </div>
        
      }
    //console.log('points',this.state.data)
       return (
           <div className='container-fluid'>
             {nodata}
             {this.state.data.length > 0 && <div className='container'>
               <div className='row mt-1'>
                   <div className="col-12 ">
                       <div className='card'>
                                <div className="row justify-content-center ">
                                    <div className="col-lg-8 col-md-10 col-sm-11 mb-2">
                                    
                                        <form onSubmit={this.handleForm}>
                                        <div className="form-group">
                                        <label htmlFor='time' className='form-label time_'>Select date and time to check for the prediction of a particular day </label>
                                            <input className="form-control" 
                                            type='date' name="time"
                                            min='2020-03-10'
                                            max='2020-08-03'
                                            placeholder='select date and time'
                                            value={this.state.time} id='time' onChange={this.handleChange} required/>
                                            
                                        </div>
                                        
                                            <button className='btn btn-primary'>
                                                Submit 
                                            </button>
                                    </form>
                                   
                                </div>
                                </div>
                            </div>
                    </div>
               </div>
         </div> }
          {this.state.data.length > 0 && <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card">
                        {this.state.data.length > 0 && <ChartComponent data={this.state.data} max={24} title={this.state.title} hour={'hour'}/> }
                    </div>
                </div>
                </div>
       </div> }
        </div>
       )
   }
}

export default PastHourly;