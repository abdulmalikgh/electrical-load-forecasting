import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTime:null,
            previousTime:null,
            weather: [],
            rtSTLF: 0,
            rtMTLF:0,
            st_manualForecast: 0,
        }
        this.showHourlyPrediction = this.showHourlyPrediction.bind(this);
    }
    getCurrentTime() {
      const currentTime = new Date().toLocaleTimeString()
      const previousTime = new Date(new Date().getTime() - (1000*60*60)).toLocaleTimeString()
      //console.log('currentTime',currentTime)

      this.setState({
          currentTime:currentTime,
          previousTime:previousTime
      })
      
    }
    componentDidMount(){
        this.getCurrentTime()
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
      logError(error) {
        console.error(error);
      }
      showHourlyPrediction(response) {
        if (response) {
          this.setState({rtSTLF: response.prediction});
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
                  console.log(respons)
                  this.setState({
                      rtMTLF:respons.prediction
                  })
              }).catch(this.logError)

            this.postData(forecastData)
              .then(this.validateResponse)
              .then(this.responseAsJson)
              .then(this.showHourlyPrediction)
              .catch(this.logError);
          })
          .catch(this.logError);
      }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row mt-5 mb-2 align-items-center justify-content-center">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="card border-left-primary">
                                <div className="card-header">
                                    <h2 className='text-primary title-text'> Real Time Hourly Forecast, Sunyani</h2>
                                </div>
                                <div className="card-body">
                                    <div className='row justify-content-center'>
                                        <div className='col-12'>
                                            <p className='text-center  time'>
                                                <span> {this.state.previousTime} </span>
                                                <span> - </span>         
                                                <span>{ this.state.currentTime }</span>
                                            </p>
                                            <p className='text-center  prediction'>{parseFloat(this.state.rtSTLF).toFixed(2)}</p>
                                            <p className='text-center  unit'>MegaWatt</p>
                                        </div>
                                        <div className='col-12'>
                                            <p className="text-center footer-text">Load Forecast Today &nbsp; 
                                            { new Date().toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
                                            </p> 
                                        </div>
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