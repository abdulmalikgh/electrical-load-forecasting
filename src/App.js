import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class App extends Component{
  render() {
    return (
      <div className="App">
        <header className='App-header'>
         <Header />
        </header>
        <main className='App-main'>
         
        </main>
        <footer className='App-footer'>
          <Footer />
        </footer>
      </div>
    );
  }
 
}

export default App;
