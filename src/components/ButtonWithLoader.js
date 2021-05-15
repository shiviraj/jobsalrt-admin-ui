import React from "react";
import {Button, CircularProgress} from "@material-ui/core";

const ButtonWithLoader = ({isLoading, variant, children, ...rest}) => {
  return <Button variant={isLoading ? "outlined" : (variant || "contained")} disabled={isLoading} {...rest}>
    {children}
    {isLoading && <CircularProgress color={rest.color} size={20} thickness={5}/>}
  </Button>
}

export default ButtonWithLoader
