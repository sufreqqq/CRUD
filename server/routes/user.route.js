const Router = require('express')
const router = new Router()
const UsersController = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration', UsersController.registration)
router.post('/login', UsersController.login)
router.get('/auth', authMiddleware ,UsersController.auth)

module.exports = router