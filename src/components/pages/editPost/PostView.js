import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import EditBasicDetails from "./EditBasicDetails";
import {Divider, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    width: '78%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    "& > *": {paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)}
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: theme.spacing(4)
  },
  postCounts: {
    marginLeft: theme.spacing(2)
  },
  postContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2)
  }
}));


const PostView = ({active}) => {
  const classes = useStyles()
  return <div className={classes.root}>
    <Typography variant="h5" className={classes.title}>{active.name}</Typography>
    <Divider className={classes.divider}/>
    {active.key === "basicDetails" && <EditBasicDetails/>}
  </div>
}

export default PostView
