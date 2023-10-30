import React, { useState } from 'react'
import classes from './RecentTasks.module.css'
import RecentTasksItem from './RecentTasksItem'
import { useEffect } from 'react'
import { fetchTasks } from '../../http/dashboardAPI'

const RecentTasks = () => {

    const [tasks, setTasks] = useState([])
    
    useEffect(() => {  
        fetchTasks().then(data => setTasks(data))
    }, [])

  return (
    <div className={classes.RecentTasks}>
        <div className={classes.head}>
            <h3>Последние задачи</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Дедлайн</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                {tasks.length === 0 || tasks === null ? <tr><td colSpan="3" style={{ textAlign: "center" }}>Задач пока нет.</td></tr> : tasks.slice().reverse().slice(0, 5).map((task) => {
                    const deadline = new Date(task.deadline)
                    const formatedDeadline = String(deadline.getDate()).padStart(2, '0') + "-" + String(deadline.getMonth() + 1).padStart(2, '0') + "-" + deadline.getFullYear()
                    return <RecentTasksItem name={task.title} deadline={formatedDeadline} status={task.statusId}></RecentTasksItem>
                })
                }
            </tbody>
        </table>
    </div>
  )
}

export default RecentTasks