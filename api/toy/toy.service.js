const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        

        const collection = await dbService.getCollection('car')
        var cars = await collection.find(criteria).toArray()
        return cars
    } catch (err) {
        logger.error('cannot find cars', err)
        throw err
    }
}

async function getById(carId) {
    try {
        const collection = await dbService.getCollection('car')
        const car = collection.findOne({ _id: ObjectId(carId) })
        return car
    } catch (err) {
        logger.error(`while finding car ${carId}`, err)
        throw err
    }
}

async function remove(carId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.deleteOne({ _id: ObjectId(carId) })
        return carId
    } catch (err) {
        logger.error(`cannot remove car ${carId}`, err)
        throw err
    }
}

async function add(car) {
    try {
        const collection = await dbService.getCollection('car')
        const addedCar = await collection.insertOne(car)
        return addedCar
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}
async function update(car) {
    try {
        var id = ObjectId(car._id)
        delete car._id
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ _id: id }, { $set: { ...car } })
        return car
    } catch (err) {
        logger.error(`cannot update car ${carId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

function _buildCriteria(filterBy={minPrice: 0}){
    const criteria = {}
    if (filterBy.minPrice) {
        criteria.price = {$gte : filterBy.minPrice}
    }
    return criteria
}