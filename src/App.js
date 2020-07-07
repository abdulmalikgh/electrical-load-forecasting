import React, {Component} from "react";
import "./App.css";
import Footer from "./Footer";
import ShortTermManual from "./loadComponent/ShortTermManual";
import PastHourly from "./loadComponent/PastHourly";
import PastDairly from './loadComponent/PastDairly';
import MediumTermManual from './loadComponent/MediumTermManual'
import Home from './loadComponent/Home'
import Navigation from "./Navigation";
import About from './loadComponent/About'
//import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 100);
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
              <Route exact path="/home" component={Home} />
              <Route exact path="/manual-hourly-forecast" component={ShortTermManual} />
              <Route exact path="/past_dairly_forecast" component={PastDairly} />
              <Route exact path="/past_hourly_forecast" component={PastHourly} />
              <Route exact path="/manual-dairly-forecast" component={MediumTermManual} />
              <Route exact path="/about-us" component={About} />
              <Route exact path="/">
                 <Redirect to="/home" />
                </Route>
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

export default App;
