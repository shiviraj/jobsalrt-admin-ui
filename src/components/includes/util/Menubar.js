import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import theme from "../../../theme/theme";
import {Box} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.grey[300],
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  }
});

const Menubar = () => {
  const classes = useStyles();
  return (
    <Box
      boxShadow={6}
      className={classes.root}
    >
      <Tabs>
        <Tab label="Home" component={NavLink} to="/" activeClassName={classes.active} exact/>
        <Tab label="Posts" component={NavLink} to="/posts" activeClassName={classes.active} exact/>
      </Tabs>
    </Box>
  );
}

export default Menubar
