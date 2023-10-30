import { observer } from 'mobx-react-lite'
import React, { useState, useEffect } from 'react'
import { fetchCategories, fetchStatistic, fetchTasks } from '../http/dashboardAPI'
import Layout from '../components/Layout/Layout'
import StatCard from '../components/StatCard/StatCard'
import classes from './Dashboard.module.css'
import RecentTasks from '../components/RecentTasks/RecentTasks'
import RecentPlans from '../components/RecentPlans/RecentPlans'

const Dashboard = observer(() => {


  return (
    <Layout title="Панель">
      <div>
        <StatCard></StatCard>
        <div className={classes.tables}>
          <RecentTasks></RecentTasks>
          <RecentPlans></RecentPlans>
        </div>
      </div>
    </Layout>
  )
})

export default Dashboard