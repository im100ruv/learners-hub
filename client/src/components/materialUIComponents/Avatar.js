import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    // display: 'flex',
    // justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Adelle Charles"
        src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/a3/541870260c11e7b9e1a10ba53b5c8c/P16958_CSE_LEUNG-Wai-Ting_017.jpg"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);