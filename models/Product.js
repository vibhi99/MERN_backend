const { timeStamp } = require('console')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    prodname: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    photo: {
        type: String
    }

}, {timeStamps:true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product