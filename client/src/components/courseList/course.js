import React, { Component } from 'react'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './course.css';

 
class Child extends Component {

    constructor(props){
        super(props);
    }

    heading_style = {
                fontSize : '25px',
                fontFamily:'roboto',
                color: 'black',
                fontWeight:'bold'
            }

    level_style = {
        fontSize : '17px',
        fontStyle: '',
        color: 'brown' 
    }
  render() {
    let scope = this;
          
    return(
        this.props.elements.map((element,index)=>{

            return (

            <Paper key={index} id="subject">
                <img id="cour_icon" src={element.banner_image}/>
                <List>
                    <ListItem button>
                        <ListItemText className="trial" inset primary={<Typography style={this.heading_style}>{`${element.title}`}</Typography>} />
                    </ListItem>
        
                    <ListItem>
                        <ListItemText inset primary={<Typography style={this.level_style}>{`Level : ${element.level}`}</Typography>} />
                    </ListItem>
                    <ListItem>
                        {
                            <div className="categories">{
                                element.categories.map(element =>{
                                    return <Paper className = "tag" >{element}</Paper>;
                                })
                            }</div>
                        }
                    </ListItem>
                </List>   
            </Paper>
            )
    })
    );
}
}
export default Child;
