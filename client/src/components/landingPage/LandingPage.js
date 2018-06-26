import React, { Component } from 'react';
import './LandingPage.css';
import Paper from '@material-ui/core/Paper';
import Slider from './Slider.js';
import Header from '../../components/header/Header';
import Cards from './Cards.js';
import Typography from '@material-ui/core/Typography';
import java_card from '../../assets/images/java.png';

class Landing extends Component {

  constructor(props){
        super(props);
        this.state = {
          Featured : [{Name:"JAVA", About:"Learn Java Learn Java Learn",Logo:"java_card"},
                      {Name:"Algorithm", About:"Learn Algoruthm Learn Algoruthm",Logo:"algorithm_card" },
                      {Name:"Python", About:"Learn Python Learn Python Learn",Logo:"python_card"},
                      {Name:"React", About:"Learn React Learn Learn React",Logo:"react_card"}]
          }
    }

  heading_style = {
    fontSize : '30px',
    fontFamily:'roboto',
    color: 'black',
    fontWeight:'bold',
    background:'Transparent',
    textAlign:'center'
  }

  render() {
    return (
      <div>
        <Header/>
            <div className="landing_content">
                <div className="slider_images">
                    <Slider/>
                </div>
                <div className="top_icons">
                    <Paper className="icon">Online Tests</Paper>
                    <Paper className="icon">Experienced Mentors</Paper>
                    <Paper className="icon">Individual Reviews</Paper>
                    <Paper className="icon">24x7 Classes</Paper>
                    <Paper className="icon">Quick Learning</Paper>
                    <Paper className="icon">Get Certified</Paper>
                </div>
            </div>
            <Paper style={{margin:'auto',opacity:'0.7',padding:'1em 1em'}}><Typography style={this.heading_style}>Our Specialized Courses</Typography></Paper>
            <div className="cards">
              <div className="card"><Cards feature={this.state.Featured} /></div>
            </div>
      </div>
    )
  }
}
export default Landing;