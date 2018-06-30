import React, { Component } from 'react';
import './Header.css';
import loginSignupService from '../../services/loginSignupService';
import Button from '@material-ui/core/Button';
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
import logo from '../../assets/images/logo.svg'
import LoginSignup from '../login-signup/LoginSignup';

class Header extends Component {
    state = {
        value: '',
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
    }

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

    logout = () => {
        loginSignupService.logoutRequest('pawan.akshaykr@gmail.com')
        .then(res => {
            this.setState({});
        }).catch(err => {
            console.log(err);
        });
    }
    
    buttontemplate = () => {
        let cookie = document.cookie;
        cookie = cookie.replace('; ', '=');
        let arr = cookie.split('=');
        if(arr.includes('c_token')) {
            return(
                <Button variant="contained" color="secondary" className="ContainedButtons" onClick={this.logout}>
                    Logout
                </Button>
            );
        } else {
            return(
                <LoginSignup />
            );
        }
    }

    render() {
        let buttonCreated = this.buttontemplate();
        return(
            <div className="header">
                <AppBar position="static" color="default">
                    <Toolbar>
                        <img src={logo} alt="Logo" width="80" height="80"/>
                        <Typography variant="title" color="inherit">
                            LEARNER'S HUB
                        </Typography>
                        <IconButton><CourseCategoryIcon/></IconButton>
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

export default Header;