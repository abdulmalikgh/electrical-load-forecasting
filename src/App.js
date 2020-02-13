import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import ShortTerm from './loadComponent/ShortTerm'

class App extends Component{
 constructor(props) {
  super(props)
  this.state = {
    date:new Date(),
    time:new Date().toLocaleTimeString()
  }
 };
 componentDidMount(){
    this.intervalId = setInterval( ()=> this.tick(),100);
};
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
         <ShortTerm date={this.state.date} time={this.state.time}/>
        </main>
        <footer className='App-footer'>
          <Footer />
        </footer>
      </div>
    );
  }
 
}

export default App;
