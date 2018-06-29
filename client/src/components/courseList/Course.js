import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './Course.css';

class Child extends Component {

    // **Constructor**
    // constructor(props){
    //     super(props);
    // }

    heading_style = {
                fontSize : '1.3em',
                fontFamily:'roboto',
                color: 'black',
                fontWeight:'bold',
            }

    level_style = {
        fontSize: '17px',
        color: 'brown'
    }

    tag_style = {
        backgroundColor:'rgba(150,180,100,1)',
        padding:'5px 5px',
        color:'white',
        margin:'0.2em 0.2em',
        textAlign:'center'
    }

    icon_style = {
        width: '160px',
        height: '160px',
        marginLeft: '0.5em',
        marginTop: '0.5em',
    }

    style_categories ={
        position:'relative',
        left:'4.6em',
        display:'grid',
        gridTemplateColumns:'1fr 1fr'
    }

    style_subject = {
        padding: '10px 10px',
        margin: '13px 10px',
        opacity: '0.9',
        borderRadius: '3px',
        display: 'flex'
    }

  render() {
              
    return(
        this.props.elements.map((element,index)=>{
            return (
            <Paper key={index} style={this.style_subject} id="subject">
                <img alt="Banner" style={this.icon_style} src={element.banner_image}/>
                <List>
                    <div className="content_subject">
                    <div>
                    <ListItem button onClick={this.props.setMainComp.bind(this, "course-detail", element.key)}>
                        <ListItemText inset primary={<Typography style={this.heading_style}>{`${element.title}`}</Typography>} />
                    </ListItem>
                    </div>
                    <div>
                    <ListItem>
                        <ListItemText inset primary={<Typography style={this.level_style}>{`Level : ${element.level}`}</Typography>} />
                    </ListItem>
                    </div>
                    <div>
                    <ListItem>
                        {
                            <div className="categories" style={this.style_categories}>{
                                element.categories.map(element =>{
                                    if(element){
                                    return <Paper style={this.tag_style}>{element}</Paper>;
                                    }
                                    return  ""
                                })
                            }</div>
                        }
                    </ListItem>
                    </div>
                    </div>
                </List>   
            </Paper>
            )
        })
    );
    }
}
export default Child;