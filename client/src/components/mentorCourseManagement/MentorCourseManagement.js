import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './mentorCourseManagement.css';

function getModalPosition() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    updateData=()=>{
        alert("hi");
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <Button onClick={this.handleOpen}>Add More Items</Button>
            <Modal
            aria-labelledby="Update_Course_Modal"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={getModalPosition()} className={classes.paper}>
                <Typography variant="title" id="modal-title">
                Add an Activity or Resource
                </Typography>
                <div className="content">
                    <div className="items">
                    <div className="Chapter"onClick={this.updateData}>
                        Chapter
                    </div>
                    <div className="Chapter"onClick={this.updateData}>
                        Chapter
                    </div>
                    <div className="Chapter"onClick={this.updateData}>
                        Chapter
                    </div>
                    </div>
                    <div className="sample">
                    SAMPLE  
                    </div>
                </div>
                
            </div>
            </Modal>
        </div>
        );
    }
}

export default withStyles(styles)(SimpleModal);