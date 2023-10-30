import React from 'react'
import classes from './Edit.module.css'

const Edit = ({...props}) => {
  return (
    <button {...props} className={classes.Edit}>:</button>
  )
}

export default Edit