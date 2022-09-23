const Router = require('express')
const router = new Router()
const HousesController = require('../controllers/housesController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/houses', HousesController.getAllHouses)
router.get(
	'/houses/favoritesHouses',
	authMiddleware,
	HousesController.getFavoritesHouses
)
router.get('/houses/:houseId', HousesController.getHouseById)
router.post('/houses', roleMiddleware(['ADMIN']), HousesController.createHouse)
router.post(
	'/houses/images/:houseId',
	roleMiddleware(['ADMIN']),
	HousesController.createHouseImages
)
router.post(
	'/houses/favoritesHouses',
	authMiddleware,
	HousesController.addFavoritesHouses
)
router.put(
	'/houses/:houseId',
	roleMiddleware(['ADMIN']),
	HousesController.updateHouse
)
router.put(
	'/houses/images/:imageId',
	roleMiddleware(['ADMIN']),
	HousesController.updateHouseImages
)
router.delete(
	'/houses/:houseId',
	roleMiddleware(['ADMIN']),
	HousesController.deleteHouse
)
router.delete(
	'/houses/images/:imageId',
	roleMiddleware(['ADMIN']),
	HousesController.deleteHouseImages
)
router.delete(
	'/houses/favoritesHouses/:houseId',
	authMiddleware,
	HousesController.deleteFavoritesHouses
)

module.exports = router
