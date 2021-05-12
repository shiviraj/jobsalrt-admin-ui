import React, {useState} from 'react'
import {Button, Checkbox, Chip, FormControl, FormControlLabel, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  titleBar: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  up: {transform: 'rotate(-90deg)'},
  down: {transform: 'rotate(90deg)'},
  chip: {width: theme.spacing(12), marginTop: theme.spacing(1)},
}));


const FilterOptions = ({options, handleChange, keyName, title}) => {
  const classes = useStyles()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
  const handleClearAll = () => {
    const selectedOptions = options.filter(option => option.checked);
    selectedOptions.forEach(option => handleChange(keyName, option.value))
  }

  return <div>
    <div className={classes.titleBar}>
      <Typography variant="h5">{title}</Typography>
      <Button size="small"
              className={isCollapsed ? classes.down : classes.up}
              onClick={toggleCollapsed}>&#10095;</Button>
    </div>
    {!isCollapsed && <FormControl component="fieldset" key={keyName}>
      {options.some(option => option.checked) &&
      <Chip label="&#x2715; &nbsp; Clear All" className={classes.chip} onClick={handleClearAll}/>}
      {options.map((option, index) => {
        return <FormControlLabel
          key={`${option.name}_${index}`}
          value={option.value}
          control={<Checkbox color="primary" checked={option.checked}
                             onChange={() => handleChange(keyName, option.value)}
          />}
          label={option.name}
          labelPlacement="end"
        />
      })
      }
    </FormControl>}
  </div>
}

export default FilterOptions
