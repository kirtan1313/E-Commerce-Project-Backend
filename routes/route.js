const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/ProductController.js')
const cartProductControler = require('../controller/CartController.js')
const upload = require('../Multer/multer.js')


productRoute.get('/products',productController.GetProdct)
productRoute.get('/products/:category',productController.GetProductsByCategory)
productRoute.post('/products',upload.single('img'),productController.PostProduct)
productRoute.get('/products/:id',productController.ProductId)
productRoute.put('/products/:id',upload.single("img"),productController.UpdateProduct)
productRoute.delete('/products/:id',productController.DeleteProduct)



// Cart Product Route
productRoute.get('/cartPro',cartProductControler.GetCartProduct)
productRoute.post('/cartPro',upload.single("img"),cartProductControler.PostCartProduct)
productRoute.get('/cartPro/:id',cartProductControler.GetCartProductId)



module.exports = productRoute;