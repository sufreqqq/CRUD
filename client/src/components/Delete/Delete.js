import React from 'react'
import classes from './Delete.module.css'

const Delete = ({...props}) => {
  return (
    <button {...props} className={classes.Delete}>X</button>
  )
}

export default Delete