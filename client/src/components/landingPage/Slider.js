import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import teacher_image from '../../assets/images/teacher.jpg';
import certificate_image from '../../assets/images/certified.jpg';
import success_image from '../../assets/images/success.jpg';
import exam_image from '../../assets/images/exams.jpg'

const IMG = [
  {
    label: <Typography style={{fontFamily:'TimesNewRoman',fontWeight:'italic', fontSize:'1.8em'}}>Get Guidance from the best Teaching Staff in Online classes. . . </Typography>,
    imgPath: teacher_image,
  },
  {
    label: <Typography style={{fontFamily:'TimesNewRoman',fontWeight:'italic', fontSize:'1.8em'}}>Gain knowledge and get certified by our institute. . . </Typography>,
    imgPath: certificate_image,
  },
  {
    label: <Typography style={{fontFamily:'TimesNewRoman',fontWeight:'italic', fontSize:'1.8em'}}>Participate in online Test Series and sharpen your skills</Typography>,
    imgPath: exam_image,
  },
  {
    label: <Typography style={{fontFamily:'TimesNewRoman',fontWeight:'italic', fontSize:'1.8em'}}>Join Us Now, This is the path to your success !!</Typography>,
    imgPath: success_image,
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth:1000
  },
  header: {
    opacity:0.9,
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 3,
    marginBottom: 5,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 470,
    maxWidth: 1400,
    overflow: 'hidden',
    width: '100%',
  },
});

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = IMG.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{IMG[activeStep].label}</Typography>
        </Paper>
        <img
          className={classes.img}
          src={IMG[activeStep].imgPath}
          alt={IMG[activeStep].label}
        />
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}
// TextMobileStepper.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };
export default withStyles(styles, { withTheme: true })(TextMobileStepper);