import React, { Component } from 'react';
import './LoginSignup.css';
import firebase from 'firebase';
import bcrypt from 'bcryptjs';
import loginSignupService from '../../services/loginSignupService';

import { connect } from 'react-redux'
import loggedUserAction from '../../store/actions/loggedUser';

//matarial component
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LoginIcon from '@material-ui/icons/Person';
import SignupIcon from '@material-ui/icons/PersonAdd';
import MobileIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import googleIcon from '../../assets/images/googleIcon.svg';
// import Snackbar from '@material-ui/core/Snackbar';
import sweetAlert from 'sweetalert';
class LoginSignup extends Component {
    state = {
        salt: "$2a$09$nrrCd85V7az4Vvu0CzeZ3e",
        snakeBar : {
            open: false,
            message: ''
        },
        open: false,
        fullScreen: false,
        value: 0,
        login: {
            email: '',
            password: ''
        },
        signup: {
            name: '',
            email: '',
            password: '',
            mobile: '',
            user_type: 'Learner',
            signup_type: 'emailAndPassword'
        },
        mainContainer: {
            width: 450,
            left: 0
        }
    };

    handleClickDialogOpen = () => {
        this.setState({
            open: true,
            fullScreen : window.screen.availWidth>800 ? false : true,
            mainContainer: {
                width: window.screen.availWidth<800 ? '100%' : 450,
                left: 0
            }
        }, () => {
            this.setState({
                mainContainer: {
                    width: this.state.mainContainer.width,
                    left: "calc(50% - " + this.state.mainContainer.width/2 + "px)"
                }
            });
        });
    };

    handleDialogClose = () => {
        this.setState({ open: false });
    };

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleTabChangeIndex = index => {
        this.setState({ value: index });
    };

    thirdPartyLogin = platform => { let scope = this;
        let provider = null;
        if(platform === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
        }else if(platform === 'facebook') {
            provider = new firebase.auth.FacebookAuthProvider();
        }
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            let user = {
                name: result.user.displayName,
                email: result.user.email,
                password: Math.random().toString(36).substring(2),
                mobile: result.user.phoneNumber ? result.user.phoneNumber : '',
                user_type: 'Learner',
                signup_type: platform
            };
            this.signup(user);
        }).catch(error => {
            scope.showSnakeBar(error.message);
        });
    }

    showSnakeBar(message) {
        this.setState({ snakeBar : { open: true, message: message } });
    }

    login = user => {
        let scope = this;
        bcrypt.hash(user.password, scope.state.salt, function(err, hash) {
            if(err) {
                scope.showSnakeBar('could not encrypted your password... Try Again.');
            } else {
                user.password = hash;
                loginSignupService.loginRequest(user)
                .then(result => {
                    if(result.message) {
                        sweetAlert({ title: result.message, icon: 'info'});
                    } else {
                        scope.props.addLoggedUser(result);
                        scope.props.afterLoginLogout(true);
                    }
                }).catch(error => {
                    sweetAlert({ title: error.message, icon: 'error'});
                });
            }
        });
    }

    signup = user => {
        let scope = this;
        bcrypt.hash(user.password, this.state.salt, function(err, hash) {
            if(err) {
                sweetAlert({ title: 'could not encrypted your password... Try Again.', icon: 'error'});
            } else {
                user.password = hash;
                loginSignupService.signupRequest(user)
                .then(result => {
                    if(result.message) {
                        sweetAlert({ title: result.message, icon: 'info'});
                    } else {
                        scope.props.addLoggedUser(result);
                        scope.props.afterLoginLogout(true);
                    }
                }).catch(error => {
                    sweetAlert({ title: error.message, icon: 'error'});
                });
            }
        });
    }

    handleInputchange = (mode, field, event) => {
        //following line to be modified later
        this.state[mode][field] = event.target.value;
    }

    handleSubmit = (mode) => {
        let data = this.state[mode];
        if(mode === 'login') {
            if(data.email === "" || data.password === "") {
                sweetAlert({ title: 'Required field empty', icon: 'info'});
            } else {
                this.login(data);
            }
        } else if(mode === 'signup') {
            if(data.name === "" || data.email === "" || data.password === "") {
                sweetAlert({ title: 'Required field empty', icon: 'info'});
            } else {
                this.signup(data);
            }
        } else {
            console.log('somthing wrong');
        }
        this.handleDialogClose();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" className="ContainedButtons" onClick={this.handleClickDialogOpen}>Login</Button>
                <Dialog
                    fullScreen={this.state.fullScreen}
                    style={this.state.mainContainer}
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <Paper>
                        <AppBar position="static" color="default">
                            <Tabs
                            value={this.state.value}
                            onChange={this.handleTabChange}
                            fullWidth
                            indicatorColor="primary"
                            textColor="primary"
                            >
                                <Tab icon={<LoginIcon />} label="Login" />
                                <Tab icon={<SignupIcon />} label="Signup"/>
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            index={this.state.value}
                            onChangeIndex={this.handleTabChangeIndex}
                        >
                            <Card  dir='ltr' className="login-card">
                                <CardContent>
                                    <div className="login-email">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="login-form-icon">
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    autoFocus
                                                    type="email"
                                                    label="Email"
                                                    className="login-email-form"
                                                    helperText="Enter Email Id"
                                                    onChange={this.handleInputchange.bind(this, 'login', 'email')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="login-password">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="login-form-icon">
                                                <PasswordIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="Password"
                                                    className="login-password-form"
                                                    helperText="Type Your Password"
                                                    onChange={this.handleInputchange.bind(this, 'login', 'password')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="fab" className='googleButton' onClick={this.thirdPartyLogin.bind(this, 'google')}><img src={googleIcon} /></Button>
                                    <Button variant="contained" color='primary' type='submit' className='submit' onClick={this.handleSubmit.bind(this, 'login')}>Login</Button>
                                </DialogActions>
                            </Card>
                            
                            <Card  dir='ltr' className="signup-card">
                                <CardContent>
                                    <div className="signup-name">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <LoginIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    label="Name"
                                                    className="signup-name-form"
                                                    helperText="Enter name"
                                                    onChange={this.handleInputchange.bind(this, 'signup', 'name')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-email">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    type="email"
                                                    label="Email"
                                                    className="signup-email-form"
                                                    helperText="Enter Email Id"
                                                    onChange={this.handleInputchange.bind(this, 'signup', 'email')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-password">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <PasswordIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="Password"
                                                    className="signup-password-form"
                                                    helperText="Type Your Password"
                                                    onChange={this.handleInputchange.bind(this, 'signup', 'password')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-mobile">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <MobileIcon />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type="number"
                                                    label="Mobile"
                                                    className="signup-mobile-form"
                                                    helperText="Enter Mobile No."
                                                    onChange={this.handleInputchange.bind(this, 'signup', 'mobile')}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="contained" color='primary' type='submit' className='submit' onClick={this.handleSubmit.bind(this, 'signup')}>Signup</Button>
                                </DialogActions>
                            </Card>
                        </SwipeableViews>
                    </Paper>
                </Dialog>
                {/* <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snakeBar.open}
                    onClose={() => {
                        this.setState({ snakeBar: {open: false, message: ''} });
                    }}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snakeBar.message}</span>}
                /> */}
            </div>
        );
    }
}

export default connect((state) => ({
    loggedUser: state.loggedUser
}), loggedUserAction)(LoginSignup);