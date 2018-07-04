import React, { Component } from 'react';
import './Header.css';
import loginSignupService from '../../services/loginSignupService';
import LoginSignup from '../login-signup/LoginSignup';

import { connect } from 'react-redux'
import loggedUserAction from '../../store/actions/loggedUser';
import loginAuth from '../../services/loginAuth';

//matarial component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Autosuggest from 'react-autosuggest';
import InputAdornment from '@material-ui/core/InputAdornment';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import IconButton from '@material-ui/core/IconButton';
import CourseCategoryIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from '../../assets/images/logo.svg'
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.afterLoginLogout = this.afterLoginLogout.bind(this);
    }

    state = {
        value: '',
        anchorEl: null,
        loggedUser: null,
        suggestions : [],
        theme : {
            container: {
                flexGrow: 1,
                position: 'relative',
                width: '30%',
                margin: '10px 10px 10px 0'
            },
            suggestionsContainerOpen: {
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
            },
            suggestion: {
                display: 'block',
            },
            suggestionsList: {
                margin: 0,
                padding: 0,
                listStyleType: 'none',
            },
        }
    };

    suggestions = [
        { label: 'Afghanistan' },
        { label: 'Aland Islands' },
        { label: 'Albania' },
        { label: 'Algeria' },
        { label: 'American Samoa' },
        { label: 'Andorra' },
        { label: 'Angola' },
        { label: 'Anguilla' },
        { label: 'Antarctica' },
        { label: 'Antigua and Barbuda' },
        { label: 'Argentina' },
        { label: 'Armenia' },
        { label: 'Aruba' },
        { label: 'Australia' },
        { label: 'Austria' },
        { label: 'Azerbaijan' },
        { label: 'Bahamas' },
        { label: 'Bahrain' },
        { label: 'Bangladesh' },
        { label: 'Barbados' },
        { label: 'Belarus' },
        { label: 'Belgium' },
        { label: 'Belize' },
        { label: 'Benin' },
        { label: 'Bermuda' },
        { label: 'Bhutan' },
        { label: 'Bolivia, Plurinational State of' },
        { label: 'Bonaire, Sint Eustatius and Saba' },
        { label: 'Bosnia and Herzegovina' },
        { label: 'Botswana' },
        { label: 'Bouvet Island' },
        { label: 'Brazil' },
        { label: 'British Indian Ocean Territory' },
        { label: 'Brunei Darussalam' },
    ];

    renderInput = () => {
        return (
            <TextField fullWidth 
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                    placeholder: 'Search for courses'
                }}
            />
        );
    }
      
    renderSuggestion = (suggestion, { query, isHighlighted }) => {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);
      
        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </span>
                        ) : (
                        <strong key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </strong>
                        );
                })}
                </div>
            </MenuItem>
        );
    }
      
    renderSuggestionsContainer = (options) => {
        const { containerProps, children } = options;
      
        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    }
      
    getSuggestionValue = (suggestion) => {
        return suggestion.label;
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        return inputLength === 0
            ? []
            : this.suggestions.filter(suggestion => {
                const keep = count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;
                if (keep) {
                    count += 1;
                }
                return keep;
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };
    
    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };
    
    handleChange = (event, { newValue }) => {
        this.setState({
          value: newValue,
        });
    };

    handleAcountMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleAcountClose = () => {
        this.setState({ anchorEl: null });
    };

    handleAcountCloseOnButton = () => {
        this.setState({ anchorEl: null }, this.logout());
    };

    afterLoginLogout(logged) {
        this.setState({
            logged: logged
        });
        // if(logged === true) {
        //     document.location.reload();
        // }
    }

    logout = () => {
        loginSignupService.logoutRequest(this.props.loggedUser.email)
        .then(res => {
            console.log(res);
            this.props.removeLoggedUser();
            this.afterLoginLogout(false);
        }).catch(err => {
            console.log(err);
        });
    }
    
    goto(path) {
        this.props.history.push(path);
    }

    buttontemplate = () => {
        if(this.state.logged) {
            return(
                <React.Fragment>
                    <BottomNavigationAction className='dashboard-icon' style={{flex: 'none', paddingLeft: 15, paddingRight: 15}} label="Dashboard" onClick={this.goto.bind(this, '/dashboard')} icon={<DashboardIcon/>} />
                    {/* <Tooltip id="tooltip-fab" title="Dashoard">
                        <IconButton onClick={this.goto.bind(this, '/dashboard')}><DashboardIcon/></IconButton>
                    </Tooltip> */}
                    <Typography variant="subheading" color="inherit">
                        {this.state.loggedUser.name}
                    </Typography>

                    <div>
                        <IconButton
                            aria-owns={this.state.anchorEl ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleAcountMenu}
                            color="primary"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            style={{
                                marginLeft: -12,
                                marginRight: 20,
                                top: 35
                            }}
                            open={this.state.anchorEl ? true : false}
                            onClose={this.handleAcountClose}
                        >
                            <MenuItem onClick={this.handleAcountCloseOnButton}>Logout</MenuItem>
                        </Menu>
                    </div>

                    {/* <Button variant="contained" color="secondary" className="ContainedButtons" onClick={this.logout}>
                        Logout
                    </Button> */}
                </React.Fragment>
            );
        } else {
            return(
                <LoginSignup afterLoginLogout={this.afterLoginLogout} />
            );
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        let logged = loginAuth.isLoggedIn(nextProps.loggedUser);
        this.setState({
            logged: logged,
            loggedUser: nextProps.loggedUser
        });
    }

    render() {
        let buttonCreated = this.buttontemplate();
        return(
            <div className="header">
                <AppBar position="static" color="default">
                    <Toolbar>
                        <img src={logo} alt="Logo" width="80" height="80"/>
                        <Typography variant="title" color="inherit" style={{cursor: "pointer"}} onClick={this.goto.bind(this, '/home')}>
                            LEARNER'S HUB
                        </Typography>
                        <Tooltip id="tooltip-fab" title="Courses Category">
                            <IconButton><CourseCategoryIcon/></IconButton>
                        </Tooltip>
                        <Autosuggest
                            theme={this.state.theme}
                            renderInputComponent={this.renderInput}
                            suggestions={this.suggestions}
                            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                            renderSuggestionsContainer={this.renderSuggestionsContainer}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={{
                                value: this.state.value,
                                onChange: this.handleChange,
                            }}
                        />
                        {buttonCreated}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default connect((state) => ({
    loggedUser: state.loggedUser
}), loggedUserAction)(Header);