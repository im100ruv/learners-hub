import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Header from './components/header/Header';
import DashBoard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <div><Header/></div>
          <div><DashBoard/></div>
        </div>
      </React.Fragment>
      
    );
  }
}
export default App;
