import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from "../../components/FormInput";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import fetchApi from "../../api/fetchApi";

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
  const [isSubmit, setIsSubmit] = useState(false)
  const [urlAvailable, setUrlAvailble] = useState(false)

  useEffect(() => {
    fetchApi({type: "URL_AVAILABLE", payload: {url: details.url}})
      .then(res => {
        if ((res.first || res.second === post.source) && details.url !== "anonymous")
          setUrlAvailble(true)
        else setUrlAvailble(false)
      }).catch(e => {
    })
  }, [details.url, post.source])


  const keyTitle = [{key: "name", label: "Post Title", required: true},
    {key: "advtNo", label: "Advt No", required: false},
    {key: "lastDate", label: "Last Date", required: false, type: "date"},
    {key: "totalVacancies", label: "Vacancies", required: false, type: "number"},
    {key: "location", label: "Location", required: false},
    {key: "company", label: "Company", required: false},
    {key: "qualification", label: "Qualification", required: false},
    {key: "minAgeLimit", label: "Age Limit (Min)", required: false, type: "date"},
    {key: "maxAgeLimit", label: "Age Limit (Max)", required: false, type: 'date'},
    {key: "postLogo", label: "Post Logo Url", required: true},
  ]

  const updateDetails = (key, value) => {
    details[key] = value
    setDetails({...details})
  }

  const handleFormTypeChange = (_e, value) => updateDetails("formType", value)

  const handleSave = (event) => {
    event.preventDefault()
    setPost(post => {
      post.basicDetails = details
      return post
    })
    isSubmit && urlAvailable && triggerSubmit()
  };

  return <form className={classes.root} onSubmit={handleSave}>
    <FormControl component="fieldset" required>
      <FormLabel component="legend">Form Type</FormLabel>
      <RadioGroup row value={details.formType} onChange={handleFormTypeChange}>
        <FormControlLabel value="ONLINE" control={<Radio color="primary"/>} label="Online"/>
        <FormControlLabel value="OFFLINE" control={<Radio color="primary"/>} label="Offline"/>
      </RadioGroup>
    </FormControl>
    {
      keyTitle.map(obj => {
        return <FormInput label={obj.label}
                          key={obj.label}
                          value={details[obj.key]}
                          onChange={(value) => updateDetails(obj.key, value)}
                          type={obj.type}
                          required={obj.required}
        />
      })
    }
    <FormInput label="Url" value={details.url.split(" ").join("-").toLowerCase()}
               onChange={(value) => updateDetails("url", value.split(" ").join("-").toLowerCase())} required
               error={!urlAvailable}/>
    <div className={classes.buttonContainer}>
      <Button size="large" color="primary" variant="contained" onClick={() => setIsSubmit(false)}
              className={classes.button} type="submit" disabled={!urlAvailable}>Save</Button>
      <Button size="large" color="primary" variant="contained" onClick={() => setIsSubmit(true)}
              className={classes.button} type="submit" disabled={!urlAvailable}>Update</Button>
    </div>
  </form>
}

export default EditBasicDetails
