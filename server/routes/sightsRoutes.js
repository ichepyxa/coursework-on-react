const Router = require('express')
const router = new Router()
const SightsController = require('../controllers/sightsController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/sights', SightsController.getAllSights)
router.get(
	'/sights/favoritesSights',
	authMiddleware,
	SightsController.getFavoritesSights
)
router.get('/sights/:sightId', SightsController.getSightById)
router.post('/sights', roleMiddleware(['ADMIN']), SightsController.createSight)
router.post(
	'/sights/favoritesSights',
	authMiddleware,
	SightsController.addFavoritesSights
)
router.put(
	'/sights/:sightId',
	roleMiddleware(['ADMIN']),
	SightsController.updateSight
)
router.delete(
	'/sights/:sightId',
	roleMiddleware(['ADMIN']),
	SightsController.deleteSight
)
router.delete(
	'/sights/favoritesSights/:sightId',
	authMiddleware,
	SightsController.deleteFavoritesSights
)

module.exports = router
