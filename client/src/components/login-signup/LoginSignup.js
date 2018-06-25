import React, { Component } from 'react';
import './LoginSignup.css';
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
    state = {
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
            mobile: ''
        },
        mainContainer: {
            width: 400,
            margin: 'auto'
        }
    };

    handleClickDialogOpen = () => {
        this.setState({
            open: true,
            fullScreen : window.screen.availWidth>800 ? false : true,
            mainContainer: {
                width: window.screen.availWidth<800 ? '100%' : 400,
                margin: 'auto'
            }
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
                                                    <Input id="email-helper" value={this.state.login.email} type="email"/>
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
                                                    <Input id="password-helper" type="password" value={this.state.login.password}/>
                                                    <FormHelperText id="password-helper-text">Type Your Password</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="contained" onClick={this.handleDialogClose}>Login</Button>
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
                                                    <Input id="signup-name-helper" value={this.state.signup.name}/>
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
                                                    <Input id="signup-email-helper" value={this.state.signup.email} type="email"/>
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
                                                    <Input id="signup-password-helper" type="password" value={this.state.signup.password}/>
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
                                                    <Input id="signup-mobile-helper" value={this.state.signup.mobile}/>
                                                    <FormHelperText id="signup-mobile-helper-text">Enter Mobile No.</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                                <DialogActions className="dialog-action">
                                    <Button variant="contained" onClick={this.handleDialogClose}>Signup</Button>
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