const Product = require('../models/product')
const _=require('lodash')
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            return res.status(404).json({ error: "product not found" })
        }
        req.profil = product
        next()
    })
}
exports.getProducts = async (req, res) => {
    try {
        const products=await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}
exports.singleProduct=async(req,res,id)=>{
   try {
    const product=await Product.findById(req.params.id)
    console.log(product)
    if(!product){
        return res.status(400).json({error:"product not found"})
    }
    return res.status(200).json(product)
   } catch (error) {
       res.json({error:"product not found"})
   }
}
// delete products by the admin
exports.deleteProductsByAdmin=async(req,res)=>{
    let product=req.profil
    console.log(product)
    if(product){
        product.remove((err,resul)=>{
            if(err){
                return res.status(404).json({message:'Product not found'})
            }
            return res.status(200).json({message:'Product deleted successfully'})
        })
    }
}
// update product by the admin
exports.updateProductsByAdmin=(req,res)=>{
   let product=req.profil
   product=_.extend(product,req.body)
   product.updated=Date.now()
   product.save((err,product)=>{
    if(err){
        return res.status(404).json({message:'Product not found'})
    }
    return res.status(200).json(product)
   })
}
// create product by the admin
exports.createProduct=async(req,res)=>{
    let product=await new Product(req.body)
    product.save((err,product)=>{
        if(err){
            return res.status(404).json({error:err})
        }
        return res.status(200).json({message:'Product saved successfully'})
    })
}