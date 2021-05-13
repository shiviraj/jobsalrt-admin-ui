import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PostContext from "../../../context/PostContext";
import FormInput from "../../utils/FormInput";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      width: "48%"
    }
  }
}))

const BasicDetails = ({post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  const [details, setDetails] = useState(post.basicDetails || {})
  const keyTitle = [{key: "name", label: "Post Title", required: true},
    {key: "formType", label: "Form Type", required: true},
    {key: "advtNo", label: "Advt No", required: false},
    {key: "lastDate", label: "Last Date", required: false, type: "date"},
    {key: "totalVacancies", label: "Vacancies", required: false, type: "number"},
    {key: "location", label: "Location", required: false},
    {key: "company", label: "Company", required: false},
    {key: "qualification", label: "Qualification", required: false},
    {key: "minAgeLimit", label: "Age Limit (Min)", required: false, type: "date"},
    {key: "maxAgeLimit", label: "Age Limit (Max)", required: false, type: 'date'},
    {key: "url", label: "Url", required: true},
    {key: "postLogo", label: "Post Logo Url", required: true},
  ]

  const updateDetails = (key, value) => {
    setDetails(details => {
      details[key] = value
      return details
    })
  }

  const handleSave = () => {
    setPost(post => {
      post.basicDetails = details
      return post
    })
  };

  const handleSubmit = () => {
    handleSave()
    triggerSubmit()
  };
  return <form className={classes.root}>
    {
      keyTitle.map(obj => {
        return <FormInput label={obj.label}
                          value={details[obj.key]}
                          onChange={(value) => updateDetails(obj.key, value)}
                          type={obj.type}
                          required={obj.required}
        />
      })
    }
    <Button onClick={handleSave}>Save and Continue</Button>
    <Button onClick={handleSubmit}>Submit and Continue</Button>
  </form>
}

const EditBasicDetails = () => {
  return <PostContext.Consumer>{({post, setPost, triggerSubmit}) =>
    <BasicDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>
  }</PostContext.Consumer>
}

export default EditBasicDetails
