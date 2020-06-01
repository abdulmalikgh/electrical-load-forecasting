import React, {Component} from "react";
import "./App.css";
import Footer from "./Footer";
import ShortTerm from "./loadComponent/ShortTerm";
import ShortTermManual from "./loadComponent/ShortTermManual";
import {Route} from "react-router-dom";
import Navigation from "./Navigation";

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
      <div className="App">
        <header className="App-header">
          <Navigation date={this.state.date} time={this.state.time} />
        </header>
        <main className="App-main">
          <Route
            exact
            path="/"
            render={() => (
              <ShortTerm
                date={this.state.date}
                time={this.state.time}
                predict={this.state.rtSTLF}
              />
            )}
          />
          <Route
            path="/short-term"
            render={() => <ShortTermManual postData={this.postData} />}
          />
        </main>
        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
