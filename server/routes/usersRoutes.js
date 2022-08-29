const Router = require('express')
const router = new Router()
const { body } = require('express-validator')
const UsersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/users', roleMiddleware(['ADMIN']), UsersController.getAllUsers)
router.get(
	'/users/activate/:link',
	authMiddleware,
	UsersController.activateUser
)
router.get(
	'/users/favoritesHouses',
	authMiddleware,
	UsersController.getFavoritesHouses
)
router.get('/users/refresh', UsersController.refresh)
router.get('/users/logout', authMiddleware, UsersController.logoutUsers)
router.post(
	'/users/registration',
	body('username').isLength({ min: 3, max: 15 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 20 }),
	UsersController.registrationUsers
)
router.post(
	'/users/login',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 20 }),
	UsersController.loginUsers
)

module.exports = router
