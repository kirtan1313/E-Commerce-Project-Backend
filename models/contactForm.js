const { string } = require('joi')
const mongoose = require('mongoose')


const contact = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
})


const conatctSchema = mongoose.model('contact', contact)
module.exports = conatctSchema