import React from 'react'
import Layout from '../components/Layout/Layout'
import TasksList from '../components/TasksList/TasksList'

const TaskPage = () => {
  return (
    <Layout title="Задачи">
      <TasksList></TasksList>
    </Layout>
  )
}

export default TaskPage