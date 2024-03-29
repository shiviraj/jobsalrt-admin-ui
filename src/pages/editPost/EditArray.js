import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, FilledInput, IconButton, Paper} from "@material-ui/core";
import {ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";

const useStyles = makeStyles(theme => ({
  root: {margin: theme.spacing(1)},
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cell: {
    border: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.common.white,
    width: "100%"
  },
  actionCell: {
    display: "flex",
    width: theme.spacing(25),
    justifyContent: "space-around",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  button: {
    paddingRight: theme.spacing(1),
    margin: theme.spacing(.1),
    paddingLeft: theme.spacing(1),
  },
  addRowButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1)
  }
}))

const EditArray = ({keyName, post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [list, setList] = useState(post[keyName] || []);
  const [isUpdating, setIsUpdating] = useState(false)

  const updateList = () => setList([...list]);

  const removeRow = (rowNo) => {
    setList(list.filter((_, index) => index !== rowNo))
  };

  const moveUp = (rowNo) => {
    if (rowNo === 0) return
    const temp = list[rowNo]
    list[rowNo] = list[rowNo - 1]
    list[rowNo - 1] = temp
    updateList();
  };

  const moveDown = (rowNo) => {
    if (rowNo === list.length - 1) return
    const temp = list[rowNo]
    list[rowNo] = list[rowNo + 1]
    list[rowNo + 1] = temp
    updateList();
  };

  const updateListItem = (index, value) => {
    list[index] = value
    updateList();
  }

  const handleAddRow = (e) => {
    list.push("")
    updateList();
  };

  const handleSavePost = () => {
    post[keyName] = list
    setPost({...post})
  }

  const handleUpdatePost = () => {
    handleSavePost()
    setIsUpdating(true)
    triggerSubmit(() => setIsUpdating(false))
  }

  return (<div className={classes.root}>
    <Paper>
      {
        list.map((value, index) => {
          return <div className={classes.row} key={`key-${index}`}>
            <FilledInput className={classes.cell} value={value} multiline fullWidth
                         onChange={(event) => updateListItem(index, event.target.value)}/>
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} onClick={() => removeRow(index)}><Close/></IconButton>
              <IconButton className={classes.button} onClick={() => moveDown(index)}><ArrowDownward/></IconButton>
              <IconButton className={classes.button} onClick={() => moveUp(index)}><ArrowUpward/></IconButton>
            </div>
          </div>
        })
      }
    </Paper>

    <div className={classes.addRowButton}>
      <Button size="small" color="primary" variant="contained" onClick={handleAddRow}>Add Row</Button>
    </div>

    <SaveAndSubmitButtons isLoading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}/>

  </div>)
};

export default EditArray;
