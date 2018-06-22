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
import SettingIcon from '@material-ui/icons/Settings';

class Dashboard extends Component {

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
  }

  render() {
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
          <Drawer
            variant="permanent"
            className="dashboard-drawer"
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CoursesIcon />
                </ListItemIcon>
                <ListItemText primary="Courses Enrolled" />
              </ListItem>
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
            <Typography>{'You think water moves fast? You should see ice.You think water moves fast? You should see ice.You think water moves fast? You should see ice.You think water moves fast? You should see ice.You think water moves fast? You should see ice.You think water moves fast?'}</Typography>
          </main>
        </div>
      </div>
      
    );
  }
}
  
export default Dashboard;
  