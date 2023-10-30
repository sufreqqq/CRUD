import { $authHost } from './index'

export const createTask = async (task) => {
    const { data } = await $authHost.post('api/dashboard/tasks', task)
    return data
}

export const editTask = async (task) => {
    const { data } = await $authHost.put(`api/dashboard/tasks/${task.id}`, task)
    return data
}

export const fetchTasks = async () => {
    const { data } = await $authHost.get('api/dashboard/tasks')
    return data
}

export const fetchCategories = async () => {
    const { data } = await $authHost.get('api/dashboard/categories')
    return data
}

export const fetchStatuses = async () => {
    const { data } = await $authHost.get('api/dashboard/statuses')
    return data
}

export const fetchPriorities = async () => {
    const { data } = await $authHost.get('api/dashboard/priorities')
    return data
}

export const fetchPlans = async () => {
    const { data } = await $authHost.get('api/dashboard/plans')
    return data
}

export const fetchProjects = async () => {
    const { data } = await $authHost.get('api/dashboard/projects')
    return data
}

export const addProject = async (project) => {
    const { data } = await $authHost.post('api/dashboard/projects', project)
    return data
}

export const deleteProject = async (projectId) => {
    const { data } = await $authHost.delete(`api/dashboard/projects/${projectId}`)
    return data
}
export const fetchOneProject = async (projectId) => {
    const { data } = await $authHost.get(`api/dashboard/projects/${projectId}`)
    return data
}

export const addPlan = async (plan) => {
    const { data } = await $authHost.post('api/dashboard/plans', plan)
    return data
}

export const deletePlanItem = async (id) => {
    const { data } = await $authHost.delete(`api/dashboard/plans/${id}`)
    return data
}

export const completePlanItem = async (id) => {
    const { data } = await $authHost.put(`api/dashboard/plans/${id}`)
    return data
}

export const fetchTargets = async () => {
    const { data } = await $authHost.get('api/dashboard/targets')
    return data
}

export const addTarget = async (plan) => {
    const { data } = await $authHost.post('api/dashboard/targets', plan)
    return data
}

export const deleteTargetItem = async (id) => {
    const { data } = await $authHost.delete(`api/dashboard/targets/${id}`)
    return data
}

export const deleteTaskItem = async (id) => {
    const { data } = await $authHost.delete(`api/dashboard/tasks/${id}`)
    return data
}

export const completeTargetItem = async (id) => {
    const { data } = await $authHost.put(`api/dashboard/targets/${id}`)
    return data
}