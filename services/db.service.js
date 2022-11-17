const MongoClient = require('mongodb').MongoClient

const config = require('../config')
console.log('config: ', config)

module.exports = {
    getCollection
}

// Database Name
const dbName = 'toy_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        console.log('db: ', db)
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() { 
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('client', client)
        
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




