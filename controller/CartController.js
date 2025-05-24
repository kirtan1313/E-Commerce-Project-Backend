const cartSchema = require('../models/cartProduct.js');
const { ObjectId, Long } = require('mongodb');
const productSchema = require('../models/modual.js')


const GetCartProduct = async (req, res) => {
    try {
        const cartProducts = await cartSchema.find();
        res.status(200).json(cartProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const PostCartProduct = async (req, res) => {
    const {img, productId, quantity ,productName} = req.body;
    console.log('.....',req.body);
    
    try {
       
        const productObjectId = new ObjectId(productId);

        
        const product = await productSchema.findById(productObjectId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }


        let cart = await cartSchema.findOne();
        if (!cart) {
            cart = new cartSchema({ products: [] });
        }

    
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ img: img || product.img, productId, productName,quantity, price: product.price });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart.', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const GetCartProductId = async(req, res) => {
    try {
        const { id } = req.params;
        const CartProId = await cartSchema.findById(id);
         res.status(200).json(CartProId)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    GetCartProduct,
    PostCartProduct,
    GetCartProductId
}