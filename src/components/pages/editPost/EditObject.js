import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, FilledInput, IconButton, TextField, Typography} from "@material-ui/core";

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

const removeEmptyRow = (obj) => {
  obj.body = obj.body.filter((row) => row.length !== 0)
  return obj
}

const EditObject = ({keyName, post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [obj, setObj] = useState(removeEmptyRow(post[keyName] || {header: [], body: []}));
  const [colNo, setColNo] = useState(0);

  const updateObj = () => setObj({...obj});

  const removeRow = (rowNo) => {
    obj.body = obj.body.filter((_, index) => index !== rowNo)
    updateObj();
  };

  const moveUp = (rowNo) => {
    if (rowNo === 0) return
    const temp = obj.body[rowNo]
    obj.body[rowNo] = obj.body[rowNo - 1]
    obj.body[rowNo - 1] = temp
    updateObj();
  };

  const moveDown = (rowNo) => {
    if (rowNo === obj.body.length - 1) return
    const temp = obj.body[rowNo]
    obj.body[rowNo] = obj.body[rowNo + 1]
    obj.body[rowNo + 1] = temp
    updateObj();
  };

  const removeHeader = () => {
    obj.header = []
    updateObj();
  }

  const addHeader = () => {
    obj.header = Array(obj.body[0].length).fill("");
    updateObj();
  }

  const updateHeader = (index, value) => {
    obj.header[index] = value
    updateObj();
  }

  const updateBody = (rowIndex, colIndex, value) => {
    obj.body[rowIndex][colIndex] = value
    updateObj();
  }

  const handleAddRow = (e) => {
    const colNumber = obj.body.length === 0 ? colNo : obj.body[0].length

    const newRow = Array(colNumber).fill("");
    console.log(newRow, colNumber)
    obj.body.push(newRow)
    updateObj();
  };

  const handleSavePost = () => setPost(post => {
    post[keyName] = obj
    return post
  })

  const handleUpdatePost = () => {
    handleSavePost()
    triggerSubmit()
  }

  return (<div className={classes.root}>
    <Box className={classes.table}>
      <b>
        <div className={classes.row}>
          {obj.header.length !== 0 ? obj.header.map((value, index) => {
              return <FilledInput className={classes.cell} value={value} key={index} multiline fullWidth
                                  onChange={(event) => updateHeader(index, event.target.value)}/>
            })
            :
            <Typography className={classes.cell} align="center" variant="h5">Header</Typography>
          }
          <div
            className={`${classes.actionCell} ${classes.cell}`}>
            <IconButton onClick={removeHeader}>&#x2715;</IconButton>
            <IconButton className={classes.addHeader} onClick={addHeader}>&#x2715;</IconButton>
          </div>
        </div>
      </b>
      {obj.body.map((row, rowIndex) => (
        <div className={classes.row} key={rowIndex}>
          {row.map((value, colIndex) => {
            return <FilledInput className={classes.cell} value={value}
                                key={`cell-${rowIndex}-${colIndex}`} multiline fullWidth
                                onChange={(event) => updateBody(rowIndex, colIndex, event.target.value)}/>
          })}
          <div className={`${classes.actionCell} ${classes.cell}`}>
            <IconButton size="small" className={classes.button}
                        onClick={() => removeRow(rowIndex)}>&#x2715;</IconButton>
            <IconButton size="small" className={classes.button} onClick={() => moveDown(rowIndex)}>&darr;</IconButton>
            <IconButton size="small" className={classes.button} onClick={() => moveUp(rowIndex)}>&uarr;</IconButton>
          </div>
        </div>
      ))}
    </Box>
    <div className={classes.addRowButton}>
      {obj.body.length === 0 &&
      <TextField label="Total Columns" variant="outlined" size="small" type="number" value={colNo}
                 onChange={(event) => setColNo(+event.target.value)}/>}
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

export default EditObject;
