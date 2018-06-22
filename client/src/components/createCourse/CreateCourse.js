import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'
import './CreateCourse.css'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "40%",
    border: '1px ridge',
    backgroundColor: "#e4f1e566"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: "100%"
  },
  discBorder:{
        marginLeft: "10px",
       
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const diffLevel = [
  {
    value: "Beginner",
    label: "Beginner"
  },
  {
    value: "Intermediate",
    label: "Intermediate"
  },
  {
    value: "Advance",
    label: "Advance"
  }
];
const categories = [
  {
    value: "Java",
    label: "Java"
  },
  {
    value: "React JS",
    label: "React JS"
  },
  {
    value: "MongoDB",
    label: "MongoDB"
  }
];

class CreateCourse extends React.Component {
  state = {
    name: "Java crash course",
    multiline: "Controlled"
  };

  render() {
    const { classes } = this.props;

    return (
        
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="courseName"
          label="Name of Course"
          className={classes.textField}
          margin="normal"
        />
          <input
        accept="image/*"
        className={classes.input}
        id="flat-button-file"
        multiple
        type="file"
      />
        <label htmlFor="flat-button-file">
        <TextField
          id="uploadCourse"
          label="Upload course file"
          className={classes.textField}
          margin="normal"
        >
        </TextField>
        </label>
       
      {/* <label htmlFor="flat-button-file">
        <Button component="span" className={classes.button}>
          Upload
        </Button>
      </label> */}
        <TextField
          id="courseURL"
          label="Course URL"
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="categories"
          select
          label="Categories"
          className={classes.textField }
          value={this.state.categories}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select course category"
          margin="normal"
        >
          {categories.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="number"
          label="Course Duration in months"
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="diffecultyLevel"
          select
          label="diffeculty level"
          className={classes.textField}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {diffLevel.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="multiline-static"
          label="Description"
          multiline
          rows="7"
          className={[classes.textField, classes.discBorder]}
          margin="normal"
        />
      </form>
    );
  }
}

CreateCourse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateCourse);
