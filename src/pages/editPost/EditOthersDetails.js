import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FilledInput, Tab, Tabs} from "@material-ui/core";
import EditObject from "./EditObject";


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    "& > *": {paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)}
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    marginLeft: theme.spacing(4),
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  title: {
    fontSize: theme.spacing(3)
  },
  deleteButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(2)
  },
}));

const EditOthersDetails = ({post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [others, setOthers] = useState(post.others || {})
  const [activeTab, setActiveTab] = useState(0)

  const updateOthers = () => setOthers({...others})

  const updateOthersObj = (key, value) => {
    others[key] = value
    updateOthers()
  }

  const updateKey = (oldKey, newKey) => {
    others[newKey] = others[oldKey]
    deleteObject(oldKey)
  }

  const deleteObject = (key) => {
    setActiveTab(0)
    delete others[key]
    updateOthers()
  }

  const addNewObject = () => {
    others["New Object"] = {header: [], body: []}
    updateOthers()
  }

  const handleSavePost = () => {
    post.others = others
    setPost({...post})
  }

  const handleUpdatePost = () => {
    handleSavePost()
    triggerSubmit()
  }

  return <div>
    <div className={classes.header}>
      <Tabs value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, value) => setActiveTab(value)}>
        {Object.keys(others).map((key, index) => <Tab key={key} label={key}/>)}
      </Tabs>
      <Button color="primary" variant="contained" className={classes.addButton} onClick={addNewObject}>
        Add New Object
      </Button>
    </div>
    <Divider className={classes.divider}/>
    {
      Object.keys(others).map((keyName, index) => {
        return (activeTab === index) ? <div className={classes.root} key={keyName}>
            <div className={classes.deleteButtonContainer}>
              <Button className={classes.delete} variant="contained" onClick={() => deleteObject(keyName)}>
                Delete Object
              </Button>
            </div>
            <FilledInput className={classes.title} value={keyName}
                         multiline fullWidth
                         onChange={(e) => updateKey(keyName, e.target.value)}
            />
            <Divider className={classes.divider}/>
            <EditObject keyName={keyName} post={others} setPost={setOthers} triggerSubmit={updateOthersObj}/>
            <Divider className={classes.divider}/>
          </div>
          : undefined
      })
    }
    <div className={classes.buttonContainer}>
      <Button size="large" color="primary" variant="contained" fullWidth
              onClick={handleSavePost}
              className={classes.submitButton}>Save</Button>
      <Button size="large" color="primary" variant="contained" fullWidth
              onClick={handleUpdatePost}
              className={classes.submitButton}>Update</Button>
    </div>
  </div>
}

export default EditOthersDetails
