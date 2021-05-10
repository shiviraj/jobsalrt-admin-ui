import React from 'react'
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.grey[100],
    width: theme.spacing(40),
    border: `1px solid ${theme.palette.primary.extraLight}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    '&:hover': {
      boxShadow:theme.shadows[1],
      backgroundColor: theme.palette.common.white,
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
    width: theme.spacing(8),
    border: `2px solid ${theme.palette.primary.dark}`
  },
});

const Post = ({post}) => {
  const classes = useStyles()
  return <Box m={0.5} p={1} className={classes.root}>
    <div>
      <Typography variant="h6" className={classes.title}>{post.name}</Typography>
    </div>
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={post.postLogo} alt={post.postLogo}/>
    </div>
    <div>
      {post.advtNo && <Typography variant="body1"><b>Advt No :</b> &nbsp; {post.advtNo} </Typography>}
      <Typography variant="body1"><b>Form Type :</b> &nbsp; {post.formTye} </Typography>
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
    </div>
  </Box>
}

export default Post
