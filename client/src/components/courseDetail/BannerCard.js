import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  details: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  content: {
    // flex: '1 0 auto',
  },
  cover: {
    // width: 151,
    height: "13em",
  },
});

function MediaControlCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardMedia
            className={classes.cover}
            image="https://firebasestorage.googleapis.com/v0/b/learnershub-mountblue.appspot.com/o/courses%2Ffullbanner.jpg?alt=media&token=98c6ea27-033e-48d3-ab78-f1df13d028a0"
          />
          <CardContent className={[classes.content, "banner-content"].join(' ')}>
            <Typography variant="headline">{props.title}
              {props.new_release ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTW7IGs4zt9OMD-ll0CCPaDh6VAZtOc0qGnZS_3IphN_zOdWQy" alt="new course" width="50px" height="40px" /> : ""}
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              {props.subtitle}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);