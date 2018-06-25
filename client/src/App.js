import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Land from './components/landingPage/LandingPage';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <div><Header/></div>
            <Land/> 
        </div>
      </React.Fragment>
      
    );
  }
}
export default App;
