const express=require('express')
const mongoose=require('mongoose')
const users=require('./data/users')
const products=require('./data/products')
const User=require('./models/user')
const Product=require('./models/product')
const Order=require('./models/order')
require('dotenv').config()
const app=express()
const importData=async()=>{
   try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
   const createdUsers= await User.insertMany(users)
   const adminUser=createdUsers[0]._id
   const sampleProducts=products.map(product=>{
       return {...product,user:adminUser}
   })
   await Product.insertMany(sampleProducts)
   console.log('data imported')
   process.exit()
   } catch (error) {
       console.log(error)
   }
}
const destroyData=async()=>{
    try {
     await Order.deleteMany()
     await Product.deleteMany()
     await User.deleteMany()
    console.log('data destroyed')
    process.exit()
    } catch (error) {
        console.log(error)
    }
 }
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(process.env.PORT),()=>console.log('running on port 8000'))
.catch(err=>console.log(err))
if(process.argv[2]==='-d'){
    destroyData()
}
importData()