import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import java_card from '../../assets/images/java.png';
import algorithm_card from '../../assets/images/algo.jpg';
import py_card from '../../assets/images/py.png';
import react_card from '../../assets/images/react.png';

const styles = {
  card: {
    maxWidth: 350,
    cursor:'default'
  },
  media: {
    paddingTop: '14em',
  },
};

function MediaCard(props) {
  const { classes } = props;
  let feature = props.feature;
  return(
            feature.map((element)=>{
                return (
                        <Card className={classes.card}>
                            <CardMedia
                            className={classes.media}
                            image= {element.Logo==="java_card"?java_card:element.Logo==="algorithm_card"?algorithm_card:element.Logo==="python_card"?py_card:element.Logo==="react_card"?react_card:null}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {element.Name}
                                </Typography>
                                <Typography className="enroll" component="p">
                                    {element.About}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Enroll Now
                                </Button>
                            </CardActions>
                        </Card>
                        );  
            })
        );
}
export default withStyles(styles)(MediaCard);