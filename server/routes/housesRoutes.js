const Router = require('express')
const router = new Router()
const HousesController = require('../controllers/housesController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/houses', HousesController.getAllHouses)
router.get('/houses/:id', HousesController.getHouseById)
router.post('/houses', roleMiddleware(['ADMIN']), HousesController.createHouse)
router.post(
	'/houses/images',
	roleMiddleware(['ADMIN']),
	HousesController.createHouseImages
)
router.put(
	'/houses/:id',
	roleMiddleware(['ADMIN']),
	HousesController.updateHouse
)
router.put(
	'/houses/images/:houseId',
	roleMiddleware(['ADMIN']),
	HousesController.updateHouseImages
)
router.delete(
	'/houses/:id',
	roleMiddleware(['ADMIN']),
	HousesController.deleteHouse
)
router.delete(
	'/houses/images/:houseId',
	roleMiddleware(['ADMIN']),
	HousesController.deleteHouseImages
)

module.exports = router
