import React from "react";
import {Button, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loader: {marginLeft: theme.spacing(1)}
}))

const ButtonWithLoader = ({isLoading, variant, children, ...rest}) => {
  const classes = useStyles()
  return <Button variant={isLoading ? "outlined" : (variant || "contained")} disabled={isLoading} {...rest}>
    {children} {isLoading && <CircularProgress className={classes.loader} color={rest.color} size={20} thickness={5}/>}
  </Button>
}

export default ButtonWithLoader
