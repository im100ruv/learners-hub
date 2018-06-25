import React, { Component } from 'react';
import './LandingPage.css';
import Paper from '@material-ui/core/Paper';
import Slider from './Slider.js';
import Header from '../../components/header/Header';

class Landing extends Component {
  render() {
    return (
      <div>
        <Header/>
            <div className="landing_content">
                <div className="slider_images">
                    <Slider/>
                </div>
                <div class="top_icons">
                    <Paper className="icon">Online Tests</Paper>
                    <Paper className="icon">Experienced Mentors</Paper>
                    <Paper className="icon">Individual Reviews</Paper>
                    <Paper className="icon">24x7 Classes</Paper>
                    <Paper className="icon">Quick Learning</Paper>
                    <Paper className="icon">Get Certified</Paper>
                </div>
            </div>
      </div>
    )
  }
}
export default Landing;
