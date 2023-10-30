import React from 'react'
import classes from './RecentPlansItem.module.css'

const RecentPlansItem = ({name, completed}) => {
  return (
    <li className={`${classes.RecentPlansItem} ${completed ? classes.completed : classes.stuck}`}>
    {name}
    </li>
  )
}

export default RecentPlansItem