import React, { useState } from 'react'
import classes from './StatCard.module.css'
import StatCardItem from './StatCardItem'
import { useEffect } from 'react'
import { fetchTasks } from '../../http/dashboardAPI'

const StatCard = () => {

const [completedTasks, setCompletedTasks] = useState("Загрузка");
const [stuckTasks, setStuckTasks] = useState("Загрузка");
const [processTasks, setProcessTasks] = useState("Загрузка");

useEffect(() => {  
  fetchTasks().then(data => {
    let completed = 0;
    let stuck = 0;
    let process = 0;
    data.map((task) => {
      if(task.statusId === 1) {
        stuck += 1;
      }
      else if(task.statusId === 2) {
        process += 1;
      }
      else if(task.statusId === 3) {
        completed += 1;
      }
    });
    setCompletedTasks(completed);
    setStuckTasks(stuck);
    setProcessTasks(process);
  });
}, []);

  return (
    <ul className={classes.StatCard}>
        <StatCardItem secondaryColor="#FFF1C6" primaryColor="#FECE27" name="Оставшиеся задачи" number={processTasks}/>
        <StatCardItem secondaryColor="#CFE8FF" primaryColor="#3C91E6" name="Выполненные задачи" number={completedTasks}/>
        <StatCardItem secondaryColor="#FFE0D3" primaryColor="#FD7237" name="Невыполненные задачи" number={stuckTasks}/>  
    </ul>
  )
}

export default StatCard