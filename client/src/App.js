import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
import DashBoard from './components/dashboard/Dashboard';
import './config/firebaseConfig';
// import { Provider } from 'react-redux';
// import store from './store/store';

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