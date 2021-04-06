const express=require('express')
const router=express.Router()
const {getProducts,singleProduct}=require('../controllers/products')
router.get('/products',getProducts)
router.get('/product/:id',singleProduct)
// router.post('/create',createProduct)




module.exports=router