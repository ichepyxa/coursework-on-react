const Router = require('express')
const TestController = require('../controllers/testController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/test', authMiddleware, TestController.getTest)
router.post('/test', authMiddleware, TestController.sendAnswers)

module.exports = router
