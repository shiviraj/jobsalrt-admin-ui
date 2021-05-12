import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  button: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: theme.spacing(2.5),
    marginLeft: theme.spacing(0.5)
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }
}))

const Pagination = ({count, page, onChange}) => {
  const classes = useStyles()
  const [ranges, setRanges] = useState([])

  const generateRanges = (page, count, pages) => {
    if (count < 8) return pages
    if (page < 5) {
      return pages.slice(0, 5).concat(pages.slice(-1))
    }
    if (page > count - 4) {
      return pages.slice(0, 1).concat(pages.slice(-5))
    }
    return pages.slice(0, 1).concat(pages.slice(page - 2, page + 1)).concat(pages.slice(-1))
  };

  useEffect(() => {
    const pages = Array(count).fill("").map((_, index) => index + 1)
    setRanges(generateRanges(page, count, pages))
  }, [page, count])


  return <div>
    <IconButton className={classes.button}
                variant="text"
                disabled={page === 1}
                onClick={(e) => onChange(e, 1)}>&#8676;</IconButton>
    <IconButton className={classes.button}
                variant="text"
                disabled={page === 1}
                onClick={(e) => onChange(e, page - 1)}> &larr;</IconButton>
    {
      ranges.map((pageNumber, index) => {
        return <>
          <IconButton
            className={`${classes.button} ${pageNumber === page ? classes.active : ""}`}
            variant="text"
            key={pageNumber}
            onClick={(e) => onChange(e, pageNumber)}
          >{pageNumber}</IconButton>
          {(ranges[index + 1] && ranges[index + 1] !== pageNumber + 1) &&
          < IconButton className={classes.button} disabled variant="text">...</IconButton>}
        </>
      })
    }
    <IconButton className={classes.button}
                variant="text"
                disabled={page === count}
                onClick={(e) => onChange(e, page + 1)}>&rarr;</IconButton>
    <IconButton className={classes.button}
                variant="text"
                disabled={page === count}
                onClick={(e) => onChange(e, count)}>&#8677;</IconButton>
  </div>
}

export default Pagination
