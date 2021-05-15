import React from "react";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: theme.spacing(15),
    border: '1px solid black',
    justifyContent: "space-evenly",
  },
  dot: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
  },
  dot1: {
    transform: "rotate(45deg)"
  },
  dot2: {
    transform: "rotate(45deg)"
  },
  dot3: {
    transform: "rotate(45deg)"
  }

}))

const Loader = () => {

  const classes = useStyles()
  return <div className={classes.root}>
    <Box className={`${classes.dot}  ${classes.dot1}`}/>
    <Box className={`${classes.dot}  ${classes.dot2}`}/>
    <Box className={`${classes.dot}  ${classes.dot3}`}/>
  </div>
}

export default Loader
