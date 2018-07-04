import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Logo from '../../assets/images/logo.svg';
import './LandingPage.css';

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
            <Paper style={{background:'grey',paddingTop:'1em',marginTop:'3em',opacity:'0.9'}}>
                <Typography style={{color:'white',fontWeight:'bold',fontSize:'1em',textAlign:'center'}}>
                    LearnersHub is optimized for learning, testing, and training. Examples might be simplified to improve reading and basic understanding. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using this site, you agree to have read and accepted our terms of use, cookie and privacy policy. Copyright 2018 by LMS Team. All Rights Reserved.
                    <br/>
                    <img className="footer_logo" src={Logo} alt="logo"/>
                </Typography>
            </Paper>
      </React.Fragment>
    );
  }
}
export default Footer;
