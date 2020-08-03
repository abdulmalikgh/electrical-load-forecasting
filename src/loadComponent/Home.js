import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime:this.formatTime(new Date().getHours()),
            previousTime:this.formatTime(new Date(new Date().getTime() + (1000*60*60)).getHours()),
            weather: [],
            rtSTLF: 0,
            rtMTLF: 0,
            isLoading: true,
        }
        this.showHourlyPrediction = this.showHourlyPrediction.bind(this);
    }
    formatTime(time) {
        let dd = 'AM'

        if(time > 12) {
          time = time - 12 
          dd = 'PM'
        }
        if(time === 12 ) {
            time = 12
        }
        return `${time} : 00 ${dd}`
    }

    componentDidMount(){
        //this.getCurrentTime()
        
        this.getWeather(
            "//api.openweathermap.org/data/2.5/weather?q=sunyani&appid=c007d2a99be5bbfad82815648742b9a9"
          );
    }

    //helper functions
    validateResponse(response) {
        if (!response.ok) {
          throw new Error("An Error occurs", response.statusText);
        } else {
          
          return response;
        }
        
      }
      responseAsJson(response) {
        return response.json();
    
      }
      showHourlyPrediction(response) {
        if (response) {
          this.setState({rtSTLF: response.prediction,
          });
          this.setState({isLoading:false})
        }
      }
      setWeather(data) {
        this.setState({weather: data});
      }
      postData(forecastData) {
        return fetch(
          "https://load-demand-forecast.herokuapp.com/api/predict/hourly",
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
      getWeather(api) {
        fetch(api)
          .then(this.validateResponse)
          .then(this.responseAsJson)
          .then((data) => {
            const temp = data.main.temp;
            const hum = data.main.humidity;
            const dateObject = new Date();
            const hour = dateObject.getHours();
            const day = dateObject.getDate();
            const month = dateObject.getMonth();
            const pressure = data.main.pressure;

            const forecastData = {
              day: day,
              month: month,
              hour: hour,
              temperature: temp,
              humidity: hum,
            };
            //this.setState({isLoading : true})
            fetch("https://load-demand-forecast.herokuapp.com/api/predict/daily",
            {
              method: "post",
              mode: "cors",
              body: JSON.stringify({
                  day:day,
                  month:month,
                  humidity:hum,
                  temperature:temp,
                  pressure:pressure
              }),
              headers: {
                "content-type": "application/json",
              },
            }).then(this.validateResponse)
              .then(this.responseAsJson)
              .then(respons => {
                  //console.log(respons)
                  
                  this.setState({
                      rtMTLF:respons.prediction,
                  })
                  this.setState({isLoading:false})
              }).catch(err => {
                 this.setState({isLoading:false})
              })

            this.postData(forecastData)
              .then(this.validateResponse)
              .then(this.responseAsJson)
              .then(this.showHourlyPrediction)
              .catch(this.logError);
          })
          .catch(err => {
             this.setState({isLoading:false}) 
            });
      }
  
    render() {
      let nodata;
      if(this.state.isLoading) {
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
      if(!this.state.loading && this.state.rtSTLF === 0 && this.state.rtMTLF === 0 ) {
        nodata =
          <div className="container">
            <div className="row justify-content-center p-5">
                <p style={{fontSize:1.6 + 'em'}}> Network Error. No Data Available. Try Again </p>
            </div>
          </div>
        
      }
      //console.log('loadig data', this.state.rtMTLF, this.state.rtSTLF)
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row mt-5 mb-2 align-items-center justify-content-center">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="card border-left-primary">
                                <div className="card-header">
                                    <h2 className='text-center title-text'> Real Time Load Forecast For Sunyani</h2>
                                </div>
                                <ul class="nav nav-pills my-3 justify-content-center" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="pills-home-tab" 
                                        data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" 
                                        aria-selected="true">Hourly Forecast</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="pills-profile-tab" 
                                        data-toggle="pill" href="#pills-profile" role="tab" 
                                        aria-controls="pills-profile" aria-selected="false">Daily Forecast</a>
                                    </li>
            
                                </ul>
                                <hr />
                                    
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                          {nodata}
                                         {this.state.rtSTLF > 0 &&  <div className="card-body">
                                                <div className='row justify-content-center'>
                                                <div className='col-12'>
                                                        <p className="text-center header-text">Hourly Load Forecast Today &nbsp; 
                                                        { new Date().toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
                                                        </p>
                                                        <p className='text-center  time'>
                                                                   
                                                            <span> from { this.state.currentTime }</span>
                                                            <span> to {this.state.previousTime} </span> 
                                                        </p> 
                                                    </div>
                                                    <div className='col-12 pb-5'>
                                                        
                                                        <p className='text-center  prediction'>{parseFloat(this.state.rtSTLF).toFixed(2)}</p>
                                                        <p className='text-center  pb-4 unit'>MegaWatt</p>
                                                        <hr />
                                                    </div>
                                                    
                                                </div>
                                            </div>}
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            {nodata}
                                            {this.state.rtMTLF > 0 && <div className="card-body">
                                                    <div className='row justify-content-center'>
                                                    <div className='col-12'>
                                                            <p className="text-center header-text">Daily Load Forecast Today &nbsp; 
                                                            { new Date().toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
                                                            </p> 
                                                            <p className='text-center  time'>
                                                               <span>  from  12:00 AM to 11.59 PM </span>
                                                            </p>
                                                        </div>
                                                        <div className='col-12 pb-5'>
                                                            <p className='text-center  prediction'>{parseFloat(this.state.rtMTLF).toFixed(2)}</p>
                                                            <p className='text-center  unit pb-4'>MegaWatt</p>
                                                            <hr />
                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>
                                    
                                    </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </React.Fragment>
        )
    }
}

export default Home