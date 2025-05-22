const mongoos = require('mongoose');


const ProductSchema = new mongoos.Schema({
    img: { type: String },
    productName: { type: String, required: true },
    category: { type: String, required: true  },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
})


const ProSchema = mongoos.model('ProductData', ProductSchema)
module.exports = ProSchema;