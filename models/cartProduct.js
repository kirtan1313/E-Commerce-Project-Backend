const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        img: String,
        productId: String,
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        productName: { type: String, required: true }
    }]
});

const CartProduct = mongoose.model('CartProduct', cartSchema);
module.exports = CartProduct;
