const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getCars, getCarById, addCar, updateCar, removeCar, addReview } = require('./car.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getCars)
router.get('/:id', getCarById)
router.post('/', requireAuth, requireAdmin, addCar)
router.put('/:id', requireAuth, requireAdmin, updateCar)
router.delete('/:id', requireAuth, requireAdmin, removeCar)

module.exports = router