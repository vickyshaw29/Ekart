const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
exports.addOrderItems = async (req, res) => {
    try {
        const { orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body
        console.log(req.body)
        //    if(orderItems && orderItems.length===0){
        //       return  res.status(400).json({message:'No order items found'})
        //    }
        const order = await new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        
        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    } catch (error) {
        console.log(error)
    }
}
exports.getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', "name email")
    if (order) {
        return res.json(order)
    }
    else {
        return res.status(404).json({ message: 'No order found' })
    }
}
)
// checking the payment if it is paid
exports.updatedOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder=await order.save()
        return res.status(200).json(updatedOrder)
    }
}
)
exports.sendClient=asyncHandler(async(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})