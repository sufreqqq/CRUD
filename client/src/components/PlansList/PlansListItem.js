import React from 'react'
import classes from "./PlansListItem.module.css"

const PlansItem = ({id, name, onClick, status, onChange}) => {
  
  
  return (
    <div className={classes.PlansItem}>
        <div className={classes.PlansInfo}>
          <input type='checkbox' onChange={onChange} checked={status}/>
          <p>{name}</p>
        </div>
        <button onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></button>
    </div>
  )
}

export default PlansItem