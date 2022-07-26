const Router = require('express')
const router = new Router()
const HousesController = require('../controllers/housesController')

router.get('/houses', HousesController.getAllHouses)
router.get('/houses/:id', HousesController.getHouseById)
router.post('/houses', HousesController.createHouse)
router.post('/houses/images', HousesController.createHouseImages)
router.put('/houses/:id', HousesController.updateHouse)
router.put('/houses/images/:houseId', HousesController.updateHouseImages)
router.delete('/houses/:id', HousesController.deleteHouse)
router.delete('/houses/images/:houseId', HousesController.deleteHouseImages)

module.exports = router
