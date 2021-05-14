import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from "../../utils/FormInput";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs
} from "@material-ui/core";
import EditArray from "./EditArray";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      width: "48%"
    }
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(2)
  },
}))

const EditPostDetails = ({post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [failures, setFailures] = useState({failures: post.failures} || {})
  const [activeTab, setActiveTab] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)

  const states = [
    {name: "Latest Job", value: "LATEST_JOB"},
    {name: "Admit Card", value: "ADMIT_CARD"},
    {name: "Result", value: "RESULT"},
    {name: "Syllabus", value: "SYLLABUS"},
    {name: "Answer Key", value: "ANSWER_KEY"},
    {name: "Admission", value: "ADMISSION"},
  ]

  const updatePost = () => setPost({...post})

  const updateDetails = (key, value) => {
    post[key] = value
    updatePost()
  }

  const handleStateChange = (state, isSelect) => {
    if (isSelect) post.states.push({type: state})
    else post.states = post.states.filter(({type}) => type !== state)
    updatePost()
  }

  const handleStatusChange = (_e, status) => {
    post.status = status
    updatePost()
  }

  const handleUpdateAvailbleChange = (_e, updateAvailable) => {
    post.isUpdateAvailable = JSON.parse(updateAvailable)
    updatePost()
  }

  const handleSave = (event) => {
    event.preventDefault()
    updatePost()
    isSubmit && triggerSubmit()
  };

  const handleUpdateFailures = () => {
    post.failures = failures
    updatePost()
  };

  return <form onSubmit={handleSave}>
    <Tabs value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => setActiveTab(value)}>
      <Tab label="Common Details"/>
      <Tab label="Failures"/>
    </Tabs>
    <Divider className={classes.divider}/>
    {activeTab === 0 && <div className={classes.root}>
      <FormInput label="Source" value={post.source} disabled/>
      <FormInput label="Total Views" value={post.totalViews ? post.totalViews : "0"} disabled/>
      <FormInput label="Created At" value={post.createdAt} disabled/>
      <FormInput label="Last Update on" value={post.postUpdateDate} disabled/>
      <FormInput label="Other Source" value={post.otherSource}
                 onChange={(value) => updateDetails("otherSource", value)}/>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup row value={post.status} onChange={handleStatusChange}>
          <FormControlLabel value="NOT_VERIFIED" control={<Radio color="primary"/>} label="Not Verified"/>
          <FormControlLabel value="VERIFIED" control={<Radio color="primary"/>} label="Verified"/>
          <FormControlLabel value="DISABLED" control={<Radio color="primary"/>} label="Disabled"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">Update Available</FormLabel>
        <RadioGroup row value={post.isUpdateAvailable.toString()} onChange={handleUpdateAvailbleChange}>
          <FormControlLabel value="true" control={<Radio color="primary"/>} label="True"/>
          <FormControlLabel value="false" control={<Radio color="primary"/>} label="False"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">State</FormLabel>
        <FormGroup row>
          {
            states.map(state => {
              return <FormControlLabel
                key={state.value}
                control={
                  <Checkbox name="checkedA"
                            checked={!!post.states.find(({type}) => type === state.value)}
                            onChange={(e, p) => handleStateChange(state.value, p)}
                            color="primary"/>}
                label={state.name}/>
            })
          }
        </FormGroup>
      </FormControl>
    </div>}

    {activeTab === 1 &&
    <EditArray post={failures} keyName="failures" setPost={setFailures} triggerSubmit={handleUpdateFailures}/>}

    <div className={classes.buttonContainer}>
      <Button size="large" color="primary" variant="contained" fullWidth onClick={() => setIsSubmit(false)}
              className={classes.submitButton} type="submit">Save</Button>
      <Button size="large" color="primary" variant="contained" fullWidth onClick={() => setIsSubmit(true)}
              className={classes.submitButton} type="submit">Update</Button>
    </div>
  </form>
}

export default EditPostDetails
