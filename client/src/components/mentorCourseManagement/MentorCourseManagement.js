import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FileUpload from "@material-ui/icons/FileUpload";
import Delete from '@material-ui/icons/Delete';
import firebase from 'firebase';
import UpdateCourse from './UpdateCourse';
// import config from "../../config/config.json";
import './MentorCourseManagement.css';

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
            open: false,
            file_url: []
        }    
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
        let url_array = [];
        // let resourcesName;
        for (const key in Object.keys(event.target.files)) {
            let storageRef = firebase.storage().ref('courses/multifiles/');
            let file = event.target.files[key];
            // resourcesName = resourcesName + event.target.files[key].name + "\n";
            let FileRef = storageRef.child(file.name);
            let uploadTask = FileRef.put(file);
            
            uploadTask.on('state_changed', snapshot => {
            // code for progress
            }, err => {
            // error handling here
            }, () => {
            // code after upload completion
            FileRef.getDownloadURL().then(url => {
                url_array.push({name : file.name,link : url});
                console.log(url_array);
                // alert(url);
                //this url to be sent to the DataBase
                this.setState({
                    file_url:url_array
                })
                // console.log(this.state.file_url);
            })
            })
        }  
        // console.log(resourcesName);
    }

    render() {
        const { classes } = this.props;
        return (
        <div>
            <UpdateCourse/>
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
                                    <br/><br/>
                                    <div><input multiple class="input" type="file" onChange={this.addToFireBase} /></div>
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
                        <div className="mentor-item" onClick={this.getStudent}>
                            <Typography style={{fontSize:'1.1em'}}>Update Course</Typography>
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