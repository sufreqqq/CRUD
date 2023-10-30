const Router = require('express')
const router = new Router()

const usersRoute = require('./user.route')
const dashboardRoute = require('./dashboard.route')

router.use('/user',  usersRoute)
router.use('/dashboard', dashboardRoute)

module.exports = router