import React, { Component } from 'react';
import './LoginSignup.css';
import firebase from 'firebase';
import bcrypt from 'bcryptjs';
import loginSignupService from '../../services/loginSignupService';
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

class LoginSignup extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        salt: "$2a$09$nrrCd85V7az4Vvu0CzeZ3e",
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

    thirdPartyLogin = platform => {
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
            console.log(error, 'error');
        });
    }

    login = user => {
        bcrypt.hash(user.password, this.state.salt, function(err, hash) {
            if(err) {
                console.log('could not encrypted your password... Try Again.');
            } else {
                user.password = hash;
                loginSignupService.loginRequest(user)
                .then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

    signup = user => {
        bcrypt.hash(user.password, this.state.salt, function(err, hash) {
            if(err) {
                console.log('could not encrypted your password... Try Again.');
            } else {
                user.password = hash;
                loginSignupService.signupRequest(user)
                .then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

    handleInputchange = (mode, field, event) => {
        this.state[mode][field] = event.target.value;
    }

    handleSubmit = (mode) => {
        let data = this.state[mode];
        if(mode === 'login') {
            this.login(data);
        } else if(mode === 'signup') {
            this.signup(data);
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
                                                <FormControl fullWidth className="login-email-form" aria-describedby="email-helper-text">
                                                    <InputLabel htmlFor="email-helper">Email</InputLabel>
                                                    <Input id="email-helper" type="email" onChange={this.handleInputchange.bind(this, 'login', 'email')}/>
                                                    <FormHelperText id="email-helper-text">Enter Email Id</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="login-password">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="login-form-icon">
                                                <PasswordIcon />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth className="login-password-form" aria-describedby="password-helper-text">
                                                    <InputLabel htmlFor="password-helper">Password</InputLabel>
                                                    <Input id="password-helper" type="password" onChange={this.handleInputchange.bind(this, 'login', 'password')} />
                                                    <FormHelperText id="password-helper-text">Type Your Password</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="contained" onClick={this.thirdPartyLogin.bind(this, 'google')}>google</Button>
                                    <Button variant="contained" onClick={this.thirdPartyLogin.bind(this, 'facebook')}>facebook</Button>
                                    <Button variant="contained" onClick={this.handleSubmit.bind(this, 'login')}>Login</Button>
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
                                                <FormControl fullWidth className="signup-name-form" aria-describedby="signup-name-helper-text">
                                                    <InputLabel htmlFor="signup-name-helper">Name</InputLabel>
                                                    <Input id="signup-name-helper" onChange={this.handleInputchange.bind(this, 'signup', 'name')} />
                                                    <FormHelperText id="signup-name-helper-text">Enter name</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-email">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <EmailIcon />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth className="signup-email-form" aria-describedby="signup-email-helper-text">
                                                    <InputLabel htmlFor="signup-email-helper">Email</InputLabel>
                                                    <Input id="signup-email-helper" type="email" onChange={this.handleInputchange.bind(this, 'signup', 'email')} />
                                                    <FormHelperText id="signup-email-helper-text">Enter Email Id</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-password">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <PasswordIcon />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth className="signup-password-form" aria-describedby="signup-password-helper-text">
                                                    <InputLabel htmlFor="signup-password-helper">Password</InputLabel>
                                                    <Input id="signup-password-helper" type="password" onChange={this.handleInputchange.bind(this, 'signup', 'password')} />
                                                    <FormHelperText id="signup-password-helper-text">Type Your Password</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="signup-mobile">
                                        <Grid container spacing={8} alignItems="flex-end">
                                            <Grid item className="signup-form-icon">
                                                <MobileIcon />
                                            </Grid>
                                            <Grid item>
                                                <FormControl fullWidth className="signup-mobile-form" aria-describedby="signup-mobile-helper-text">
                                                    <InputLabel htmlFor="signup-mobile-helper">Mobile</InputLabel>
                                                    <Input id="signup-mobile-helper" onChange={this.handleInputchange.bind(this, 'signup', 'mobile')} />
                                                    <FormHelperText id="signup-mobile-helper-text">Enter Mobile No.</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="contained" onClick={this.handleSubmit.bind(this, 'signup')}>Signup</Button>
                                </DialogActions>
                            </Card>
                        </SwipeableViews>
                    </Paper>
                </Dialog>
            </div>
        );
    }
}

export default LoginSignup;