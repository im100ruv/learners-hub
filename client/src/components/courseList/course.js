import React, { Component } from 'react'; 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './course.css';
 
class Child extends Component {
    
    // **Constructor**
    // constructor(props){
    //     super(props);
    // }
    
    heading_style = {
                fontSize : '25px',
                fontFamily:'roboto',
                color: 'black',
                fontWeight:'bold',
            }

    level_style = {
        fontSize : '17px',
        color: 'brown' 
    }

    tag_style = {
        backgroundColor:'rgba(150,180,100,1)',
        margin:'0px 5px',
        padding:'5px 5px',
        color:'white'
    }

    icon_style={
        width:'160px',
        height:'160px',
        marginLeft:'10px',
        marginTop:'10px'
    }

    style_categories ={
        display:'flex',
        position:'relative',
        left:'50px'
    }

    style_subject = {
        padding: '10px 10px',
        margin: '13px 10px',
        opacity: '0.9',
        borderRadius: '25px',
        display:'flex'
    }

  render() {
              
    return(
        this.props.elements.map((element,index)=>{
            return (
            <Paper key={index} style={this.style_subject} id="subject">
                <img alt="Banner" style={this.icon_style} src={element.banner_image}/>
                <List>
                    <ListItem button>
                        <ListItemText inset primary={<Typography style={this.heading_style}>{`${element.title}`}</Typography>} />
                    </ListItem>
                    <ListItem>
                        <ListItemText inset primary={<Typography style={this.level_style}>{`Level : ${element.level}`}</Typography>} />
                    </ListItem>
                    <ListItem>
                        {
                            <div style={this.style_categories}>{
                                element.categories.map(element =>{
                                    return <Paper style={this.tag_style}>{element}</Paper>;
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