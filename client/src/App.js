import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import DashBoard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div><Header/></div>
        <div><DashBoard/></div>
      </div>
    );
  }
}

export default App;
