const Router = require('express')
const router = new Router()
const UsersController = require('../controllers/usersController')

router.get('/users', UsersController.getAllUsers)
router.get('/users/:id', UsersController.getUsersById)
router.get('/users/activate/:link', UsersController.activateUser)
router.post('/users', UsersController.createUsers)
router.put('/users/:id', UsersController.updateUsers)
router.delete('/users/:id', UsersController.deleteUsers)

module.exports = router
