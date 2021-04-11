const express=require('express')
const { addOrderItems,getOrder ,updatedOrderToPaid,sendClient,getUserOrders} = require('../controllers/order')
const router=express.Router()
const {requireSignin,}=require('../controllers/user')
router.post('/order',requireSignin,addOrderItems)
router.get('/order/:id',requireSignin,getOrder)
router.put('/order/:id/pay',requireSignin,updatedOrderToPaid)
// sending paypal client id from the backend 
router.get('/order/config/paypal',sendClient)
// sending userOrders to the client
router.get('/myorders/:id',getUserOrders)


module.exports=router