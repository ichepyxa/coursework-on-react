const Router = require('express')
const TestController = require('../controllers/testController')
const router = new Router()

router.get('/test', TestController.getTest)

module.exports = router
