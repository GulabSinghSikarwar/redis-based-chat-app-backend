const mongoose = require('mongoose')
const { getLogger } = require('../utils/logger_service.js');

const Logger = getLogger()

let dbConnection;
const connectToDb = async () => {

    // Logger.info("Connecting to database")
    
    try {
        dbConnection = await mongoose.connect('mongodb://127.0.0.1:27017/SCALEABLE_SOCKET');
        Logger.info("DB Connection Successfully established")

    } catch (error) {
        dbConnection = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        Logger.error("DB Connection Failed , Something Went Wrong  :", error.message)

    }
}

module.exports = connectToDb
