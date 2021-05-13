import React from 'react'
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    width: theme.spacing(40),
    border: `1px solid ${theme.palette.primary.extraLight}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    '&:hover': {
      boxShadow: theme.shadows[4],
      backgroundColor: theme.palette.grey[400]
    }
  },
  error: {
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  },
  success: {
    backgroundColor: theme.palette.success.light,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    }
  },
  logoContainer: {
    display: 'flex',
    justifyContent: "center",
    margin: theme.spacing(1),
  },
  title: {
    textAlign: "justify",
    margin: 0,
    padding: 0,
  },
  logo: {
    height: theme.spacing(8),
    maxWidth: theme.spacing(38)
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));


const Post = ({post}) => {
  const classes = useStyles()
  const boxBackground = {
    NOT_VERIFIED: classes.error,
    VERIFIED: classes.success,
    DISABLED: classes.disabled
  }

  return <Box m={0.5} p={1} className={`${classes.root} ${boxBackground[post.status]}`}>
    <div>
      <Typography variant="h6" className={classes.title}>{post.name}</Typography>
    </div>
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={post.postLogo} alt={post.postLogo}/>
    </div>
    <div>
      {post.advtNo && <Typography variant="body1"><b>Advt No :</b> &nbsp; {post.advtNo} </Typography>}
      <Typography variant="body1"><b>Form Type :</b> &nbsp; {post.formType} </Typography>
      {post.lastDate && <Typography variant="body1"><b>Last Date :</b> &nbsp; {post.lastDate} </Typography>}
      {post.company && <Typography variant="body1"><b>Company :</b> &nbsp; {post.company} </Typography>}
      {post.totalVacancies && <Typography variant="body1"><b>Vacancy :</b> &nbsp; {post.totalVacancies} </Typography>}
      {post.qualification &&
      <Typography variant="body1"><b>Qualification :</b> &nbsp; {post.qualification} </Typography>}
      {post.location && <Typography variant="body1"><b>Location :</b> &nbsp; {post.location} </Typography>}
      {post.ageLimit && <Typography variant="body1"><b>Age Limit :</b> &nbsp; {post.ageLimit} </Typography>}
      {post.createdAt && <Typography variant="body1"><b>Created At :</b> &nbsp; {post.createdAt} </Typography>}
      {post.postUpdateDate &&
      <Typography variant="body1"><b>Post Update Date :</b> &nbsp; {post.postUpdateDate} </Typography>}
      <Typography variant="body1"><b>Total Views :</b> &nbsp; {post.totalViews} </Typography>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" component="a"
                href={`/posts/${post.url}`}>Edit</Button>
      </div>
    </div>

  </Box>
}

export default Post
