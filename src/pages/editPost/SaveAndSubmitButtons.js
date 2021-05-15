import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex", justifyContent: "center",
  },
  submitButton: {
    margin: theme.spacing(2)
  }
}))

const SaveAndSubmitButtons = ({handleSave, handleSubmit, ...rest}) => {
  const classes = useStyles()
  return <div className={classes.buttonContainer}>
    <Button size="large" color="primary" variant="contained" onClick={handleSave} {...rest}
            className={classes.submitButton}>Save</Button>
    <Button size="large" color="primary" variant="contained" onClick={handleSubmit} {...rest}
            className={classes.submitButton}>Update</Button>
  </div>
}

export default SaveAndSubmitButtons
