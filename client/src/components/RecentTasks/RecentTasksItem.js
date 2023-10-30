import React from 'react'
import classes from './RecentTasksItem.module.css'

const RecentTasksItem = ({name, deadline, status, completed, stuck, process}) => {
  return (
    <tr>
        <td>
            {name}
        </td>
        <td>
            {deadline}
        </td>
        <td>
        <div className={`${classes.status} ${status === 1 ? classes.stuck : ''} ${status === 2 ? classes.process : ''} ${status === 3 ? classes.completed : ''}`}>
            {`${status === 1 ? "Проблема" : ""} ${status === 2 ? "Ожидание" : ""} ${status === 3 ? "Готово" : ""}`}
            </div>
        </td>
    </tr>
  )
}

export default RecentTasksItem