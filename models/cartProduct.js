const moongose = require('mongoose');

const cartSchema = moongose.Schema({

    products: [{
        img: String,
        productId: String,
        quantity: Number,
        price: Number,
        productName: String
    }]
})

const CartProduct = moongose.model('CartProduct', cartSchema)
module.exports = CartProduct