import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import java_card from '../../assets/images/java.png';

const styles = {
  card: {
    maxWidth: 350,
  },
  media: {
    // height: 0,
    paddingTop: '14em', // 16:9
  },
};

function SimpleMediaCard(props) {
  const { classes } = props;
  let feature = props.feature;
  return(
    feature.map((element)=>{
        return (
            <div>
            <Card className={classes.card}>
                <CardMedia
                className={classes.media}
                image= {element.Logo}
                title="Core Java"
                />
                <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {element.Name}
                </Typography>
                <Typography component="p">
                    {element.About}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" color="primary">
                    Enroll Now
                </Button>
                </CardActions>
            </Card>
            </div>
        );  
    })
);
}
export default withStyles(styles)(SimpleMediaCard);