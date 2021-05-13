import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
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
  },
  buttonContainer: {
    display: "flex", justifyContent: "center",
  },
  button: {
    margin: theme.spacing(2)
  }
}))

const EditBasicDetails = ({post, setPost, triggerSubmit}) => {
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
        if (obj.key === "url") details.url = details.url.split(" ").join("-").toLowerCase()
        return <FormInput label={obj.label}
                          key={obj.label}
                          value={details[obj.key]}
                          onChange={(value) => updateDetails(obj.key, value)}
                          type={obj.type}
                          required={obj.required}
        />
      })
    }
    <div className={classes.buttonContainer}>
      <Button onClick={handleSave} size="large" color="primary" variant="contained"
              className={classes.button}>Save</Button>
      <Button onClick={handleSubmit} size="large" color="primary" variant="contained"
              className={classes.button}>Update</Button>
    </div>
  </form>
}

export default EditBasicDetails
