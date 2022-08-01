const Router = require('express')
const router = new Router()
const UsersController = require('../controllers/usersController')
const { body } = require('express-validator')

router.get('/users', UsersController.getAllUsers)
router.get('/users/activate/:link', UsersController.activateUser)
router.get('/users/refresh', UsersController.refresh)
router.get('/users/logout', UsersController.logoutUsers)
router.post(
	'/users/register',
	body('username').isLength({ min: 3, max: 15 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 20 }),
	UsersController.registerUsers
)
router.post(
	'/users/login',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 20 }),
	UsersController.loginUsers
)
// router.get('/users/:id', UsersController.getUsersById)
// router.put('/users/:id', UsersController.updateUsers)
// router.delete('/users/:id', UsersController.deleteUsers)

module.exports = router
