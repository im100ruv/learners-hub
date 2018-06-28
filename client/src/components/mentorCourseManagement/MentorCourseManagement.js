import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './mentorCourseManagement.css';
import FileUpload from "@material-ui/icons/FileUpload";
import Delete from '@material-ui/icons/Delete';
import firebase from 'firebase';

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
        var config = {
            apiKey: "AIzaSyDQlt81NoxBvuRisNTmCn8Kh_tRZ9rS4_A",
            authDomain: "lmsteam-bfd2a.firebaseapp.com",
            databaseURL: "https://lmsteam-bfd2a.firebaseio.com",
            projectId: "lmsteam-bfd2a",
            storageBucket: "",
            messagingSenderId: "127092655126"
          };
          firebase.initializeApp(config);    
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    updateData=()=>{
        alert("upload file using fireBase");
    }

    getStudent=()=>{
        alert("get Student List enrolled for this course");
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <Button onClick={this.handleOpen}>Sample Course</Button>
            <Modal
            aria-labelledby="Update_Course_Modal"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={getModalPosition()} className={classes.paper}>
                <Typography style={{textAlign:'center'}} variant="title" id="modal-title">
                Mentor Activities
                </Typography>
                <hr className="top-hr"/>
                <div className="content">
                    <div className="items">
                        <div className="mentor-item">
                            <Typography style={{fontSize:'1.4em'}}>
                                    Add Chapter
                                    <div className="icons">
                                        <FileUpload/>
                                    </div>
                                    <input type="file"/>
                            </Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.updateData}>
                            <Typography style={{fontSize:'1.4em'}}>
                            Delete Chapter
                            <div className="icons">
                                <Delete/>
                            </div>
                            </Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.getStudent}>
                            <Typography style={{fontSize:'1.4em'}}>Certify Student</Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.getStudent}>
                            <Typography style={{fontSize:'1.4em'}}>Review Student</Typography>
                        </div>
                        <hr className="bottom-hr"/>
                    </div>
                </div>
                
            </div>
            </Modal>
        </div>
        );
    }
}

export default withStyles(styles)(SimpleModal);