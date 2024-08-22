const mongoose = require('mongoose')


const connectMongoDb = async (url) =>{
    console.log('mongodb connected')
    return mongoose.connect(url)
}


module.exports = {
    connectMongoDb
}