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
import addCourseIcon from '@material-ui/icons/LibraryAdd';
import SettingIcon from '@material-ui/icons/Settings';

class Dashboard extends Component {
  learnerMenu = [
    {
      name: 'Profile',
      icon: ProfileIcon
    },
    {
      name: 'Course Enrolled',
      icon: CoursesIcon
    }
  ];

  authorMenu = [
    {
      name: 'Add Course',
      icon: addCourseIcon
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
      height: 'calc(100vh - 85px)',
      marginTop: '65px',
      overflowWrap: 'break-word',
      overflowY: 'auto'
    }
  };

  constructor() {
    super();
    this.state = {
      menuArr: this.learnerMenu
    };
  }

  menuList(arr) {
    let list = arr.map((element, index) => {
      let uniqueKey = index.toString();
      let ListIcon = element.icon;
      return(
        <ListItem button key={uniqueKey}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={element.name} />
        </ListItem>
      );
    });
    return list;
  }

  render() {
    let listRender = this.menuList(this.state.menuArr);
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
          < Drawer variant = "permanent" className = "dashboard-drawer">
            <List>
              {listRender}
            </List>
            <Divider/>
            <List>
            <ListItem button>
                <ListItemIcon>
                  <SettingIcon/>
                </ListItemIcon>
                <ListItemText primary="Setting"/>
              </ListItem>
            </List>
          </Drawer>
          <main style={this.theme.content}>
            
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
  