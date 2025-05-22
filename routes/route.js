const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/ProductController.js')
const upload = require('../Multer/multer.js')


productRoute.get('/products',productController.GetProdct)
productRoute.get('/products/:category',productController.GetProductsByCategory)
productRoute.post('/products',upload.single('img'),productController.PostProduct)
productRoute.get('/products/:id',productController.ProductId)
productRoute.put('/products/:id',productController.UpdateProduct)
productRoute.delete('/products/:id',productController.DeleteProduct)


module.exports = productRoute;