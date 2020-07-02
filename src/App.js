import React, {Component} from "react";
import "./App.css";
import Footer from "./Footer";
import ShortTerm from "./loadComponent/ShortTerm";
import ShortTermManual from "./loadComponent/ShortTermManual";
import MediumTerm from './loadComponent/MediumTerm';
import MediumTermManual from './loadComponent/MediumTermManual'
import Navigation from "./Navigation";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      weather: [],
      rtSTLF: 0,
      st_manualForecast: 0,
    };
    this.showHourlyPrediction = this.showHourlyPrediction.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 100);
    this.getWeather(
      "//api.openweathermap.org/data/2.5/weather?q=sunyani&appid=c007d2a99be5bbfad82815648742b9a9"
    );


  }
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
        const forecastData = {
          day: day,
          month: month,
          hour: hour,
          temperature: temp,
          humidity: hum,
        };
        this.postData(forecastData)
          .then(this.validateResponse)
          .then(this.responseAsJson)
          .then(this.showHourlyPrediction)
          .catch(this.logError);
      })
      .catch(this.logError);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  tick() {
    this.setState({time: new Date().toLocaleTimeString()});
  }
  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation date={this.state.date} time={this.state.time} />
          </header>

          <main className="App-main">
            <Switch>
              <Route exact path="/" component={ShortTerm} />
              <Route path="/manual-hourly-forecast" component={ShortTermManual} />
              <Route path="/realtime-dairly-forecast" component={MediumTerm} />
              <Route path="/manual-dairly-forecast" component={MediumTermManual} />
            </Switch>
          </main>
          <footer className="App-footer">
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
