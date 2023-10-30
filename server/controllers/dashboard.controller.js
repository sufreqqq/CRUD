const {Tasks, Categories, Statuses, Projects, Plans, Targets, Priorities} = require('../models/models')
const ApiError = require('../error/api.error')

class DashboardController {

    // Task
    async createTask(req, res, next){
        try{
            console.log(req.user)
            const {title, desc, deadline, categoryId, statusId, projectId, priorityId} = req.body
            console.log(req.body)
            const task = await Tasks.create({title, desc, deadline, categoryId, statusId, projectId, priorityId, userId: req.user.id})
            res.json(task)
        }catch (err){
            next(ApiError.badRequest)
        }
    }

    async getTasks(req, res, next){
        let task
        task = await Tasks.findAll({where: {userId: req.user.id}})
        console.log(task)
        if(task == null){
            return next(ApiError.badRequest())
        }
        return res.json(task)
    }

    async getOneTask(req, res, next){
        const {id} = req.params
        const task_id = await Tasks.findOne({where: {id, userId: req.user.id}})
        console.log(req.user)
        if(task_id == null){
            return next(ApiError.badRequest())
        }
        res.json(task_id)
    }
    
    async deleteTask(req, res, next){
        const {id} = req.params
        let task
        try {
            task = await Tasks.destroy({where: {id, userId: req.user.id}})
            if (task === 0){
                return next(ApiError.badRequest('Записей не было найдено'))
            }
            else {
                res.json(`Было удалено записей: ${task}`)
            }
        } catch (err) {
            return next(ApiError.badRequest("Не удалось"))
        }
    }
    
    async editTask(req, res, next) {
        try {
          const { id } = req.params;
          const { title, desc, deadline, categoryId, statusId, projectId, priorityId } = req.body;
          const userId = req.user.id;
          console.log(userId)
          console.log(req.body)
      
          const task = await Tasks.findOne({ where: { id, userId } });
          if (!task) {
            return next(ApiError.badRequest('Задача не найдена'));
          }
    
      
          const updatedTask = await Tasks.update(
            { title, desc, deadline, categoryId, statusId, projectId, priorityId },
            { where: { id } }
          )
      
          res.json(updatedTask);
        } catch (err) {
          console.error(err);
          next(ApiError.badRequest(err.message));
        }
      }

    // Category
    
    async createCategory(req, res, next){
        const {title} = req.body
        try{
            const category = await Categories.create({title})
            res.json(category)
        }catch (err){
            return next(ApiError.badRequest("Не удалось создать категорию"))
        }
    }

    async getCategories(req, res, next){
        const {id} = req.params
        const categories = await Categories.findAll({where: id})
        if(!categories.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(categories)
    }
    
    async getOneCategory(req, res, next){
        const {id} = req.params
        const category_id = await Categories.findOne({where: {id}})
        if(category_id == null){
            return next(ApiError.badRequest("Нет такой категории"))
        }
        res.json(category_id)
    }

    // Status
    
    async createStatus(req, res, next){
        const {title} = req.body
        try{
            const status = await Statuses.create({title})
            res.json(status)
        }catch (err){
            next(ApiError.badRequest("Не удалось создать статус"))
        }
    }

    async getStatuses(req, res, next){
        const {id} = req.params
        const statuses = await Statuses.findAll({where: id})
        if(!statuses.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(statuses)
    }
    
    // Priority
    
    async createPriority(req, res, next){
        const {title} = req.body
        try{
            const priority = await Priorities.create({title})
            res.json(priority)
        }catch (err){
            next(ApiError.badRequest("Не удалось создать приоритет"))
        }
    }

    async getPriorities(req, res, next){
        const {id} = req.params
        const priorities = await Priorities.findAll({where: id})
        if(!priorities.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(priorities)
    }
    
  
    // Project
    
    async createProject(req, res, next){
        const {title} = req.body
        try{
            const project = await Projects.create({title, userId: req.user.id})
            res.json(project)
        }catch (err){
            next(ApiError.badRequest("Не удалось создать проект"))
        }
    }

    async getProjects(req, res, next){
        const projects = await Projects.findAll({where: {userId: req.user.id}})
        if(!projects.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(projects)
    }
    
    async getOneProject(req, res, next){
        const {id} = req.params
        const project = await Projects.findOne({where: {id, userId: req.user.id}})
        console.log(req.user)
        if(project == null){
            return next(ApiError.badRequest())
        }
        res.json(project)
    }
    
    async deleteProject(req, res, next){
        const {id} = req.params
        const project = await Projects.findOne({where: {id, userId: req.user.id}})
        console.log(req.user)
        if(project == null){
            return next(ApiError.badRequest())
        }
        await Tasks.destroy({where: {projectId: id}})
        await project.destroy()
        res.json({message: 'Проект успешно удален'})
    }

    // Plan
    
    async createPlan(req, res, next){
        const {title} = req.body
        try{
            const plan = await Plans.create({title, userId: req.user.id})
            res.json(plan)
        }catch (err){
            next(ApiError.badRequest("Не удалось создать план"))
        }
    }

    async getPlans(req, res, next){
        const plans = await Plans.findAll({where: {userId: req.user.id}})
        if(!plans.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(plans)
    }
    
    async deletePlan(req, res, next){
        const {id} = req.params
        let plan
        try {
            plan = await Plans.destroy({where: {id, UserId: req.user.id}})
            if (plan === 0){
                return next(ApiError.badRequest('Записей не было найдено'))
            }
            else {
                res.json(`Было удалено записей: ${plan}`)
            }
        } catch (err) {
            return next(ApiError.badRequest("Не удалось"))
        }
    }
    
    async completePlan(req, res, next) {
        const { id } = req.params;
        let plan;
        try {
          plan = await Plans.findOne({ where: { id, UserId: req.user.id } });
          if (!plan) {
            return next(ApiError.badRequest("Записей не было найдено"));
          }
          const newCompletedValue = plan.completed === true ? 0 : 1;
          console.log(newCompletedValue)
          console.log(plan.completed)
          await Plans.update({ completed: newCompletedValue }, { where: { id, UserId: req.user.id } });
        } catch (err) {
          return next(ApiError.badRequest("Не удалось"));
        }
      }
    
    // Target
    
    async createTarget(req, res, next){
        const {title} = req.body
        try{
            const target = await Targets.create({title, userId: req.user.id})
            res.json(target)
        }catch (err){
            next(ApiError.badRequest("Не удалось создать цель"))
        }
    }

    async getTargets(req, res, next){
        const targets = await Targets.findAll({where: {userId: req.user.id}})
        if(!targets.length){
            return next(ApiError.badRequest("Не найдено"))
        }
        res.json(targets)
    }
    
    async deleteTarget(req, res, next){
        const {id} = req.params
        let target
        try {
            target = await Targets.destroy({where: {id, UserId: req.user.id}})
            if (target === 0){
                return next(ApiError.badRequest('Записей не было найдено'))
            }
            else {
                res.json(`Было удалено записей: ${target}`)
            }
        } catch (err) {
            return next(ApiError.badRequest("Не удалось"))
        }
    }
    
    async completeTarget(req, res, next) {
        const { id } = req.params;
        let target;
        try {
          target = await Targets.findOne({ where: { id, UserId: req.user.id } });
          if (!target) {
            return next(ApiError.badRequest("Записей не было найдено"));
          }
          const newCompletedValue = target.completed === true ? 0 : 1;
          await Targets.update({ completed: newCompletedValue }, { where: { id, UserId: req.user.id } });
        } catch (err) {
          return next(ApiError.badRequest("Не удалось"));
        }
      }


/* TODO: 
1. getCategories, getOneCategory -
2. getStatuses, getOneStatus, createStatus -
3. createProject, getProjects -
4. createPlan, getPlans -
5. createTarget, getTargets -
6. createPriority, getPriorities

*/
}
module.exports = new DashboardController()