const Router = require('express')
const TestController = require('../controllers/testController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = new Router()

router.get('/test', authMiddleware, TestController.getTest)
router.get('/test/results', authMiddleware, TestController.getSaveResult)
router.post('/test', authMiddleware, TestController.getResult)

module.exports = router
