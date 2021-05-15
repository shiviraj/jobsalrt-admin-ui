import React from "react";
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
}));


const FormSelect = ({label, value, onChange, options, ...rest}) => {
  const classes = useStyles();

  return (<div className={classes.root}>
    <FormControl {...rest}>
      <InputLabel>{label}</InputLabel>
      <Select label={label}
              value={value}
              onChange={(e, option) => onChange(option.props.value)}>
        {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  </div>)
}

export default FormSelect
