const carService = require('./toy.service.js')
const logger = require('../../services/logger.service')

// GET LIST
async function getCars(req, res) {
  try {
    logger.debug('Getting Cars')
    var queryParams = req.query
    const cars = await carService.query(queryParams)
    res.json(cars)
  } catch (err) {
    logger.error('Failed to get cars', err)
    res.status(500).send({ err: 'Failed to get cars' })
  }
}

// GET BY ID 
async function getCarById(req, res) {
  try {
    const carId = req.params.id
    const car = await carService.getById(carId)
    res.json(car)
  } catch (err) {
    logger.error('Failed to get car', err)
    res.status(500).send({ err: 'Failed to get car' })
  }
}

// POST (add car)
async function addCar(req, res) {
  try {
    const car = req.body
    const addedCar = await carService.add(car)
    res.json(addedCar)
  } catch (err) {
    logger.error('Failed to add car', err)
    res.status(500).send({ err: 'Failed to add car' })
  }
}

// PUT (Update car)
async function updateCar(req, res) {
  try {
    const car = req.body
    const updatedCar = await carService.update(car)
    res.json(updatedCar)
  } catch (err) {
    logger.error('Failed to update car', err)
    res.status(500).send({ err: 'Failed to update car' })

  }
}

// DELETE (Remove car)
async function removeCar(req, res) {
  try {
    const carId = req.params.id
    await carService.remove(carId)
    res.send('Removed')
  } catch (err) {
    logger.error('Failed to remove car', err)
    res.status(500).send({ err: 'Failed to remove car' })
  }
}

module.exports = {
  getCars,
  getCarById,
  addCar,
  updateCar,
  removeCar
}
