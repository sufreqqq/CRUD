const Router = require('express')
const router = new Router()
const DashboardController = require('../controllers/dashboard.controller')
const checkRole = require('../middleware/role.middleware')


router.get('/', checkRole("USER"), DashboardController.getTasks)

router.post('/tasks', checkRole("USER"), DashboardController.createTask)
router.get('/tasks', checkRole("USER"), DashboardController.getTasks)
router.put('/tasks/:id', checkRole("USER"), DashboardController.editTask)
router.delete('/tasks/:id', checkRole("USER"), DashboardController.deleteTask)

router.post('/categories', checkRole("USER"), DashboardController.createCategory)
router.get('/categories', checkRole("USER"), DashboardController.getCategories)
router.get('/categories/:id', checkRole("USER"), DashboardController.getOneCategory)

router.post('/statuses', checkRole("USER"), DashboardController.createStatus)
router.get('/statuses', checkRole("USER"), DashboardController.getStatuses)

router.post('/priorities', checkRole("USER"), DashboardController.createPriority)
router.get('/priorities', checkRole("USER"), DashboardController.getPriorities)

router.post('/projects', checkRole("USER"), DashboardController.createProject)
router.get('/projects', checkRole("USER"), DashboardController.getProjects)
router.delete('/projects/:id', checkRole("USER"), DashboardController.deleteProject)

router.post('/plans', checkRole("USER"), DashboardController.createPlan)
router.get('/plans', checkRole("USER"), DashboardController.getPlans)
router.delete('/plans/:id', checkRole("USER"), DashboardController.deletePlan)
router.put('/plans/:id', checkRole("USER"), DashboardController.completePlan)

router.post('/targets', checkRole("USER"), DashboardController.createTarget)
router.get('/targets', checkRole("USER"), DashboardController.getTargets)
router.delete('/targets/:id', checkRole("USER"), DashboardController.deleteTarget)
router.put('/targets/:id', checkRole("USER"), DashboardController.completeTarget)

/* TODO: 
1. getCategories, getOneCategory
2. getStatuses, getOneStatus, createStatus
3. createProject, getProjects
4. createPlan, getPlans
5. createTarget, getTargets
6. createPriority, getPriorities

*/

module.exports = router