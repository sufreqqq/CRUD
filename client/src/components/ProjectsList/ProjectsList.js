import React, {useEffect, useState} from 'react'
import ProjectsListItem from './ProjectsListItem'
import { createTask, deleteTaskItem, deleteProject, editTask, addProject, fetchCategories, fetchPriorities, fetchProjects, fetchStatuses, fetchTasks } from '../../http/dashboardAPI'
import TasksListItem from '../TasksList/TasksListItem'
import classes from './ProjectsList.module.css'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'

const ProjectsList = () => {
    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])
    const [priorities, setPriorities] = useState([])
    const [currentProject, setCurrentProject] = useState(null)
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [active, setActive] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)
    const [activeProject, setActiveProject] = useState(false)
    const [valueIdTask, setValueIdTask] = useState('')
    const [valueCategory, setValueCategory] = useState('')
    const [valueName, setValueName] = useState('')
    const [valueDesc, setValueDesc] = useState('')
    const [valueDeadline, setValueDeadline] = useState('')
    const [valuePriority, setValuePriority] = useState('')
    const [valueStatus, setValueStatus] = useState('')
    const [valueProject, setValueProject] = useState('')
    
    const create = (projectId) => {
        createTask({title: valueName, desc: valueDesc, deadline: valueDeadline, 
        priorityId: valuePriority, categoryId: valueCategory, statusId: valueStatus, projectId: projectId}).then(task => {
          setValueCategory('')
          setValueName('')
          setValueDesc('')
          setValueDeadline('')
          setValuePriority('')
          setValueStatus('')
          setValueProject('')
          setTasks([...tasks, task])
        }).catch(() => alert("Произошла ошибка при добавлении!")).finally(() => {setActive(false); fetchAll()})
    }
    
    
    const createProject = () => {
        addProject({title: valueProject}).then(project => {
          setValueProject('')
          setProjects([...projects, project])
          setActiveProject(false)
        })
      }
    
    const deleted = (projectId) => {
        deleteProject(projectId)
        const updatedProjects = projects.filter((project) => project.id !== projectId)
        setProjects(updatedProjects)
        if(updatedProjects.length === 0){
          fetchProjects().then((data) => setTasks(data))
        }
    }
    
    const handleEdit = (taskId) => {
      const taskToEdit = tasks.find(task => task.id === taskId)
      console.log(taskToEdit)
      const deadline = new Date(taskToEdit.deadline)
      const deadlineYear = deadline.getFullYear()
      const deadlineMonth = String(deadline.getMonth() + 1).padStart(2, '0')
      const deadlineDay = String(deadline.getDate()).padStart(2, '0')
      const deadlineDate= `${deadlineYear}-${deadlineMonth}-${deadlineDay}`
      setValueName(taskToEdit.title)
      setValueCategory(taskToEdit.categoryId)
      setValueDesc(taskToEdit.desc)
      setValueIdTask(taskToEdit.id)
      setValueDeadline(deadlineDate)
      setValuePriority(taskToEdit.priorityId)
      setValueStatus(taskToEdit.statusId)
      setValueProject(taskToEdit.projectId)
      setActiveEdit(true)
    }
    
    const handleClose = () => {
      setValueCategory('')
      setValueName('')
      setValueDesc('')
      setValueDeadline('')
      setValuePriority('')
      setValueStatus('')
      setValueProject('')
    }
    const edit = () => {
      editTask({id: valueIdTask, title: valueName, desc: valueDesc, deadline: valueDeadline, 
        priorityId: valuePriority, categoryId: valueCategory, statusId: valueStatus, projectId: valueProject}).then(task => {
          setValueCategory('')
          setValueName('')
          setValueDesc('')
          setValueDeadline('')
          setValuePriority('')
          setValueStatus('')
          setValueProject('')
        }).catch(() => alert("Произошла ошибка при добавлении!")).finally(() => {setActiveEdit(false); fetchAll()})
        }
    
    const deleteTask = (taskId) => {
      deleteTaskItem(taskId)
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
      if(updatedTasks.length === 0){
        fetchTasks().then((data) => setTasks(data))
      }
    }
    
    const fetchAll = () => {
      fetchTasks().then(data => setTasks(data))
      fetchCategories().then(data => setCategories(data))
      fetchPriorities().then(data => setPriorities(data))
      fetchStatuses().then(data => setStatuses(data))
      fetchProjects().then(data => setProjects(data))
    }
    
    useEffect(() => {
        fetchAll()
    }, [])
    
  return (
<>
<div>
{ projects === null || projects.length === 0 ? <p>Проектов пока нет.</p> : projects.slice().reverse().map((project) => {
  return (
    <div key={project.id}>
      <ProjectsListItem deleteProject={() => deleted(project.id)} addTask={() => {setActive(true); setCurrentProject(project.id)}} name={project.title} />
      <div className={classes.TasksList}>
        {tasks.filter((task) => task.projectId === project.id).length === 0 ? (
          <p style={{textAlign: "center"}}>Задач еще нет</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Категория</th>
                <th>Наименование</th>
                <th>Краткое описание</th>
                <th>Дата начала</th>
                <th>Дедлайн</th>
                <th>Приоритет</th>
                <th>Статус</th>
                <th>Проект</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => task.projectId === project.id).slice().reverse().map((task) => {
                  const created = new Date(task.createdAt);
                  const formatedCreated = String(created.getDate()).padStart(
                    2,
                    "0"
                  ) + "-" + String(created.getMonth() + 1).padStart(2, "0") + "-" + created.getFullYear();
                  const deadline = new Date(task.deadline);
                  const formatedDeadline = String(deadline.getDate()).padStart(
                    2,
                    "0"
                  ) + "-" + String(deadline.getMonth() + 1).padStart(2, "0") + "-" + deadline.getFullYear();
                  let priorityTitle = "";
                  let categoryTitle = "";
                  projects.map((project) => {
                    if (project.id === task.projectId) {
                      priorityTitle = project.title;
                    }
                  });
                  categories.map((category) => {
                    if (category.id === task.categoryId) {
                      categoryTitle = category.title;
                    }
                  });
                  return (
                    <TasksListItem
                      key={task.id}
                      category={categoryTitle}
                      name={task.title}
                      desc={task.desc}
                      start={formatedCreated}
                      deadline={formatedDeadline}
                      priority={task.priorityId}
                      status={task.statusId}
                      project={priorityTitle}
                      edit={() => handleEdit(task.id)}
                      deleted={() => deleteTask(task.id)}
                    />
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <Modal active={active} setActive={setActive} onClose={handleClose}>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px", padding: "20px"}}>
            <h3>Добавить задачу</h3>
            <label>Категория</label>
            <select value={valueCategory} onChange={(e) => setValueCategory(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { categories.map((category) => {
                    return <option value={category.id}>{category.title}</option>
                }) }
              </select>
            <label>Наименование</label>
            <input type="text" value={valueName} onChange={e => setValueName(e.target.value)}/>
            <label>Краткое описание</label>
            <input type="text" value={valueDesc} onChange={e => setValueDesc(e.target.value)} maxLength={25}/>
            <label>Дедлайн</label>
            <input type="date" value={valueDeadline} onChange={e => setValueDeadline(e.target.value)}/>
            <label>Приоритет</label>
            <select value={valuePriority} onChange={(e) => setValuePriority(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { priorities.map((priority) => {
                    return <option value={priority.id}>{priority.title}</option>
                }) }
            </select>
            <label>Статус</label>
            <select value={valueStatus} onChange={(e) => setValueStatus(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { statuses.map((status) => {
                    return <option value={status.id}>{status.title}</option>
                }) }
            </select>
            <select value={project.id} hidden={true}>
            </select>
            <Button style={{marginTop: "20px"}} onClick={() => create(currentProject)}>Добавить</Button>
          </div>
        </Modal>
        <Modal active={activeEdit} setActive={setActiveEdit} onClose={handleClose}>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "20px"}}>
            <h3>Изменить задачу</h3>
            <label>Категория</label>
            <select value={valueCategory} onChange={(e) => setValueCategory(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { categories.map((category) => {
                    return <option value={category.id}>{category.title}</option>
                }) }
              </select>
            <label>Наименование</label>
            <input type="text" value={valueName} onChange={e => setValueName(e.target.value)}/>
            <label>Краткое описание</label>
            <input type="text" value={valueDesc} onChange={e => setValueDesc(e.target.value)}/>
            <label>Дедлайн</label>
            <input type="date" value={valueDeadline} onChange={e => setValueDeadline(e.target.value)}/>
            <label>Приоритет</label>
            <select value={valuePriority} onChange={(e) => setValuePriority(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { priorities.map((priority) => {
                    return <option value={priority.id}>{priority.title}</option>
                }) }
            </select>
            <label>Статус</label>
            <select value={valueStatus} onChange={(e) => setValueStatus(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { statuses.map((status) => {
                    return <option value={status.id}>{status.title}</option>
                }) }
            </select>
            <label>Проект</label>
            <select value={valueProject} onChange={(e) => setValueProject(e.target.value)}>
            <option disabled={true} selected={true} value={""}>Выберите</option>
             { projects.map((project) => {
                    return <option key={project.id} value={project.id}>{project.title}</option>
                }) }
            </select>
            <Button onClick={() => edit()}>Изменить</Button>
          </div>
        </Modal>
    </div>
    
  );
  
})}
        <Modal active={activeProject} setActive={setActiveProject} onClose={handleClose}>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px", padding: "20px"}}>
            <h3>Введите название проекта</h3>
            <input type='text' value={valueProject} onChange={e => setValueProject(e.target.value)} />
            <Button onClick={() => createProject()}>Добавить</Button>
          </div>
        </Modal>
<Button onClick={() => setActiveProject(true)} style={{margin: "0 auto", marginTop: "50px"}}>Добавить</Button>
</div>
</>
)}

export default ProjectsList