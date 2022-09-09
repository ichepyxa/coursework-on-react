const Router = require('express')
const router = new Router()
const SightsController = require('../controllers/sightsController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/sights', SightsController.getAllSights)
router.get('/sights/:sightId', SightsController.getSightById)
router.post('/sights', roleMiddleware(['ADMIN']), SightsController.createSight)
router.post(
	'/sights/images/:sightId',
	roleMiddleware(['ADMIN']),
	SightsController.createSightImages
)
router.put(
	'/sights/:sightId',
	roleMiddleware(['ADMIN']),
	SightsController.updateSight
)
router.put(
	'/sights/images/:imageId',
	roleMiddleware(['ADMIN']),
	SightsController.updateSightImages
)
router.delete(
	'/sights/:sightId',
	roleMiddleware(['ADMIN']),
	SightsController.deleteSight
)
router.delete(
	'/sights/images/:imageId',
	roleMiddleware(['ADMIN']),
	SightsController.deleteSightImages
)

module.exports = router
