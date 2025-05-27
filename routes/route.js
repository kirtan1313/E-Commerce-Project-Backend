const express = require('express');
const productRoute = express.Router();
const productController = require('../controller/ProductController.js')
const cartProductControler = require('../controller/CartController.js')
const UserController = require('../controller/UserController.js')
const upload = require('../Multer/multer.js')
const { SignInVaidation, LogInVaidation } = require('../Middleware/AuthValidation.js')
const Auth = require('../Middleware/Auth.js')


productRoute.get('/products',Auth, productController.GetProdct)
productRoute.get('/products/:category',Auth, productController.GetProductsByCategory)
productRoute.post('/products',Auth, upload.single('img'), productController.PostProduct)
productRoute.get('/products/:id',Auth, productController.ProductId)
productRoute.put('/products/:id',Auth, upload.single("img"), productController.UpdateProduct)
productRoute.delete('/products/:id',Auth, productController.DeleteProduct)



// Cart Product Route
productRoute.get('/cartPro',Auth, cartProductControler.GetCartProduct)
productRoute.post('/cartPro',Auth, upload.single("img"), cartProductControler.PostCartProduct)
productRoute.get('/cartPro/:id',Auth, cartProductControler.GetCartProductId)
productRoute.delete('/cartPro/:id',Auth, cartProductControler.DeleteProduct)


// User Router

productRoute.get('/userLogin', UserController.GetUserLogin)
productRoute.post('/userLogin', LogInVaidation, UserController.PostUserLogin)

productRoute.get('/userSignIn', UserController.GetUserSignIn)
productRoute.post('/userSignIn', SignInVaidation, UserController.PostUserSignIn)

module.exports = productRoute;