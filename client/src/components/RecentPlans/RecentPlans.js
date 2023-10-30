import React, {useEffect, useState} from 'react'
import classes from './RecentPlans.module.css'
import RecentPlansItem from './RecentPlansItem'
import { fetchPlans } from '../../http/dashboardAPI'

const RecentPlans = () => {

  const [plans, setPlans] = useState([])

  useEffect(() => {
    try {
      fetchPlans().then((data) => setPlans(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className={classes.RecentPlans} >
        <div className={classes.head}>
            <h3>Планы</h3>
        </div>
        <ul className={classes.plansList}>
          {plans.length === 0 || plans === null ? <p style={{textAlign: "center"}}>Планов пока нет.</p> : plans.slice().reverse().slice(0, 5).map((plan) => {
            return <RecentPlansItem name={plan.title} completed={plan.completed}></RecentPlansItem>
          })}
        </ul>
    </div>
  )
}

export default RecentPlans