import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../../../theme/theme";
import {ListItem, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    boxShadow: theme.shadows[4],
    display: "flex",
    justifyContent: "flex-start",
    "& > *": {
      width: theme.spacing(20),
      textAlign: "center"
    },
    "& > *:hover": {
      backgroundColor: theme.palette.primary.extraLight,
      color: theme.palette.common.black,
    }
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  }
});

const Menubar = () => {
  const classes = useStyles();
  return (<div component="nav" className={classes.root}>
    <ListItem button component={NavLink} to="/" activeClassName={classes.active} exact>
      <ListItemText primary="HOME"/>
    </ListItem>
    <ListItem button component={NavLink} to="/posts" activeClassName={classes.active} exact>
      <ListItemText primary="POSTS"/>
    </ListItem>
  </div>);
}

export default Menubar
