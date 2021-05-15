import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, FilledInput, IconButton} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {margin: theme.spacing(1)},
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  table: {
    padding: theme.spacing(1),
    "& > tr > td": {}
  },
  addHeader: {transform: 'rotate(45deg)'},
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
  },
  buttonContainer: {
    display: "flex", justifyContent: "center",
  },
  submitButton: {
    margin: theme.spacing(2)
  }
}))

const EditArray = ({keyName, post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [list, setList] = useState(post[keyName] || []);

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
    triggerSubmit()
  }

  return (<div className={classes.root}>
    <Box className={classes.table}>
      {list.map((value, index) => {
        return <div className={classes.row} key={`key-${index}`}><
          FilledInput className={classes.cell} value={value} multiline fullWidth
                      onChange={(event) => updateListItem(index, event.target.value)}/>
          <div className={`${classes.actionCell} ${classes.cell}`}>
            <IconButton size="small" className={classes.button}
                        onClick={() => removeRow(index)}>&#x2715;</IconButton>
            <IconButton size="small" className={classes.button} onClick={() => moveDown(index)}>&darr;</IconButton>
            <IconButton size="small" className={classes.button} onClick={() => moveUp(index)}>&uarr;</IconButton>
          </div>
        </div>
      })
      }
    </Box>
    <div className={classes.addRowButton}>
      <Button size="small" color="primary" variant="contained" onClick={handleAddRow}>Add Row</Button>
    </div>
    <div className={classes.buttonContainer}>
      <Button size="large" color="primary" variant="contained" onClick={handleSavePost}
              className={classes.submitButton}>Save</Button>
      <Button size="large" color="primary" variant="contained" onClick={handleUpdatePost}
              className={classes.submitButton}>Update</Button>
    </div>
  </div>)
};

export default EditArray;
