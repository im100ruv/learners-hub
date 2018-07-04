import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/header/Header';
// import Home from './components/home/Home';
import Home from './components/landingPage/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import loginSignupService from './services/loginSignupService';
import './config/firebaseConfig';

import { connect } from 'react-redux'
import loggedUserAction from './store/actions/loggedUser';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginAuth from './services/loginAuth'

import config from "./config/config.json"
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    // this.socket = io(`${config.APIHostName}:${config.APIHostingPort}`);
    this.state = {
      logged: true
    };
  }

  componentWillMount() {
    loginSignupService.checkLoginRequest()
    .then(res => {
      if(res.message) {
        this.props.removeLoggedUser();
        this.setState({ logged: false });
      } else {
        this.props.addLoggedUser(res);
        this.setState({ logged: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentWillReceiveProps(nextprops) {
    if(nextprops.loggedUser) {
      let logged = LoginAuth.isLoggedIn(nextprops.loggedUser);
      this.setState({
        logged: logged
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
              <div>
                <Route render={(props) => {
                  let path = '' + props.location.pathname;
                  if(path === '/home' || path === '/home/' || path === '/dashboard' || path === '/dashboard/') {
                    return(<Header history ={props.history} />);
                  } else {
                    return (<div><h1 style={{textAlign: 'center'}}>Page not found</h1></div>);
                  }
                }}/>
              </div>
              <div>
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                  <Route exact path="/home" component={Home}/>
                  <LoginAuth.PrivateRoute path="/dashboard" condition={this.state.logged} component={Dashboard} />
                </Switch>
              </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default connect((state) => ({
  loggedUser: state.loggedUser
}), loggedUserAction)(App);