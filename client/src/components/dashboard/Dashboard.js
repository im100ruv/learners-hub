import React, { Component } from 'react';
import './Dashboard.css';
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
import UploadCourse from "@material-ui/icons/FileUpload";
import SettingIcon from '@material-ui/icons/Settings';
import CourseList from '../courseList/CourseList';
import CourseDetail from '../courseDetail/CourseDetail';
import CourseResource from '../courseResource/CourseResource';
import CreateCourse from '../createCourse/CreateCourse';
import CreateResource from '../createCourse/CreateResource';

class Dashboard extends Component {
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
    },
    {
      name: 'Create A Course',
      icon: UploadCourse,
      value: "add-course"
    }
  ];

  authorMenu = [
    {
      name: 'Add Course',
      icon: AddCourseIcon
    },
    {
      name: 'Profile',
      icon: ProfileIcon
    },
    {
      name: 'Course List',
      icon: CoursesIcon
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

  constructor() {
    super();
    this.state = {
      menuArr: this.learnerMenu,
      mainComp: "course-list",
      courseKey: ""
    };
  }

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

  render() {
    let listRender = this.menuList(this.state.menuArr);
    let mainRender;
    if (this.state.mainComp === "course-list") {
      mainRender = <CourseList setMainComp={this.setMainComp} />
    } else if (this.state.mainComp === "course-detail") {
      mainRender = <CourseDetail courseKey={this.state.courseKey} setMainComp={this.setMainComp} />
    } else if (this.state.mainComp === "course-resource") {
      mainRender = <CourseResource courseKey={this.state.courseKey} />
    } else if (this.state.mainComp === "add-course") {
      mainRender = <CreateCourse setMainComp={this.setMainComp}/>
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

export default Dashboard;
