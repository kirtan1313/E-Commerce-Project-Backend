const cartSchema = require('../models/cartProduct.js');
const { ObjectId } = require('mongodb');
const productSchema = require('../models/modual.js');

// Get all cart products
const GetCartProduct = async (req, res) => {
    try {
        const cartProducts = await cartSchema.find();
        res.status(200).json(cartProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add or update a product in the cart
const PostCartProduct = async (req, res) => {
    const { img, productId, quantity, productName } = req.body;

    try {
        const productObjectId = new ObjectId(productId);

       
        const product = await productSchema.findById(productObjectId);
        console.log('...',product);
        

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        let cart = await cartSchema.findOne();
        console.log('cartcart',cart);
        
        if (!cart) {
            cart = new cartSchema({ products: [] });
        }

        
        const productIndex = cart.products.findIndex(
            (p) => p.productId === productId
        );

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({
                img: img || product.img,
                productId,
                productName: productName || product.name,
                quantity: quantity || 1,
                price: product.price
            });

        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart.', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get cart product by ID
const GetCartProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const cartProduct = await cartSchema.findById(id);
        if (!cartProduct) {
            return res.status(404).json({ message: 'Cart product not found.' });
        }
        res.status(200).json(cartProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await cartSchema.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const updatedProducts = cart.products.filter(
            (product) => product._id.toString() !== id
        );

        cart.products = updatedProducts;
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart.', cart });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    GetCartProduct,
    PostCartProduct,
    GetCartProductId,
    DeleteProduct
};
