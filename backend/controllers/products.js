const Product = require('../models/product')
exports.getProducts = async (req, res) => {
    try {
        const data = await Product.find()
        return res.status(200).json(data)
    } catch (error) {
        return res.json({error:"product not found"})
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
// exports.createProduct=(req,res)=>{
//     const product=new Product(req.body)
//     if(product){
//         return res.status(200).json({msg:"product created"})
//     }
// }