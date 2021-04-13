const express=require('express')
const router=express.Router()
const {getProducts,singleProduct,deleteProductsByAdmin, productById,updateProductsByAdmin,createProduct}=require('../controllers/products')
const { admin } = require('../errorMiddleware/error')
const {requireSignin}=require('../controllers/user')
router.get('/products',getProducts)
router.get('/product/:id',singleProduct)
// router.post('/create',createProduct)

// admin stuff
router.delete('/admin/product/:productId',requireSignin,deleteProductsByAdmin)
router.put('/admin/product/:productId',requireSignin,updateProductsByAdmin)
router.post('/create/product',requireSignin,createProduct)
router.param('productId',productById)

module.exports=router