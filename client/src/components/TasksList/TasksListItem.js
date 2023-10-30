import React from 'react'
import classes from './TasksListItem.module.css'
import Edit from '../Edit/Edit'
import Delete from '../Delete/Delete'

const TasksListItem = ({category, name, start, deadline, priority, status, project, edit, deleted, desc}) => {
  return (
    <tr>
        <td>
            {category}
        </td>
        <td>
            {name}
        </td>
        <td>
            <span className={classes.Desc}>
            {desc}
            </span>
        </td>
        <td>
            {start}
        </td>
        <td>
            {deadline}
        </td>

        <td>
            <div className={`${classes.status} ${priority === 1 ? classes.completed : ''} ${priority === 2 ? classes.process : ''} ${priority === 3 ? classes.stuck : ''}`}>
            {`${priority === 1 ? "Низкий" : ""} ${priority === 2 ? "Средний" : ""} ${priority === 3 ? "Высокий" : ""}`}
            </div>
        </td>
        <td>
        <div className={`${classes.status} ${status === 1 ? classes.stuck : ''} ${status === 2 ? classes.process : ''} ${status === 3 ? classes.completed : ''}`}>
            {`${status === 1 ? "Проблема" : ""} ${status === 2 ? "Ожидание" : ""} ${status === 3 ? "Готово" : ""}`}
            </div>
        </td>
        <td>
            {project}
        </td>
        <td>
            <Edit onClick={edit}/>
        </td>
        <td>
            <Delete onClick={deleted}/>
        </td>
    </tr>
  )
}

export default TasksListItem