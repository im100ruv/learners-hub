import React, { Component } from 'react';
import List from './components/courseList/courseList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <List/>
      </div>
    );
  }
}

export default App;
