import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';


export const mainListItems = (
  <div>
    <Link href="/home">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>

    <Link href="/cst">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary=" Customers" />
    </ListItem>
    </Link>
    <Link href="/customer">
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Register Customer" />
    </ListItem>
    </Link>

    <Link href="/reports">
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon  color="secondary"/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    </Link>
    <Link href="/agent">
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon  color="secondary"/>
      </ListItemIcon>
      <ListItemText primary="Agent Register" />
    </ListItem>
    </Link>


  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
