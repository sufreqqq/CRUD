import React from 'react'
import classes from './ProjectsListItem.module.css'

const ProjectsListItem = ({name, children, addTask, deleteProject}) => {
  return (
  <>
    <div className={classes.ProjectsListItem}>
        <p className={classes.title}>{name}</p>
        <div className={classes.action}>
            <button onClick={addTask} style={{backgroundColor: "#3C91E6"}}>Добавить задачу</button>
            <button onClick={deleteProject} style={{backgroundColor: "#DB504A"}}>Удалить</button>
        </div>
    </div>
    {children}
</>
  )
}

export default ProjectsListItem