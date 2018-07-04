import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux'
import loggedUserAction from '../../store/actions/loggedUser';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import CoursesIcon from '@material-ui/icons/LibraryBooks';
import AddCourseIcon from '@material-ui/icons/LibraryAdd';
import CourseListIcon from "@material-ui/icons/ViewList";
import SettingIcon from '@material-ui/icons/Settings';
import CourseList from '../courseList/CourseList';
import CourseDetail from '../courseDetail/CourseDetail';
import CourseResource from '../courseResource/CourseResource';
import CreateCourse from '../createCourse/CreateCourse';
import UpdateCourse from '../mentorCourseManagement/UpdateCourse';
import CreateResource from '../createCourse/CreateResource';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedUser: null,
      menuArr: this.learnerMenu,
      mainComp: "course-list",
      courseKey: ""
    };
  }

  learnerMenu = [
    {
      name: 'Profile',
      icon: ProfileIcon
    },
    {
      name: 'Course Enrolled',
      icon: CoursesIcon
    },
    {
      name: 'View All Courses',
      icon: CourseListIcon,
      value: "course-list"
    }
  ];

  authorMenu = [
    {
      name: 'Profile',
      icon: ProfileIcon
    },
    {
      name: 'Add Course',
      icon: AddCourseIcon,
      value: "add-course"
    },
    {
      name: 'View All Courses',
      icon: CourseListIcon,
      value: "course-list"
    }
  ];

  theme = {
    root: {
      flexGrow: 1,
      height: 'calc(100vh - 85px)',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '10px',
      minWidth: 0,
      marginTop: '65px',
      overflowWrap: 'break-word',
      overflowY: 'auto'
    }
  };

  menuList = arr => {
    let scope = this;
    let list = arr.map((element, index) => {
      let uniqueKey = index.toString();
      let ListIcon = element.icon;
      return (
        <ListItem button key={uniqueKey}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={element.name} onClick={scope.setMainComp.bind(scope, element.value)} />
        </ListItem>
      );
    });
    return list;
  }

  setMainComp = (compName, key) => {
    this.setState({
      mainComp: compName,
      courseKey: key
    })
  }

  // componentWillReceiveProps(nextProps, nextState) {
  //   if(nextProps.loggedUser.user_type === 'Learner') {
  //     this.setState({
  //       menuArr: this.learnerMenu,
  //       loggedUser: nextProps.loggedUser
  //     });
  //   } else if(nextProps.loggedUser.user_type === 'Author') {
  //     this.setState({
  //       menuArr: this.authorMenu,
  //       loggedUser: nextProps.loggedUser
  //     });
  //   } else {
  //     this.setState({
  //       loggedUser: nextProps.loggedUser
  //     });
  //   }
  // }

  render() {
    let listRender;
    if(this.props.loggedUser.user_type === 'Learner') {
      listRender = this.menuList(this.learnerMenu);
    } else if(this.props.loggedUser.user_type === 'Author') {
      listRender = this.menuList(this.authorMenu);
    }

    // let listRender = this.menuList(this.state.menuArr);
    let mainRender;
    if (this.state.mainComp === "course-list") {
      mainRender = <CourseList setMainComp={this.setMainComp} />
    } else if (this.state.mainComp === "course-detail") {
      mainRender = <CourseDetail courseKey={this.state.courseKey} setMainComp={this.setMainComp} />
    } else if (this.state.mainComp === "course-resource") {
      mainRender = <CourseResource courseKey={this.state.courseKey} />
    } else if (this.state.mainComp === "add-course") {
      mainRender = <CreateCourse setMainComp={this.setMainComp}/>
    } else if (this.state.mainComp === "update-course") {
      mainRender = <UpdateCourse courseKey={this.state.courseKey} setMainComp={this.setMainComp}/>
    } else if (this.state.mainComp === "create-resource") {
      mainRender = <CreateResource courseKey={this.state.courseKey} setMainComp={this.setMainComp}/>
    }
    
    return (
      <div className="dashboard">
        <div style={this.theme.root}>
          <AppBar position="absolute" className="dashborad-appbar">
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          < Drawer variant="permanent" className="dashboard-drawer">
            <List>
              {listRender}
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <SettingIcon />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </ListItem>
            </List>
          </Drawer>
          <main style={this.theme.content}>
            {mainRender}	
          </main>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  loggedUser: state.loggedUser
}), loggedUserAction)(Dashboard);
