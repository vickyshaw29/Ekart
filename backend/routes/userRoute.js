const express=require('express')
const router=express.Router()
const {userSignup,userSignin, requireSignin,signout,userById,getUser,updateUser, getAllUsers,deleteUserByAdmin, updateUserByAdmin}=require('../controllers/user')
const {userValidate}=require('../validators/userValidator')
const {runValidation}=require('../validators/index')
const { admin } = require('../errorMiddleware/error')
router.post('/signup',userValidate,runValidation,userSignup)
router.post('/signin',userSignin)
router.get('/signuot',signout)
router.get('/user/:userId',requireSignin,getUser)
router.put('/user/:userId',requireSignin,updateUser)
// admin
router.delete('/admin/user/:userId',requireSignin,admin,deleteUserByAdmin)
router.put('/admin/user/:userId',requireSignin,admin,updateUserByAdmin)
router.get('/users/:userId',requireSignin,admin,getAllUsers)
// 
router.param('userId',userById)
module.exports=router          