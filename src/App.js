import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import ShortTerm from './loadComponent/ShortTerm'
import ShortTermManual from './loadComponent/ShortTermManual';
import { Route } from 'react-router-dom';
class App extends Component{
 constructor(props) {
  super(props)
  this.state = {
    date:new Date(),
    time:new Date().toLocaleTimeString(),
    weather:[],
    rtSTLF:''
  }
 };
 componentDidMount(){
    this.intervalId = setInterval( ()=> this.tick(),100);
    this.getWeather('//api.openweathermap.org/data/2.5/weather?q=sunyani&appid=c007d2a99be5bbfad82815648742b9a9')
};
getWeather(api) {
  fetch(api)
    .then(res=> res.json())
     .then(data => {
       const temp = data.main.temp;
       const hum = data.main.humidity;
       const dateObject = new Date();
       const hour = dateObject.getHours()
       const day = dateObject.getDate();
       const month = dateObject.getMonth();
       console.log(`data ${hour} / ${day} / ${month}`)
     }).catch(err => console.error(err))
   
}
componentWillUnmount(){
clearInterval(this.intervalId)
}
tick(){
  this.setState({time:new Date().toLocaleTimeString()})
}
  render() {

    return (
      <div className="App">
        <header className='App-header'>
         <Header />
        </header>
        <main className='App-main'>
          <Route exact path='/' render={()=>(
             <ShortTerm date={this.state.date} time={this.state.time}/>
          )}/>
          <Route path='/short-term' render={()=>(
            <ShortTermManual />
          )} />
        </main>
        <footer className='App-footer'>
          <Footer />
        </footer>
      </div>
    );
  }
 
}

export default App;
