import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function Buttons(props) {
  const { classes } = props;
  return (
    <div>
      <Button disabled={props.disabled === true ? true : false} variant="contained" color="primary" className={classes.button} onClick={props.setMainComp.bind(this, props.destination, props.courseKey)}>
        {props.buttonValue}
      </Button>
    </div>
  );
}

Buttons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Buttons);