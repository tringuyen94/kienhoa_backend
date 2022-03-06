const express = require('express')
const { authentication } = require('../../../middlewares/auth.middlewares')
const uploadImage = require('../../../middlewares/upload.middlewares')
const ProductController = require('./product.controller.js')
const router = express.Router()

//FETCH API
router.get('/', ProductController.fetchProducts)
router.get('/fetch-product-by-name',ProductController.fetchProductByName)
//PUT API 
router.put('/update-proudct-by-id/:productId',authentication,ProductController.updateProductById)
router.put('/update-image-product-by-id/:productId',authentication,uploadImage('imageProduct'),ProductController.updateImageProductById)
//POST API
router.post('/create-product', authentication, uploadImage('imageProduct'), ProductController.createProduct)

//DELETE API

router.delete('/delete-product-by-id/:productId', authentication, ProductController.deleteProductById)



module.exports = router