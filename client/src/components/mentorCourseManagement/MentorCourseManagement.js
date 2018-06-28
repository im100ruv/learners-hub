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
            storageBucket: "lmsteam-bfd2a.appspot.com",
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

    uploadFile=()=>{
        alert("uploadFileToDataBase");
    }
    addToFireBase=(event)=>
    {
        // alert(event.target.files[0].name);
        let storageRef = firebase.storage().ref('courses/')
        let extension = event.target.files[0].name.split('.').pop()
        let bannerImgRef = storageRef.child(`${Date.now()}.${extension}`)
        let uploadTask = bannerImgRef.put(event.target.files[0])

        uploadTask.on('state_changed', snapshot => {
          // code for progress
        }, err => {
          // error handling here
          // use err.code to handle specific errors
        }, () => {
          // code after upload completion
          bannerImgRef.getDownloadURL().then(url => {
            alert(url);
            //this url to be sent to the DataBase
          })
        })    
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
            className="modal"
            >
            <div style={getModalPosition()} className={classes.paper}>
                <Typography style={{textAlign:'center',fontSize:'1.6em'}} variant="title" id="modal-title">
                Mentor Activities
                </Typography>
                <hr className="top-hr"/>
                <div className="content">
                    <div className="items">
                        <div className="mentor-item">
                            <Typography style={{fontSize:'1.1em'}}>
                                    Add Chapter
                                    <div className="icons">
                                        <FileUpload/>
                                    </div>
                                    <div><input class="input" type="file" onChange={this.addToFireBase} /></div>
                                    <input type="button" className="upload" value="Upload File" onClick={this.uploadFile} />
                            </Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.updateData}>
                            <Typography style={{fontSize:'1.1em'}}>
                            Delete Chapter
                            <div className="icons">
                                <Delete/>
                            </div>  
                            </Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.getStudent}>
                            <Typography style={{fontSize:'1.1em'}}>Certify Student</Typography>
                        </div>
                        <hr className="bottom-hr"/>
                        <div className="mentor-item" onClick={this.getStudent}>
                            <Typography style={{fontSize:'1.1em'}}>Review Student</Typography>
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