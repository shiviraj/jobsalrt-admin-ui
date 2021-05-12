import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import FilterOptions from "./FilterOptions";

const useStyles = makeStyles(theme => ({
  root: {
    width: '18%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    "& > *": {paddingLeft: theme.spacing(2)}
  },
  titleBar: {display: "flex", justifyContent: "space-between", paddingRight: theme.spacing(2)},
  title: {marginBottom: theme.spacing(1)},
  filter: {backgroundColor: theme.palette.grey[300], margin: theme.spacing(0.5)},
  divider: {marginTop: theme.spacing(2), marginBottom: theme.spacing(2),}
}));


const SelectedOptions = ({filters, classes, onclick}) => {
  return Object.keys(filters).map((keyName) =>
    filters[keyName].map(({name, value, checked}, index) =>
      checked && <Button variant="contained"
                         key={`${keyName}_${index}`}
                         onClick={() => onclick(keyName, value)}
                         className={classes.filter}>&#x2715; &nbsp; {name} </Button>
    )
  )
};


const FilterContainer = () => {
  const classes = useStyles()
  const [filters, setFilters] = useState({
    status: [
      {name: "Verified", value: "VERIFIED", checked: false},
      {name: "Not Verified", value: "NOT_VERIFIED", checked: true},
      {name: "Disabled", value: "DISABLED", checked: false}
    ],
    formType: [
      {name: "Online", value: "ONLINE", checked: false},
      {name: "Offline", value: "OFFLINE", checked: false}
    ],
    type: [
      {name: "Latest Job", value: "LATEST_JOB", checked: false},
      {name: "Admit Card", value: "ADMIT_CARD", checked: false},
      {name: "Result", value: "RESULT", checked: false},
      {name: "Syllabus", value: "SYLLABUS", checked: false},
      {name: "Answer Key", value: "ANSWER_KEY", checked: false},
    ],
  })

  const handleChange = (key, value) => {
    const clickedOption = filters[key].find(obj => obj.value === value);
    clickedOption.checked = !clickedOption.checked
    setFilters({...filters})
  }

  const handleClearAll = () => {
    Object.keys(filters).forEach(keyName => {
        const values = filters[keyName].filter(option => option.checked)
        values.forEach(opt => handleChange(keyName, opt.value))
      }
    )
  }


  return <div className={classes.root}>
    <div>
      <div className={classes.titleBar}>
        <Typography variant="h5" className={classes.title}>Filters</Typography>
        <Chip label="&#x2715; &nbsp; Clear All" onClick={handleClearAll}/>
      </div>
      <SelectedOptions filters={filters} classes={classes} onclick={handleChange}/>
    </div>
    <Divider className={classes.divider}/>
    <FilterOptions options={filters.status} handleChange={handleChange} keyName="status" title="Status"/>
    <Divider className={classes.divider}/>
    <FilterOptions options={filters.formType} handleChange={handleChange} keyName="formType" title="Form Type"/>
    <Divider className={classes.divider}/>
    <FilterOptions options={filters.type} handleChange={handleChange} keyName="type" title="Type"/>
    <Divider className={classes.divider}/>
  </div>
}

export default FilterContainer
